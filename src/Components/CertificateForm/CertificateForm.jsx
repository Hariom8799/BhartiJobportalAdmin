'use client';
import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'; // Import toast for notifications

const CertificateForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        status: 'inactive',
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [mainImg, setMainImg] = useState(null);
    const [mainImgPreview, setMainImgPreview] = useState(null);

    // Fetch certificate details
    useEffect(() => {
        if (id) fetchCertificateDetails();
    }, [id]);

    const fetchCertificateDetails = async () => {
        let loadingToast;
        try {
            setLoading(true);
            loadingToast = toast.loading("Loading certificate details...");
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/state-certificates/${id}`);
            const result = await response.json();

            if (result.success) {
                setFormData({
                    title: result.data.title || '',
                    shortDescription: result.data.shortDescription || '',
                    longDescription: result.data.longDescription || '',
                    status: result.data.status || 'inactive',
                });
                setThumbnailPreview(result.data.thumbnail || null);
                setMainImgPreview(result.data.mainImg || null);
                toast.success("Certificate details loaded successfully");
            } else {
                toast.error("Failed to load certificate details");
            }
        } catch (error) {
            toast.error("An error occurred while loading certificate details");
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (e) => {
        setFormData(prev => ({ ...prev, longDescription: e.target.value }));
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === "thumbnail") {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        } else if (type === "mainImg") {
            setMainImg(file);
            setMainImgPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.shortDescription || !formData.longDescription || (!thumbnail && !thumbnailPreview) || (!mainImg && !mainImgPreview)) {
            toast.error('Please fill in all required fields');
            return;
        }

        let submittingToast;
        try {
            setSubmitting(true);
            submittingToast = toast.loading(id ? "Updating certificate..." : "Creating certificate...");

            const apiUrl = id
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-certificates/${id}`
                : `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-certificates`;

            const method = id ? 'PUT' : 'POST';

            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("shortDescription", formData.shortDescription);
            payload.append("longDescription", formData.longDescription);
            payload.append("status", formData.status);

            // Append image files
            if (thumbnail) payload.append("images", thumbnail);
            if (mainImg) payload.append("images", mainImg);

            // Append existing image URLs if not re-uploaded
            if (!thumbnail && thumbnailPreview) {
                payload.append("existingThumbnail", thumbnailPreview);
            }
            if (!mainImg && mainImgPreview) {
                payload.append("existingMainImg", mainImgPreview);
            }

            const response = await fetch(apiUrl, {
                method,
                body: payload,
            });

            const result = await response.json();

            if (result.success) {
                toast.success(id ? 'Certificate updated successfully' : 'Certificate created successfully');
                router.push('/certifications');
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        } finally {
            setSubmitting(false);
            toast.dismiss(submittingToast);
        }
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    
    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">{id ? 'Edit' : 'Create'} Certificate</h1>
                <Link href="/certificate">
                    <Button variant="outlined" className="btn-border">Back to List</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-3 mt-3">
                    <div className='w-full flex flex-col gap-3'>
                        <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                            <h2 className="text-[18px] font-[600] mb-4">Basic Information</h2>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100'
                                    placeholder="Enter certificate title"
                                    required
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Short Description*</label>
                                <textarea
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    className='w-full h-[100px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md p-3 bg-gray-100'
                                    placeholder="Enter a brief description"
                                    required
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Long Description*</label>
                                <Editor
                                    value={formData.longDescription}
                                    onChange={handleEditorChange}
                                />
                            </div>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Thumbnail Image*</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'thumbnail')}
                                    className="w-full"
                                    required
                                />
                                {thumbnailPreview && (
                                    <div className="mt-2">
                                        <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-[100px] h-[100px] object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Main Image*</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'mainImg')}
                                    className="w-full"
                                    required
                                />
                                {mainImgPreview && (
                                    <div className="mt-2">
                                        <img src={mainImgPreview} alt="Main Image Preview" className="w-[100px] h-[100px] object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="col_ mb-4">
                                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100'
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : id ? 'Update Certificate' : 'Create Certificate'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CertificateForm;
