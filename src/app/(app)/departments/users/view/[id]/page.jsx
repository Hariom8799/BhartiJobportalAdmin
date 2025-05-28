"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Grid,
    Divider,
    Chip
} from '@mui/material';
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const UserView = ({}) => {
    const {id} = useParams();
    const userId = id || null;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [departmentName, setDepartmentName] = useState("");

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (userData) {
            fetchDepartmentName();
        }
    }, [userData]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`);
            const result = await response.json();

            if (result.success) {
                setUserData(result.user);
            } else {
                console.error('Failed to fetch user:', result.message);
                toast.error(result.message || 'Failed to load user data');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            toast.error('An error occurred while fetching user data');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartmentName = async () => {
        try {
            let endpoint;
            switch (userData.departmentType) {
                case 'Govt':
                    endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt/${userData.department._id}`;
                    break;
                case 'Aided':
                    endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided/${userData.department._id}`;
                    break;
                case 'Public':
                    endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public/${userData.department._id}`;
                    break;
                default:
                    return;
            }

            const response = await fetch(endpoint);
            const result = await response.json();

            if (result.success) {
                setDepartmentName(result.department.name);
            } else {
                console.error('Failed to fetch department:', result.message);
            }
        } catch (error) {
            console.error('Error fetching department:', error);
        }
    };

    const getDepartmentTypeLabel = (type) => {
        switch (type) {
            case 'Govt':
                return 'Government Department';
            case 'Aided':
                return 'Aided Department';
            case 'Public':
                return 'Public Undertaking';
            default:
                return type;
        }
    };

    const getStatusColor = (type) => {
        switch (type) {
            case 'Govt':
                return '#4ad47a';
            case 'Aided':
                return '#c9b23d';
            case 'Public':
                return '#6366f1';
            default:
                return 'primary';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userData) {
        return (
            <Paper className="w-full p-6 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
                <Typography>User not found</Typography>
                <Link href="/departments/users">
                    <Button className="mt-4 gap-2 btn-border !capitalize">
                        <IoMdArrowBack size={20} /> Back to Users
                    </Button>
                </Link>
            </Paper>
        );
    }

    return (
        <Paper className="w-full p-6 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
            <Box className="mb-6 flex items-center justify-between ">
                <div className="flex flex-col space-y-3 ">
                    <h1  className="text-gray-800 text-3xl dark:text-white font-bold">
                        User Details
                    </h1>
                    <Link href="/departments/users">
                        <Button className="gap-2 btn-border !capitalize">
                            <IoMdArrowBack size={20} /> Back to Users
                        </Button>
                    </Link>
                    
                </div>
                <Link href={`/departments/users/edit/${userId}`}>
                    <Button className="gap-2 btn-dark !capitalize">
                        <MdOutlineEdit size={20} /> Edit User
                    </Button>
                </Link>
            </Box>

            <Divider className="mb-6" />

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-full">
                        <Typography variant="h6" className="font-bold mb-4">
                            Basic Information
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Full Name
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {userData.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Username
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {userData.username}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Email
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {userData.email || "-"}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Status
                                </Typography>
                                <Chip
                                    label={userData.active ? "Active" : "Inactive"}
                                    sx={{
                                        bgcolor: userData.active ? '#4caf50' : '#f44336',
                                        color: '#fff',
                                        fontWeight: 600,
                                        mt: 1
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Created At
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {new Date(userData.createdAt).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-full">
                        <Typography variant="h6" className="font-bold mb-4">
                            Department Information
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Department Type
                                </Typography>
                                <Box className="flex items-center mt-1">
                                    <Chip
                                        label={getDepartmentTypeLabel(userData.departmentType)}
                                        sx={{
                                            bgcolor: getStatusColor(userData.departmentType),
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                    Department
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {departmentName || "Loading..."}
                                </Typography>
                            </Grid>

                            {typeof userData.department === 'object' && userData.department._id && (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" className="text-gray-500 dark:text-gray-400">
                                        Department ID
                                    </Typography>
                                    <Typography variant="body1" className="font-semibold text-gray-600 dark:text-gray-300">
                                        {userData.department._id}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserView;