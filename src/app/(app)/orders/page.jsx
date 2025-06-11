"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Tooltip } from "@mui/material";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { Switch } from "@mui/material";
import { FaRegEye } from "react-icons/fa";
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import SearchBox from "@/Components/SearchBox";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";

const columns = [
    { id: "nameOfPosition", label: "Position", minWidth: 150 },
    { id: "totalVacancies", label: "Vacancies", minWidth: 80 },
    { id: "location", label: "Location", minWidth: 180 },
    { id: "lastDateOfSubmission", label: "Last Date", minWidth: 120 },
    { id: "postedOn", label: "Posted On", minWidth: 120 },
    { id: "departmentType", label: "Dept. Type", minWidth: 120 },
    { id: "department", label: "Department", minWidth: 250 },
    { id: "visible", label: "Visible", minWidth: 100 }  
];

const Orders = () => {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs/all`);
            if (res.data?.success) {
                setJobs(res.data.jobs);
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        }
    };

    const toggleVisibility = async (jobId, newVisibility) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs/visibility/${jobId}`, {
                visible: newVisibility,
            });

            if (res.data.success) {
                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job._id === jobId ? { ...job, visible: newVisibility } : job
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update visibility:", error);
        }
    };
    
    
    

    useEffect(() => {
        fetchJobs();
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

    const filteredJobs = jobs.filter((job) =>
        job.nameOfPosition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Department Jobs</h2>
                <div className="ml-auto flex items-center gap-3">
                    {/* <Button className="gap-2 btn-border !capitalize" desabled>
                        <PiExportBold size={20} /> Export
                    </Button> */}
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-5 mb-4">
                <SearchBox
                    placeholder="Search jobs..."
                    width={"500px"}
                    onSearch={handleSearch}
                />
                <Button className="gap-2 btn-border !capitalize">
                    <LiaFilterSolid size={20} /> Filters
                </Button>
            </div>

            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="jobs table">
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
                        {filteredJobs
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((job) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={job._id}>
                                    <TableCell>{job.nameOfPosition}</TableCell>
                                    <TableCell>{job.totalVacancies}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{dayjs(job.lastDateOfSubmission).format("DD MMM YYYY")}</TableCell>
                                    <TableCell>{dayjs(job.postedOn).format("DD MMM YYYY")}</TableCell>
                                    <TableCell>{job.departmentType}</TableCell>
                                    <TableCell>{job.departmentId?.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={job.visible}
                                            onChange={() => toggleVisibility(job._id, !job.visible)}
                                            color="primary"
                                        />
                                    </TableCell>     
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredJobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Orders;
