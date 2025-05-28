"use client"
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ordersData } from '@/data';
import { Button } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import SearchBox from '@/Components/SearchBox';

const columns = [
    { id: 'orderId', label: 'Order Id', minWidth: 100 },
    { id: 'Customer', label: 'Customer', minWidth: 250 },
    {
        id: 'Items',
        label: 'Items',
        minWidth: 80,
    },
    {
        id: 'Price',
        label: 'Price',
        minWidth: 100,
    },
    {
        id: 'Created',
        label: 'Created',
        minWidth: 170,
    },
    {
        id: 'Modified',
        label: 'Modified',
        minWidth: 170,
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 100,
    },
    {
        id: 'Actions',
        label: 'Actions',
        minWidth: 100,
    }
];

const Orders = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="card  dark:bg-themeDark w-full p-0 pr-1 pb-5 dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Recent Orders</h2>
                <div className="ml-auto">
                    <SearchBox placeholder={"Search..."} />
                </div>
            </div>


            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                        {ordersData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index + "order"}>
                                        <TableCell>
                                            #{order?.orderId}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3 w-[300px]">

                                                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
                                                    <img src={order?.customer?.avatar} className="w-full h-full object-cover" />
                                                </span>

                                                <div className="info flex flex-col gap-0">
                                                    <h3>{order?.customer?.name}</h3>
                                                    <span className='text-[13px] dark:opacity-75'>{order?.customer?.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {order?.items}
                                        </TableCell>

                                        <TableCell>
                                            ${order?.price}
                                        </TableCell>


                                        <TableCell>
                                            <h4>{order?.createdAt?.date}</h4>
                                            <span className='text-[13px] dark:opacity-75'>{order?.createdAt?.time}</span>
                                        </TableCell>

                                        <TableCell>
                                            <h4>{order?.modifiedAt?.date}</h4>
                                            <span className='text-[13px] dark:opacity-75'>{order?.modifiedAt?.time}</span>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex items-center gap-1'>
                                                <span className={`flex items-center justify-center w-[10px] h-[10px] rounded-full
                                                ${order?.status === "cancelled" ? "bg-[#e05858]" : ""}  ${order?.status === "refunded" ? "bg-[#7d7d7d]" : ""} ${order?.status === "completed" ? "bg-[#4ad47a]" : ""} ${order?.status === "pending" ? "bg-[#d5be4c]" : ""}`}></span>
                                                <span className={`capitalize  ${order?.status === "cancelled" ? "text-[#e05858]" : ""}  ${order?.status === "refunded" ? "text-[#7d7d7d]" : ""} ${order?.status === "completed" ? "text-[#4ad47a]" : ""} ${order?.status === "pending" ? "text-[#d5be4c]" : ""}`}>{order?.status}</span>
                                            </div>
                                        </TableCell>


                                        <TableCell>
                                            <div className="flex items-center gap-1 actions w-[150px]">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!min-w-[32px] !p-2  !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"><MdOutlineEdit size={28} className="text-themeDark dark:!text-gray-100" /></Button>
                                                </Tooltip>

                                                <Tooltip title="View" placement="top">
                                                    <Button className="!min-w-[32px]  !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"><FaRegEye size={28} className="text-themeDark dark:!text-gray-100" /></Button>
                                                </Tooltip>

                                                <Tooltip title="Delete" placement="top">
                                                    <Button className="!min-w-[32px]  !w-[32px] !h-[32px] !text-themeDark  dark:!text-gray-100"><MdOutlineDeleteOutline size={28} className="text-themeDark dark:!text-gray-100" /></Button>
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
                count={ordersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </div>
    )
}

export default Orders