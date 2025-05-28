"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewImageSlider = () => {
    const { id } = useParams();
    const [slider, setSlider] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSliderDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image-slider/${id}`);
            const result = await response.json();

            if (result.success) {
                setSlider(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch slider details');
                console.error('Failed to fetch slider details:', result.message);
            }
        } catch (error) {
            toast.error('Error fetching slider details');
            console.error('Error fetching slider details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchSliderDetails();
    }, [id]);

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (!slider) {
        return <div className="p-5 text-center">Slider not found</div>;
    }

    return (
        <div className="w-full p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">View Image Slider</h1>
                <div className="flex gap-2">
                    <Link href={`/image-slider/edit/${id}`}>
                        <Button variant="contained" className="btn-dark gap-2">
                            <MdOutlineEdit size={18} /> Edit
                        </Button>
                    </Link>
                    <Link href="/image-slider">
                        <Button variant="outlined" className="btn-border">Back to List</Button>
                    </Link>
                </div>
            </div>

            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-[600]">{slider.title}</h2>
                        <div className={`px-3 py-1 rounded-full text-white text-sm ${slider.status === "active" ? "bg-green-600" : "bg-yellow-600"}`}>
                            {slider.status}
                        </div>
                    </div>

                    {/* Main Image Display */}
                    <div className="relative w-full max-w-4xl mx-auto">
                        <div className="overflow-hidden rounded-md h-[400px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <img
                                src={slider.mainImg}
                                alt={slider.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-[500] text-gray-700 dark:text-gray-200 mb-2">Description</h3>
                        <p className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">{slider.description || 'No description available.'}</p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6">
                        <div>
                            <h3 className="font-[500] text-gray-700 dark:text-gray-200 mb-1">Created At</h3>
                            <p>{new Date(slider.createdAt).toLocaleString()}</p>
                        </div>
                        {slider.updatedAt && (
                            <div>
                                <h3 className="font-[500] text-gray-700 dark:text-gray-200 mb-1">Updated At</h3>
                                <p>{new Date(slider.updatedAt).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewImageSlider;
