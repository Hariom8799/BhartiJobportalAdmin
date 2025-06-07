"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const SocialGalleryForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        if (id) fetchImageDetails();
    }, [id]);

    const fetchImageDetails = async () => {
        let loadingToast;
        try {
            setLoading(true);
            loadingToast = toast.loading("Loading gallery image...");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages/${id}`);
            const result = await res.json();
            if (result.success) {
                setFormData({
                    title: result.image.title || "",
                });
                setImagePreview(result.image.image || null);
                toast.success("Image loaded successfully");
            } else {
                toast.error("Failed to load image");
            }
        } catch (error) {
            toast.error("Error loading image");
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDeleteImage = async () => {
        if (!imagePreview || imagePreview.startsWith("blob:")) {
            // Local file preview, just clear it
            setImageFile(null);
            setImagePreview(null);
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
            return;
        }

        setDeleteLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-image`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl: imagePreview }),
            });

            const json = await res.json();
            if (json.success) {
                toast.success("Image deleted successfully");
                setImageFile(null);
                setImagePreview(null);
                if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                }
            } else {
                toast.error(json.message || "Failed to delete image");
            }
        } catch (err) {
            toast.error("Error deleting image");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || (!imageFile && !imagePreview)) {
            toast.error("Please provide a title and an image");
            return;
        }

        let toastId;
        try {
            setSubmitting(true);
            toastId = toast.loading(id ? "Updating image..." : "Uploading image...");

            const form = new FormData();
            form.append("title", formData.title);
            if (imageFile) form.append("image", imageFile);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages${id ? `/${id}` : ""}`,
                {
                    method: id ? "PUT" : "POST",
                    body: form,
                }
            );

            const result = await response.json();
            if (result.success) {
                toast.success(id ? "Image updated" : "Image created");
                router.push("/social-gallery");
            } else {
                toast.error(result.message || "Failed to submit");
            }
        } catch (error) {
            toast.error("Error submitting form");
        } finally {
            setSubmitting(false);
            toast.dismiss(toastId);
        }
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">
                    {id ? "Edit" : "Create"} Social Gallery Image
                </h1>
                <Link href="/social-gallery">
                    <Button variant="outlined" className="btn-border">
                        Back to List
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="card dark:bg-themeDark w-full p-4">
                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-2">Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border rounded-md px-3 bg-gray-100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-2">Image*</label>
                        
                        {imagePreview && (
                            <div className="relative mt-2 inline-block">
                                <img
                                    src={imagePreview}
                                    className="w-[150px] border rounded"
                                    alt="Preview"
                                />
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    disabled={deleteLoading}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 disabled:opacity-50"
                                >
                                    {deleteLoading ? "..." : "×"}
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={imageInputRef}
                            className="w-full"
                        />
                    </div>

                    <div className="flex gap-3 mt-5">
                        <Button type="submit" className="btn-dark" disabled={submitting}>
                            {submitting ? "Saving..." : id ? "Update Image" : "Upload Image"}
                        </Button>
                        <Link href="/social-gallery">
                            <Button type="button" className="btn-border">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SocialGalleryForm;
