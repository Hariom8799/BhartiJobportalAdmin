"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewJobNews = () => {
    const { id } = useParams();
    const [jobNews, setJobNews] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJobNewsDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recent-job-news/${id}`);
            const result = await response.json();

            if (result.success) {
                setJobNews(result.data);
                toast.success('Job news details fetched successfully!');
            } else {
                console.error('Failed to fetch job news details:', result.message);
                toast.error('Failed to fetch job news details.');
            }
        } catch (error) {
            console.error('Error fetching job news details:', error);
            toast.error('An error occurred while fetching job news details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchJobNewsDetails();
        }
    }, [id]);

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    if (!jobNews) return <div className="p-5 text-center">Job news not found</div>;

    return (
        <div className="w-full p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">View Job News</h1>
                <div className="flex gap-2">
                    <Link href={`/job-news/edit/${id}`}>
                        <Button variant="contained" className="btn-dark gap-2">
                            <MdOutlineEdit size={18} /> Edit
                        </Button>
                    </Link>
                    <Link href="/job-news">
                        <Button variant="outlined" className="btn-border">Back to List</Button>
                    </Link>
                </div>
            </div>

            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-[600]">{jobNews.title}</h2>
                        <div className={`px-3 py-1 rounded-full text-white text-sm ${jobNews.status === "active" ? "bg-green-600" : "bg-yellow-600"}`}>
                            {jobNews.status}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3">
                            <div className="rounded-md overflow-hidden">
                                <img
                                    src={jobNews.mainImg}
                                    alt={jobNews.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Thumbnail</h3>
                                <div className="rounded-md overflow-hidden w-32 h-24">
                                    <img
                                        src={jobNews.thumbnail}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {jobNews.document && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Document</h3>
                                    <a
                                        href={jobNews.document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View / Download Document
                                    </a>
                                </div>
                            )}

                            <div className="mt-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Created At</h3>
                                <p>{new Date(jobNews.createdAt).toLocaleString()}</p>
                            </div>

                            {jobNews.updatedAt && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Updated At</h3>
                                    <p>{new Date(jobNews.updatedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="mb-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Short Description</h3>
                                <p className="bg-gray-50 p-3 rounded-md">{jobNews.shortDescription}</p>
                            </div>

                            <div>
                                <h3 className="font-[500] text-gray-700 mb-2">Long Description</h3>
                                <div
                                    className="bg-gray-50 p-3 rounded-md"
                                    dangerouslySetInnerHTML={{ __html: jobNews.longDescription }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewJobNews;
