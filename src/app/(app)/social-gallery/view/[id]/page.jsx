"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ViewImageGallery = () => {
    const { id } = useParams();
    const [galleryImage, setGalleryImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGalleryImage = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages/${id}`);
            const data = await res.json();

            if (data.success) {
                setGalleryImage(data.image);
                toast.success("Gallery image details fetched successfully!");
            } else {
                toast.error("Failed to fetch gallery image details.");
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            toast.error("An error occurred while fetching image.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchGalleryImage();
        }
    }, [id]);

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    if (!galleryImage) return <div className="p-5 text-center">Image not found</div>;

    return (
        <div className="w-full p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">View Gallery Image</h1>
                <div className="flex gap-2">
                    <Link href={`/social-gallery/edit/${id}`}>
                        <Button variant="contained" className="btn-dark gap-2">
                            <MdOutlineEdit size={18} /> Edit
                        </Button>
                    </Link>
                    <Link href="/social-gallery">
                        <Button variant="outlined" className="btn-border">Back to List</Button>
                    </Link>
                </div>
            </div>

            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-[600]">{galleryImage.title}</h2>
                        <div className="text-sm text-gray-500">
                            {galleryImage.createdAt && (
                                <span>Uploaded: {new Date(galleryImage.createdAt).toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <img
                                src={galleryImage.image}
                                alt={galleryImage.title}
                                className="rounded-md border w-full max-h-[400px] object-contain"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="mb-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Title</h3>
                                <p className="bg-gray-50 p-3 rounded-md">{galleryImage.title}</p>
                            </div>

                            {galleryImage.updatedAt && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Last Updated</h3>
                                    <p>{new Date(galleryImage.updatedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewImageGallery;
