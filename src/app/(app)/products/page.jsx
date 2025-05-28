"use client"
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { productsData } from '@/data';
import { Button } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import SearchBox from '@/Components/SearchBox';
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
  { id: 'Product', label: 'PRODUCT', minWidth: 200 },
  { id: 'sku', label: 'SKU', minWidth: 100 },
  {
    id: 'stock',
    label: 'STOCK',
    minWidth: 100,
  },
  {
    id: 'price',
    label: 'PRICE',
    minWidth: 100,
  },
  {
    id: 'ratings',
    label: 'RATINGS',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'STATUS',
    minWidth: 100,
  },
  {
    id: 'ACTIONS',
    label: 'Actions',
    minWidth: 100,
  }
];

const ProductsList = () => {

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
    <div className="card w-full p-0 pr-1 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">Products</h2>
        <div className="ml-auto flex items-center gap-3">
          <Button className="gap-2 btn-border !capitalize"><PiExportBold size={20} /> Export</Button>
          <Button className="gap-2 btn-dark !capitalize"><IoMdAdd size={20} /> Add Product</Button>
        </div>
      </div>




      <div className='flex items-center justify-between w-full px-5 mb-4'>
        <SearchBox placeholder="Search products..." width={"500px"} />

        <Button className="gap-2 btn-border !capitalize"><LiaFilterSolid size={20} /> Filters</Button>

      </div>


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
            {productsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index + "order"}>
                    <TableCell>
                      <Checkbox {...label} size="small" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 w-[300px]">

                        <span className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
                          <img src={product?.image} className="w-full h-full object-cover" />
                        </span>

                        <div className="info flex flex-col gap-0">
                          <h3 className="font-[600]">{product?.title}</h3>
                          <span className='text-[13px] dark:opacity-75'>{product?.cat}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-nowrap">SKU-{product?.sku}</span>
                    </TableCell>


                    <TableCell>
                      <div className="relative overflow-hidden rounded-full w-[100px] h-[8px] bg-[#ccc] dark:bg-[#3b3b3b]">
                        <span className={`absolute top-0 left-0 overflow-hidden rounded-full  h-[100%] ${product?.stock > 20 ? 'bg-green-700' : 'bg-[#c9b23d]'}`} style={{ width: product?.stock + '%' }}></span>
                      </div>
                      <span className='opacity-75'>{product?.stock} in stock</span>
                    </TableCell>

                    <TableCell>
                      ${product?.price}
                    </TableCell>


                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{product?.ratings?.rating}</span>
                        <Rating name="read-only" value={product?.ratings?.rating} precision={0.5}  readOnly size={"small"}/>
                        <span>({product?.ratings?.reviews})</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <span className={`flex items-center justify-center w-[10px] h-[10px] rounded-full
                                                ${product?.status === "publish" ? "bg-[#4ad47a]" : ""} ${product?.status === "pending" ? "bg-[#c9b23d]" : ""}`}></span>
                        <span className={`capitalize  ${product?.status === "publish" ? "text-[#4ad47a]" : ""} ${product?.status === "pending" ? "text-[#c9b23d]" : ""}`}>{product?.status}</span>
                      </div>
                    </TableCell>


                    <TableCell>
                      <div className="flex items-center gap-1 actions w-[150px]">
                        <Tooltip title="Edit" placement="top">
                          <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"><MdOutlineEdit size={22} className="text-themeDark dark:!text-gray-100" /></Button>
                        </Tooltip>

                        <Tooltip title="View" placement="top">
                          <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"><FaRegEye size={22} className="text-themeDark dark:!text-gray-100" /></Button>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark  dark:!text-gray-100"><MdOutlineDeleteOutline size={22} className="text-themeDark dark:!text-gray-100" /></Button>
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
        count={productsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </div>
  )
}

export default ProductsList