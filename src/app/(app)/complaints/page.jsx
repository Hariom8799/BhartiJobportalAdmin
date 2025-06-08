"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { PiExportBold } from "react-icons/pi";
import { LiaFilterSolid } from "react-icons/lia";
import Link from "next/link";
import SearchBox from "@/Components/SearchBox";

const columns = [
    { id: "name", label: "Name", minWidth: 150 },
    { id: "contactNo", label: "Contact", minWidth: 150 },
    { id: "message", label: "Message", minWidth: 300 },
    { id: "status", label: "Status", minWidth: 100 },
];

export default function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function fetchComplaints() {
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
        }
        fetchComplaints();
    }, []);

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

    const filteredComplaints = complaints.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                    {/* <Button className="gap-2 btn-border !capitalize">
                        <PiExportBold size={20} /> Export
                    </Button> */}
                    <Link href="/">
                        <Button className="gap-2 btn-dark !capitalize">
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
                <Button className="gap-2 btn-border !capitalize">
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
                                                <div className="max-w-[300px] truncate">{item.message}</div>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${item.status === "resolved" ? "bg-green-600" : "bg-yellow-600"
                                                        }`}
                                                >
                                                    {item.status === "resolved" ? "Resolved" : "Pending"}
                                                </span>
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
        </div>
    );
}
