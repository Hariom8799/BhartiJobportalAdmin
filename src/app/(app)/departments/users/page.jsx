"use client";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import SearchBox from '@/Components/SearchBox';
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import toast from 'react-hot-toast';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'name', label: 'NAME', minWidth: 150 },
    { id: 'username', label: 'USERNAME', minWidth: 150 },
    { id: 'email', label: 'EMAIL', minWidth: 200 },
    {
        id: 'departmentType',
        label: 'DEPARTMENT TYPE',
        minWidth: 130,
    },
    {
        id: 'department',
        label: 'DEPARTMENT',
        minWidth: 200,
    },
    { id: 'active', label: 'STATUS', minWidth: 100 },
    {
        id: 'createdAt',
        label: 'CREATED AT',
        minWidth: 120,
    },
    {
        id: 'ACTIONS',
        label: 'ACTIONS',
        minWidth: 100,
    }
];

const UserDataList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentTypeFilter, setDepartmentTypeFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
            const result = await response.json();

            if (result.success) {
                setUserData(result.users);
            } else {
                toast.error(result.message || 'Failed to fetch users');
                console.error('Failed to fetch users:', result.message);
            }
        } catch (error) {
            toast.error('Error fetching users');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
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

    const handleDepartmentTypeFilterChange = (event) => {
        setDepartmentTypeFilter(event.target.value);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
                    method: 'DELETE',
                });

                const result = await response.json();

                if (result.success) {
                    setUserData(userData.filter(item => item._id !== id));
                    toast.success('User deleted successfully');
                } else {
                    toast.error(`Failed to delete: ${result.message}`);
                }
            } catch (error) {
                toast.error('An error occurred while deleting');
                console.error('Error deleting user:', error);
            }
        }
    };

    const getDepartmentTypeLabel = (type) => {
        switch (type) {
            case 'Govt':
                return 'Government Department';
            case 'Aided':
                return 'Aided Department';
            case 'Public':
                return 'Public Undertaking';
            default:
                return type;
        }
    };

    const filteredUserData = userData.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDepartmentType = departmentTypeFilter === '' || user.departmentType === departmentTypeFilter;

        return matchesSearch && matchesDepartmentType;
    });

    return (
        <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">User Management</h2>
                <div className="ml-auto flex items-center gap-3">
                    {/* <Button className="gap-2 btn-border !capitalize">
                        <PiExportBold size={20} /> Export
                    </Button> */}
                    <Link href="/departments/users/add">
                        <Button className="gap-2 btn-dark !capitalize">
                            <IoMdAdd size={20} /> Add User
                        </Button>
                    </Link>
                </div>
            </div>

            <div className='flex items-center justify-between w-full px-5 mb-4'>
                <div className="flex items-center gap-4 w-full">
                    <SearchBox
                        placeholder="Search users..."
                        width={"400px"}
                        onSearch={handleSearch}
                    />
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="department-type-filter-label">Department Type</InputLabel>
                        <Select
                            labelId="department-type-filter-label"
                            id="department-type-filter"
                            value={departmentTypeFilter}
                            label="Department Type"
                            onChange={handleDepartmentTypeFilterChange}
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Govt">Government Department</MenuItem>
                            <MenuItem value="Aided">Aided Department</MenuItem>
                            <MenuItem value="Public">Public Undertaking</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button className="gap-2 btn-border !capitalize">
                    <LiaFilterSolid size={20} /> Filters
                </Button>
            </div>

            {loading ? (
                <div className="p-5 text-center">Loading...</div>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox {...label} size="small" />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUserData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                                <TableCell>
                                                    <Checkbox {...label} size="small" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex-col">
                                                        <h3 className="font-[600]">{user.name}</h3>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {user.username}
                                                </TableCell>

                                                <TableCell>
                                                    {user.email || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`flex items-center justify-center w-[10px] h-[10px] rounded-full
                              ${user.departmentType === "Govt" ? "bg-[#4ad47a]" :
                                                                user.departmentType === "Aided" ? "bg-[#c9b23d]" : "bg-[#6366f1]"}`}>
                                                        </span>
                                                        <span>
                                                            {getDepartmentTypeLabel(user.departmentType)}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {user.department.name || "Loading..."}
                                                </TableCell>

                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded text-sm font-medium ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {user.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </TableCell>

                                                <TableCell>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-1 actions w-[150px]">
                                                        <Tooltip title="Edit" placement="top">
                                                            <Link href={`/departments/users/edit/${user._id}`}>
                                                                <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100">
                                                                    <MdOutlineEdit size={22} className="text-themeDark dark:!text-gray-100" />
                                                                </Button>
                                                            </Link>
                                                        </Tooltip>

                                                        <Tooltip title="View" placement="top">
                                                            <Link href={`/departments/users/view/${user._id}`}>
                                                                <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100">
                                                                    <FaRegEye size={22} className="text-themeDark dark:!text-gray-100" />
                                                                </Button>
                                                            </Link>
                                                        </Tooltip>

                                                        <Tooltip title="Delete" placement="top">
                                                            <Button
                                                                className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"
                                                                onClick={() => handleDelete(user._id)}
                                                            >
                                                                <MdOutlineDeleteOutline size={22} className="text-themeDark dark:!text-gray-100" />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredUserData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </div>
    );
};

export default UserDataList;