"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Checkbox,
    Tooltip,
} from "@mui/material";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { PiExportBold } from "react-icons/pi";
import { LiaFilterSolid } from "react-icons/lia";
import Link from "next/link";
import toast from "react-hot-toast";
import SearchBox from "@/Components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
    { id: "title", label: "TITLE", minWidth: 200 },
    { id: "image", label: "IMAGE", minWidth: 150 },
    { id: "createdAt", label: "CREATED AT", minWidth: 150 },
    { id: "actions", label: "ACTIONS", minWidth: 100 },
];

const SocialGalleryList = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchGalleryData();
    }, []);

    const fetchGalleryData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages`);
            const result = await res.json();

            if (result.success) {
                setGalleryData(result.images);
                setFilteredGallery(result.images);
            } else {
                toast.error("Failed to fetch gallery images");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching gallery");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this image?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages/${id}`, {
                method: "DELETE",
                
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Image deleted successfully");
                setGalleryData((prev) => prev.filter((img) => img._id !== id));
            } else {
                toast.error(result.message || "Delete failed");
            }
        } catch (err) {
            toast.error("Error deleting image");
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = galleryData.filter((img) =>
            img.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredGallery(filtered);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <div className="p-5 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Social Gallery</h2>
                <div className="ml-auto flex items-center gap-3">
                    <Button className="gap-2 btn-border !capitalize">
                        <PiExportBold size={20} /> Export
                    </Button>
                    <Link href="/social-gallery/add">
                        <Button className="gap-2 btn-dark !capitalize">
                            <IoMdAdd size={20} /> Add Image
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-5 mb-4">
                <SearchBox
                    placeholder="Search gallery by title..."
                    width={"500px"}
                    onSearch={handleSearch}
                />
                <Button className="gap-2 btn-border !capitalize">
                    <LiaFilterSolid size={20} /> Filters
                </Button>
            </div>

            {loading ? (
                <div className="p-5 text-center">Loading...</div>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox {...label} size="small" />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{column.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredGallery
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((img) => (
                                        <TableRow hover key={img._id}>
                                            <TableCell>
                                                <Checkbox {...label} size="small" />
                                            </TableCell>
                                            <TableCell>{img.title}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={img.image}
                                                    alt={img.title}
                                                    className="w-[80px] h-[60px] object-cover rounded-md"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(img.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Tooltip title="Edit">
                                                        <Link href={`/social-gallery/edit/${img._id}`}>
                                                            <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-white">
                                                                <MdOutlineEdit size={20} />
                                                            </Button>
                                                        </Link>
                                                    </Tooltip>

                                                    <Tooltip title="View">
                                                        <Link href={`/social-gallery/view/${img._id}`}>
                                                            <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-white">
                                                                <FaRegEye size={20} />
                                                            </Button>
                                                        </Link>
                                                    </Tooltip>

                                                    <Tooltip title="Delete">
                                                        <Button
                                                            onClick={() => handleDelete(img._id)}
                                                            className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-white"
                                                        >
                                                            <MdOutlineDeleteOutline size={20} />
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
                        count={filteredGallery.length}
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

export default SocialGalleryList;
