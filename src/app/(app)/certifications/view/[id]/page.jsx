"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewCertificateData = () => {
    const { id } = useParams();
    const [certificateData, setCertificateData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCertificateDetails = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/state-certificates/${id}`);
            const result = await response.json();

            if (result.success) {
                setCertificateData(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch certificate details');
                console.error('Failed to fetch certificate details:', result.message);
            }
        } catch (error) {
            console.error('Error fetching certificate details:', error);
            toast.error('Error fetching certificate details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCertificateDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (!certificateData) {
        return <div className="p-5 text-center">Certificate not found</div>;
    }

    return (
        <div className="w-full p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">View Certificate</h1>
                <div className="flex gap-2">
                    <Link href={`/certificate/edit/${id}`}>
                        <Button variant="contained" className="btn-dark gap-2">
                            <MdOutlineEdit size={18} /> Edit
                        </Button>
                    </Link>
                    <Link href="/certificate">
                        <Button variant="outlined" className="btn-border">Back to List</Button>
                    </Link>
                </div>
            </div>

            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-[600]">{certificateData.title}</h2>
                        <div className={`px-3 py-1 rounded-full text-white text-sm ${certificateData.status === "active" ? "bg-green-600" : "bg-yellow-600"
                            }`}>
                            {certificateData.status}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3">
                            <div className="rounded-md overflow-hidden">
                                <img
                                    src={certificateData.mainImg}
                                    alt={certificateData.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Thumbnail</h3>
                                <div className="rounded-md overflow-hidden w-32 h-24">
                                    <img
                                        src={certificateData.thumbnail}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Issued On</h3>
                                <p>{new Date(certificateData.createdAt).toLocaleString()}</p>
                            </div>
                            {certificateData.updatedAt && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Updated On</h3>
                                    <p>{new Date(certificateData.updatedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="mb-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Short Description</h3>
                                <p className="bg-gray-50 p-3 rounded-md">{certificateData.shortDescription}</p>
                            </div>
                            <div>
                                <h3 className="font-[500] text-gray-700 mb-2">Long Description</h3>
                                <div
                                    className="bg-gray-50 p-3 rounded-md"
                                    dangerouslySetInnerHTML={{ __html: certificateData.longDescription }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCertificateData;
