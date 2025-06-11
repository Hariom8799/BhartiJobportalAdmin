"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Select, MenuItem, FormControl, Snackbar, Alert } from "@mui/material";
import { PiExportBold } from "react-icons/pi";
import { LiaFilterSolid } from "react-icons/lia";
import Link from "next/link";
import SearchBox from "@/Components/SearchBox";

const columns = [
    { id: "name", label: "Name", minWidth: 150 },
    { id: "contactNo", label: "Contact", minWidth: 150 },
    { id: "message", label: "Message", minWidth: 300 },
    { id: "status", label: "Status", minWidth: 150 },
    { id: "actions", label: "Actions", minWidth: 120 },
];

export default function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [updatingStatus, setUpdatingStatus] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/complaints`);
            const json = await res.json();
            if (json.success) {
                setComplaints(json.data);
            } else {
                setError("Failed to load complaints");
            }
        } catch {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (complaintId, newStatus) => {
        setUpdatingStatus(prev => ({ ...prev, [complaintId]: true }));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/complaints/${complaintId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const json = await res.json();

            if (json.success) {
                // Update the complaint in local state
                setComplaints(prev =>
                    prev.map(complaint =>
                        complaint._id === complaintId
                            ? { ...complaint, status: newStatus }
                            : complaint
                    )
                );

                setSnackbar({
                    open: true,
                    message: "Status updated successfully",
                    severity: "success"
                });
            } else {
                setSnackbar({
                    open: true,
                    message: json.message || "Failed to update status",
                    severity: "error"
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Network error occurred",
                severity: "error"
            });
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [complaintId]: false }));
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const filteredComplaints = complaints.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.contactNo?.toString().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="p-5 text-center text-gray-700">Loading...</div>;
    if (error) return <div className="p-5 text-center text-red-600 font-semibold">{error}</div>;

    return (
        <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Feedback & Complaints</h2>
                <div className="ml-auto flex items-center gap-3">
                    <Link href="/">
                        <Button className="gap-2 btn-dark" sx={{ textTransform: 'none' }}>
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-5 mb-4">
                <SearchBox
                    placeholder="Search complaints..."
                    width={"500px"}
                    onSearch={handleSearch}
                />
                <Button className="gap-2 btn-border" sx={{ textTransform: 'none' }}>
                    <LiaFilterSolid size={20} /> Filters
                </Button>
            </div>

            {filteredComplaints.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No complaints found.</p>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="complaints table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredComplaints
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.contactNo}</TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate" title={item.message}>
                                                    {item.message}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${item.status === "resolved" ? "bg-green-600" : "bg-yellow-600"
                                                        }`}
                                                >
                                                    {item.status === "resolved" ? "Resolved" : "Pending"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                                    <Select
                                                        value={item.status}
                                                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                        disabled={updatingStatus[item._id]}
                                                        sx={{
                                                            '& .MuiSelect-select': {
                                                                padding: '8px 12px',
                                                                fontSize: '0.875rem'
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value="pending">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                                                Pending
                                                            </span>
                                                        </MenuItem>
                                                        <MenuItem value="resolved">
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                                Resolved
                                                            </span>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredComplaints.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}