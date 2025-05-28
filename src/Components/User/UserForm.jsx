"use client";
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IoMdArrowBack } from "react-icons/io";

import toast from "react-hot-toast";

const UserForm = ({ }) => {
    const router = useRouter();
    const { id } = useParams();
    const userId = id || null;
    const isEditMode = !!userId;

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        departmentType: '',
        department: '',
        active: true,
    });

    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(isEditMode);
    const [departments, setDepartments] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (formData.departmentType) fetchDepartments(formData.departmentType);
    }, [formData.departmentType]);

    const fetchUserData = async () => {
        let loadingToast;
        try {
            setLoadingUser(true);
            loadingToast = toast.loading("Loading user data...");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`);
            const data = await res.json();
            if (data.success) {
                const { password, ...userData } = data.user;
                setFormData({
                    ...userData,
                    department: userData.department?._id || '',
                    active: userData.active ?? true
                });
                toast.success("User data loaded successfully");
            } else {
                toast.error('Failed to load user data');
            }
        } catch (err) {
            toast.error('Error loading user data');
        } finally {
            setLoadingUser(false);
            toast.dismiss(loadingToast);
        }
    };

    const fetchDepartments = async (type) => {
        const endpoint = {
            Govt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt`,
            Aided: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided`,
            Public: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public`,
        }[type];

        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            setDepartments(data.success ? data.departments : []);
        } catch {
            setDepartments([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'departmentType' ? { department: '' } : {})
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Name is required';
        if (!formData.username) errs.username = 'Username is required';
        if (!isEditMode && !formData.password) errs.password = 'Password is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
        if (!formData.departmentType) errs.departmentType = 'Department type is required';
        if (!formData.department) errs.department = 'Department is required';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setLoading(true);
        const method = isEditMode ? 'PUT' : 'POST';
        const endpoint = isEditMode ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}` : `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;
        const payload = { ...formData };
        if (isEditMode && !payload.password) delete payload.password;
        let submittingToast
        try {
             submittingToast = toast.loading(isEditMode ? "Updating user..." : "Creating user...");
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`User ${isEditMode ? 'updated' : 'created'} successfully`);
                router.push('/departments/users');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Error submitting form');
        } finally {
            setLoading(false);
            toast.dismiss(submittingToast);
        }
    };

    if (loadingUser) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">{isEditMode ? 'Edit' : 'Create'} User</h1>
                <Link href="/departments/users">
                    <Button variant="outlined" className="btn-border">Back to List</Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)] flex flex-col gap-4">

                    {[
                        { label: 'Name*', name: 'name', type: 'text' },
                        { label: 'Username*', name: 'username', type: 'text' },
                        { label: isEditMode ? 'Password (leave blank to keep unchanged)' : 'Password*', name: 'password', type: showPassword ? 'text' : 'password' },
                        { label: 'Email', name: 'email', type: 'email' },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="col_">
                            <label className="mb-2 block font-[500] text-gray-600 text-[14px]">{label}</label>
                            <div className="relative">
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    required={name !== 'email' && !(isEditMode && name === 'password')}
                                />
                                {name === 'password' && (
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </button>
                                )}
                            </div>
                            {errors[name] && (
                                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    <div className="col_">
                        <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Department Type*</label>
                        <select
                            name="departmentType"
                            value={formData.departmentType}
                            onChange={handleChange}
                            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                            required
                        >
                            <option value="">Select department type</option>
                            <option value="Govt">Government</option>
                            <option value="Aided">Aided</option>
                            <option value="Public">Public Undertaking</option>
                        </select>
                        {errors.departmentType && (
                            <p className="text-sm text-red-500 mt-1">{errors.departmentType}</p>
                        )}
                    </div>

                    <div className="col_">
                        <label className="mb-2 block font-[500] text-gray-600 text-[14px]">Department*</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={!formData.departmentType}
                            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                            required
                        >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>{dept.name}</option>
                            ))}
                        </select>
                        {errors.department && (
                            <p className="text-sm text-red-500 mt-1">{errors.department}</p>
                        )}
                    </div>

                    <div className="col_">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    name="active"
                                    color="primary"
                                />
                            }
                            label={formData.active ? "Active" : "Inactive"}
                        />
                    </div>


                    <div className="flex gap-3 mt-5">
                        <Button type="submit" className="btn-dark" disabled={loading}>
                            {loading ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
                        </Button>
                        <Link href="/departments/users">
                            <Button type="button" className="btn-border">Cancel</Button>
                        </Link>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default UserForm;
