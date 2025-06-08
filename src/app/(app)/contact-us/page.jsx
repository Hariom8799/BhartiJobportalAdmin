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
    { id: "email", label: "Email", minWidth: 200 },
    { id: "contactNo", label: "Contact", minWidth: 150 },
    { id: "message", label: "Message", minWidth: 300 },
];

export default function ContactUsList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function fetchContacts() {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-us`);
                const json = await res.json();
                if (json.success) {
                    setContacts(json.data);
                } else {
                    setError("Failed to load contacts");
                }
            } catch {
                setError("Server error");
            } finally {
                setLoading(false);
            }
        }
        fetchContacts();
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

    const filteredContacts = contacts.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.contactNo?.toString().includes(searchQuery)
    );

    if (loading)
        return <div className="p-5 text-center text-gray-700">Loading...</div>;
    if (error)
        return <div className="p-5 text-center text-red-600 font-semibold">{error}</div>;

    return (
        <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Contact Us Entries</h2>
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
                    placeholder="Search contacts..."
                    width={"500px"}
                    onSearch={handleSearch}
                />
                <Button className="gap-2 btn-border !capitalize">
                    <LiaFilterSolid size={20} /> Filters
                </Button>
            </div>

            {filteredContacts.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No entries found.</p>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="contacts table">
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
                                {filteredContacts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.contactNo}</TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate">{item.message}</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredContacts.length}
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
