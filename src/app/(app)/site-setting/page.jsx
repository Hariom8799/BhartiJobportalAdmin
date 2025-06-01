"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import toast from 'react-hot-toast';

const SiteSettingForm = () => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [form, setForm] = useState({
        siteTitle: "",
        email: "",
        contactNo: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        iframe: "",
        logo: "",
    });

    const [logoFile, setLogoFile] = useState(null);
    const logoInputRef = useRef(null);

    useEffect(() => {
        const fetchSiteSetting = async () => {
            setInitialLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site-setting`);
                const json = await res.json();
                if (json.success && json.data) {
                    setForm({ ...form, ...json.data });
                }
            } catch (err) {
                setError("Failed to fetch site settings");
                console.error("Error fetching site settings:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchSiteSetting();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setLogoFile(file);
            setForm({ ...form, logo: URL.createObjectURL(file) });
        }
    };

    const handleDeleteLogo = async () => {
        if (!form.logo || form.logo.startsWith('blob:')) {
            // If it's a blob URL (newly selected file), just clear it
            setForm({ ...form, logo: "" });
            setLogoFile(null);
            if (logoInputRef.current) {
                logoInputRef.current.value = "";
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
                body: JSON.stringify({ imageUrl: form.logo }),
            });

            const json = await res.json();
            if (json.success) {
                setForm({ ...form, logo: "" });
                setLogoFile(null);
                if (logoInputRef.current) {
                    logoInputRef.current.value = "";
                }
                toast.success("Logo deleted successfully");
            } else {
                toast.error(json.message || "Failed to delete logo");
            }
        } catch (err) {
            console.error("Error deleting logo:", err);
            toast.error("Error deleting logo");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // Add all form fields except logo to FormData
            Object.entries(form).forEach(([key, value]) => {
                if (key !== "logo") {
                    formData.append(key, value || "");
                }
            });

            // Add logo file if a new one was selected
            if (logoFile) {
                formData.append("logo", logoFile);
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site-setting`, {
                method: "PUT",
                body: formData,
            });

            const json = await res.json();
            if (!json.success) {
                setError(json.message || "Failed to save settings");
                toast.error(json.message || "Failed to save settings");
            } else {
                toast.success("Site settings saved successfully");
                setLogoFile(null);
                // Update form with the response data to get the updated logo URL
                if (json.data) {
                    setForm(prevForm => ({ ...prevForm, ...json.data }));
                }
            }
        } catch (err) {
            setError("Server error while saving");
            toast.error("Server error while saving");
            console.error("Error saving settings:", err);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">Site Settings</h1>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="card dark:bg-themeDark p-5 dark:border-[rgba(255,255,255,0.1)]">
                    <h2 className="text-[18px] font-[600] mb-4">Basic Details</h2>

                    {/* Site Title */}
                    <div className="mb-4">
                        <label className="block font-[500] text-gray-600 text-[14px] mb-1">Site Title</label>
                        <input
                            type="text"
                            name="siteTitle"
                            value={form.siteTitle}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] px-3 rounded-md bg-gray-100 outline-none focus:border-[rgba(0,0,0,0.5)]"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block font-[500] text-gray-600 text-[14px] mb-1">Email ID</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] px-3 rounded-md bg-gray-100 outline-none focus:border-[rgba(0,0,0,0.5)]"
                            required
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="mb-4">
                        <label className="block font-[500] text-gray-600 text-[14px] mb-1">Contact Number</label>
                        <input
                            type="text"
                            name="contactNo"
                            value={form.contactNo}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] px-3 rounded-md bg-gray-100 outline-none focus:border-[rgba(0,0,0,0.5)]"
                            required
                        />
                    </div>

                    {/* Iframe */}
                    <div className="mb-4">
                        <label className="block font-[500] text-gray-600 text-[14px] mb-1">Iframe Code</label>
                        <textarea
                            name="iframe"
                            rows={3}
                            value={form.iframe}
                            onChange={handleInputChange}
                            placeholder="Enter iframe embed code"
                            className="w-full p-3 border border-[rgba(0,0,0,0.1)] rounded-md bg-gray-100 outline-none focus:border-[rgba(0,0,0,0.5)] resize-none"
                        />
                    </div>

                    {/* Logo */}
                    <div className="mb-4">
                        <label className="block font-[500] text-gray-600 text-[14px] mb-1">Upload Logo</label>
                        {form.logo && (
                            <div className="mb-2 relative inline-block">
                                <img
                                    src={form.logo}
                                    alt="Logo Preview"
                                    className="h-[100px] object-contain border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={handleDeleteLogo}
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
                            onChange={handleLogoChange}
                            ref={logoInputRef}
                            className="w-full"
                        />
                    </div>

                    {/* Social Links */}
                    <h2 className="text-[18px] font-[600] mb-4 mt-6">Social Media</h2>

                    {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
                        <div className="mb-4" key={platform}>
                            <label className="block font-[500] text-gray-600 text-[14px] mb-1">
                                {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                            </label>
                            <input
                                type="url"
                                name={platform}
                                value={form[platform]}
                                onChange={handleInputChange}
                                placeholder={`https://${platform}.com/yourpage`}
                                className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] px-3 rounded-md bg-gray-100 outline-none focus:border-[rgba(0,0,0,0.5)]"
                            />
                        </div>
                    ))}

                    <div className="flex gap-3 mt-5">
                        <Button type="submit" variant="contained" className="btn-dark" disabled={loading}>
                            {loading ? "Saving..." : "Save Settings"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SiteSettingForm;