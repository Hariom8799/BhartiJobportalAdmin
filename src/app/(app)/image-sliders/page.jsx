"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import SearchBox from "@/Components/SearchBox";
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import toast from 'react-hot-toast';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "title", label: "TITLE", minWidth: 200 },
  { id: "mainImg", label: "IMAGE", minWidth: 100 }, // renamed from 'thumbnail'
  { id: "description", label: "DESCRIPTION", minWidth: 250 },
  { id: "status", label: "STATUS", minWidth: 100 },
  { id: "createdAt", label: "CREATED AT", minWidth: 120 },
  { id: "actions", label: "ACTIONS", minWidth: 120 },
];

const ImageSliderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image-sliders`);
      const result = await res.json();
      if (result.success) setSliderData(result.data);
      else toast.error(result.message || "Failed to fetch sliders");
    } catch (error) {
      toast.error("Error fetching sliders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image slider?"))
      return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image-sliders/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setSliderData(sliderData.filter((item) => item._id !== id));
        toast.success("Deleted successfully");
      } else toast.error(result.message || "Failed to delete slider");
    } catch (error) {
      toast.error("Error deleting slider");
      console.error(error);
    }
  };

  const filteredSliders = sliderData.filter(
    (slider) =>
      slider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slider.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">Image Sliders</h2>
        <div className="ml-auto flex items-center gap-3">
          {/* <Button className="gap-2 btn-border !capitalize">
            <PiExportBold size={20} /> Export
          </Button> */}
          <Link href="/image-sliders/add">
            <Button className="gap-2 btn-dark !capitalize">
              <IoMdAdd size={20} /> Add Slider
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-5 mb-4">
        <SearchBox
          placeholder="Search sliders..."
          width={"500px"}
          onSearch={setSearchQuery}
        />
      </div>

      {loading ? (
        <div className="p-5 text-center">Loading...</div>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="image slider table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id} style={{ minWidth: col.minWidth }}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSliders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((slider) => (
                    <TableRow hover key={slider._id}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="font-[600] w-[200px]">
                          {slider.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-[100px] h-[60px] overflow-hidden rounded-md">
                          <img
                            src={slider.mainImg}
                            alt={slider.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-[250px] truncate">
                          {slider.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`capitalize ${slider.status === "active"
                              ? "text-green-500"
                              : "text-yellow-600"
                            }`}
                        >
                          {slider.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(slider.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Tooltip title="Edit">
                            <Link href={`/image-sliders/edit/${slider._id}`}>
                              <Button className="!min-w-[32px] !w-[32px] !h-[32px]">
                                <MdOutlineEdit size={22} />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip title="View">
                            <Link href={`/image-sliders/view/${slider._id}`}>
                              <Button className="!min-w-[32px] !w-[32px] !h-[32px]">
                                <FaRegEye size={22} />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button
                              className="!min-w-[32px] !w-[32px] !h-[32px]"
                              onClick={() => handleDelete(slider._id)}
                            >
                              <MdOutlineDeleteOutline size={22} />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredSliders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ImageSliderList;
