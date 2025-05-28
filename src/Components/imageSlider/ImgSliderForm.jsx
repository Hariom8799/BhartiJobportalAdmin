"use client";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import toast from "react-hot-toast";

const ImageSliderForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "inactive",
    });

    const [mainImg, setMainImg] = useState(null);
    const [mainImgPreview, setMainImgPreview] = useState(null);

    useEffect(() => {
        if (id) fetchSliderDetails();
    }, [id]);

    const fetchSliderDetails = async () => {
        let loadingToast;
        try {
            setLoading(true);
            loadingToast = toast.loading("Loading slider details...");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image-sliders/${id}`);
            const result = await res.json();
            if (result.success) {
                setFormData({
                    title: result.data.title || "",
                    description: result.data.description || "",
                    status: result.data.status || "inactive",
                });
                setMainImgPreview(result.data.mainImg || null);
                toast.success("Slider details loaded successfully");
            } else {
                toast.error("Failed to load slider details");
            }
        } catch (error) {
            toast.error("Error loading slider details");
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (e) => {
        setFormData((prev) => ({ ...prev, description: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMainImg(file);
        setMainImgPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || (!mainImgPreview && !mainImg)) {
            toast.error("Please fill in all required fields");
            return;
        }
        let submittingToast;
        try {
            setSubmitting(true);
            submittingToast = toast.loading(id ? "Updating slider..." : "Creating slider...");

            const apiUrl = id ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/image-sliders/${id}` : `${process.env.NEXT_PUBLIC_BASE_URL}/api/image-sliders`;
            const method = id ? "PUT" : "POST";

            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("description", formData.description);
            payload.append("status", formData.status);

            if (mainImg) {
                payload.append("mainImg", mainImg);
            } else if (mainImgPreview && typeof mainImgPreview === "string") {
                payload.append("existingMainImg", mainImgPreview);
            }

            const res = await fetch(apiUrl, {
                method,
                body: payload,
            });

            const result = await res.json();
            if (result.success) {
                toast.success(id ? "Slider updated successfully" : "Slider created successfully");
                router.push("/image-sliders");
            } else {
                toast.error(`Failed: ${result.message}`);
            }
        } catch (error) {
            toast.error("Error submitting form");
        } finally {
            setSubmitting(false);
            toast.dismiss(submittingToast);
        }
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">{id ? "Edit" : "Create"} Image Slider</h1>
                <Link href="/image-sliders">
                    <Button variant="outlined" className="btn-border">Back to List</Button>
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
                        <label className="block font-medium text-sm mb-2">Description*</label>
                        <Editor value={formData.description} onChange={handleEditorChange} />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-2">Main Image*</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {mainImgPreview && (
                            <img src={mainImgPreview} className="w-[150px] mt-2 border rounded" alt="Main Image Preview" />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border rounded-md px-3 bg-gray-100"
                        >
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>
                        </select>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <Button type="submit" className="btn-dark" disabled={submitting}>
                            {submitting ? "Saving..." : id ? "Update Slider" : "Create Slider"}
                        </Button>
                        <Link href="/image-sliders">
                            <Button type="button" className="btn-border">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ImageSliderForm;
