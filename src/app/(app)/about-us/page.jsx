"use client";

import React, { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import { Button } from "@mui/material";
import Link from "next/link";
import toast from "react-hot-toast";

const AboutUsForm = () => {
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        subTitle: "",
        longDescription: "",
        status: "inactive",
    });

    const [existingImages, setExistingImages] = useState([]); // Already uploaded
    const [newImages, setNewImages] = useState([]);           // Newly selected files
    const [newImagePreviews, setNewImagePreviews] = useState([]); // Preview URLs

    useEffect(() => {
        fetchAboutUs();
    }, []);

    const fetchAboutUs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about-us`);
            const result = await response.json();

            if (result.success && result.data) {
                setFormData({
                    title: result.data.title || "",
                    shortDescription: result.data.shortDescription || "",
                    subTitle: result.data.subTitle || "",
                    longDescription: result.data.longDescription || "",
                    status: result.data.status || "inactive",
                });

                setExistingImages(result.data.images || []);
            }
        } catch (error) {
            toast.error("Failed to load About Us data");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLongDescriptionChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            longDescription: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files]);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setNewImagePreviews((prev) => [...prev, ...previewUrls]);
    };

    const removeExistingImage = async (index, imageUrl) => {
        try {
            // Call backend to delete image from Cloudinary
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-image`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl }),
            });

            const result = await response.json();

            if (result.success) {
                setExistingImages((prev) => prev.filter((_, i) => i !== index));
                toast.success("Image deleted successfully");
            } else {
                toast.error(`Failed to delete image: ${result.message}`);
            }
        } catch (error) {
            toast.error("Error deleting image");
            console.error(error);
        }
    };

    const removeNewImage = (index) => {
        // Revoke the preview URL to free memory
        URL.revokeObjectURL(newImagePreviews[index]);
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.shortDescription || !formData.subTitle || !formData.longDescription) {
            toast.error("All fields are required");
            return;
        }

        try {
            setSubmitting(true);
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("shortDescription", formData.shortDescription);
            payload.append("subTitle", formData.subTitle);
            payload.append("longDescription", formData.longDescription);
            payload.append("status", formData.status);

            // Append new images
            newImages.forEach((file) => {
                if (file instanceof File) {
                    payload.append("images", file);
                }
            });

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about-us`, {
                method: "PUT",
                body: payload,
            });

            const result = await res.json();

            if (result.success) {
                toast.success("About Us saved successfully!");
                fetchAboutUs(); // Refresh
                setNewImages([]);
                setNewImagePreviews([]);
            } else {
                toast.error(`Failed: ${result.message}`);
            }
        } catch (error) {
            toast.error("Error while saving");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            newImagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    if (loading) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">About Us</h1>
                <Link href="/">
                    <Button variant="outlined" className="btn-border">Home</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-3 mt-3">
                    <div className="w-full flex flex-col gap-3">
                        <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                            <h2 className="text-[18px] font-[600] mb-4">Page Content</h2>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                                    placeholder="About us title"
                                    required
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Short Description*</label>
                                <textarea
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    className="w-full h-[100px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-2 bg-gray-100 resize-vertical"
                                    placeholder="Short description"
                                    required
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Sub Title*</label>
                                <input
                                    type="text"
                                    name="subTitle"
                                    value={formData.subTitle}
                                    onChange={handleChange}
                                    className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                                    placeholder="Sub title"
                                    required
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Long Description*</label>
                                <Editor value={formData.longDescription} onChange={handleLongDescriptionChange} />
                            </div>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Upload Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="w-full"
                                />

                                {/* Existing Images */}
                                {existingImages.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-sm font-medium text-gray-600 mb-2">Existing Images</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {existingImages.map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img
                                                        src={img}
                                                        className="w-[100px] h-[100px] object-cover border rounded"
                                                        alt="Existing"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingImage(idx, img)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
                                                        title="Delete image"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Image Previews */}
                                {newImagePreviews.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-sm font-medium text-gray-600 mb-2">New Images (Preview)</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {newImagePreviews.map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img
                                                        src={img}
                                                        className="w-[100px] h-[100px] object-cover border rounded"
                                                        alt="New Preview"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewImage(idx)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors cursor-pointer"
                                                        title="Remove image"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col_ mb-4">
                                <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                                >
                                    <option value="inactive">Inactive</option>
                                    <option value="active">Active</option>
                                </select>
                            </div>

                            <div className="flex gap-3 mt-5">
                                <Button type="submit" className="btn-dark" disabled={submitting}>
                                    {submitting ? "Saving..." : "Save About Us"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AboutUsForm;