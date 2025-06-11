"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewSkillData = () => {
    const { id } = useParams();
    const [skillData, setSkillData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSkillDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development/${id}`);
            const result = await response.json();

            if (result.success) {
                setSkillData(result.data);
                toast.success('Skill data fetched successfully!');
            } else {
                console.error('Failed to fetch skill data details:', result.message);
                toast.error('Failed to fetch skill data details.');
            }
        } catch (error) {
            console.error('Error fetching skill data details:', error);
            toast.error('An error occurred while fetching skill data details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("ID:", id);

        if (id) {
            fetchSkillDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (!skillData) {
        return <div className="p-5 text-center">Skill data not found</div>;
    }

    return (
        <div className="w-full p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">View Skill Data</h1>
                <div className="flex gap-2">
                    <Link href={`/skills/edit/${id}`}>
                        <Button variant="contained" className="btn-dark gap-2">
                            <MdOutlineEdit size={18} /> Edit
                        </Button>
                    </Link>
                    <Link href="/skills">
                        <Button variant="outlined" className="btn-border">Back to List</Button>
                    </Link>
                </div>
            </div>

            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-[600]">{skillData.title}</h2>
                        <h2 className="text-[24px] font-[600]">{skillData.contactNo}</h2>
                        <div className={`px-3 py-1 rounded-full text-white text-sm ${skillData.status === "active" ? "bg-green-600" : "bg-yellow-600"}`}>
                            {skillData.status}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3">
                            <div className="rounded-md overflow-hidden">
                                <img
                                    src={skillData.mainImg}
                                    alt={skillData.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <div className="mt-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Thumbnail</h3>
                                <div className="rounded-md overflow-hidden w-32 h-24">
                                    <img
                                        src={skillData.thumbnail}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Document Section Added Here */}
                            {skillData.document && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Document</h3>
                                    <a
                                        href={skillData.document}
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
                                <p>{new Date(skillData.createdAt).toLocaleString()}</p>
                            </div>

                            {skillData.updatedAt && (
                                <div className="mt-4">
                                    <h3 className="font-[500] text-gray-700 mb-2">Updated At</h3>
                                    <p>{new Date(skillData.updatedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="mb-4">
                                <h3 className="font-[500] text-gray-700 mb-2">Short Description</h3>
                                <p className="bg-gray-50 p-3 rounded-md">{skillData.shortDescription}</p>
                            </div>
                            <div>
                                <h3 className="font-[500] text-gray-700 mb-2">Long Description</h3>
                                <div
                                    className="bg-gray-50 p-3 rounded-md"
                                    dangerouslySetInnerHTML={{ __html: skillData.longDescription }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSkillData;
