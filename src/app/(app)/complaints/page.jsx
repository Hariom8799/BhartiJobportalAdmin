"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchComplaints() {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/complaints`);
                const json = await res.json();
                if (json.success) {
                    setComplaints(json.data);
                } else {
                    setError("Failed to load complaints");
                }
            } catch {
                setError("Server error");
            } finally {
                setLoading(false);
            }
        }
        fetchComplaints();
    }, []);

    if (loading)
        return <div className="p-5 text-center text-gray-700">Loading...</div>;
    if (error)
        return (
            <div className="p-5 text-center text-red-600 font-semibold">{error}</div>
        );

    return (
        <div className="w-full p-5 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[24px] font-[600]">Feedback & Complaints</h1>
                <Link href="/">
                    <Button variant="outlined" className="btn-border">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="card dark:bg-themeDark w-full p-5 dark:border-[rgba(255,255,255,0.1)] overflow-x-auto rounded-md border border-gray-300">
                {complaints.length === 0 ? (
                    <p className="text-center text-gray-500">No complaints found.</p>
                ) : (
                    <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Name</th>
                                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Email</th>
                                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Contact</th>
                                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Message</th>
                                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((item) => (
                                <tr
                                    key={item._id}
                                    className="even:bg-gray-50 dark:even:bg-gray-800"
                                >
                                    <td className="border border-gray-300 dark:border-gray-600 p-3">
                                        {item.name}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 p-3">
                                        {item.email}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 p-3">
                                        {item.contactNo}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 p-3 break-words max-w-xs">
                                        {item.message}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 p-3">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-white text-sm ${item.status === "resolved"
                                                    ? "bg-green-600"
                                                    : "bg-yellow-600"
                                                }`}
                                        >
                                            {item.status === "resolved" ? "Resolved" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
