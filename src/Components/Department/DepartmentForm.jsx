"use client";
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";

const DepartmentForm = () => {
    const { id } = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const isEditMode = !!id;

    // Determine the department type based on URL path
    const getDepartmentTypeFromPath = (path) => {
        if (path.includes("/departments/government")) return "Govt";
        if (path.includes("/departments/aided")) return "Aided";
        if (path.includes("/departments/public")) return "Public";
        return "Govt"; // fallback
    };

    const activeTab = getDepartmentTypeFromPath(pathname);

    const [formData, setFormData] = useState({
        name: "",
        language: "English",
        mainImg: null,
    });

    const [loading, setLoading] = useState(false);
    const [loadingDepartment, setLoadingDepartment] = useState(isEditMode);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            fetchDepartmentData();
        }
    }, [id, activeTab]);

    const getApiEndpoint = (type, id = null) => {
        const baseEndpoints = {
            Govt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt`,
            Aided: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided`,
            Public: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public`,
        };
        return id ? `${baseEndpoints[type]}/${id}` : baseEndpoints[type];
    };

    const fetchDepartmentData = async () => {
        let loadingToast;
        try {
            setLoadingDepartment(true);
            loadingToast = toast.loading("Loading department data...");
            const response = await fetch(getApiEndpoint(activeTab, id));
            const result = await response.json();

            if (result.success) {
                setFormData(result.department);
                toast.success("Department data loaded successfully");
            } else {
                toast.error("Failed to load department data");
            }
        } catch (error) {
            console.error("Error fetching department:", error);
            toast.error("An error occurred while fetching department data");
        } finally {
            setLoadingDepartment(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, mainImg: file }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.language.trim()) newErrors.language = "Language is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let loadingToast;
        try {
            setLoading(true);
            loadingToast = toast.loading(isEditMode ? "Updating department..." : "Creating department...");

            const url = isEditMode ? getApiEndpoint(activeTab, id) : getApiEndpoint(activeTab);
            const method = isEditMode ? "PUT" : "POST";

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("language", formData.language);

            if (formData.mainImg && typeof formData.mainImg !== "string") {
                formDataToSend.append("mainImg", formData.mainImg);
            }

            if (isEditMode && typeof formData.mainImg === "string") {
                formDataToSend.append("existingMainImg", formData.mainImg);
            }

            const response = await fetch(url, {
                method,
                body: formDataToSend,
            });

            const result = await response.json();
            if (result.success) {
                toast.success(isEditMode ? "Department updated successfully" : "Department created successfully");
                const redirectPath = `/departments/${activeTab.toLowerCase() === 'govt' ? 'government' : activeTab.toLowerCase()}`;
                router.push(redirectPath);
            } else {
                toast.error(`Failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while submitting the form");
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };
      

    if (loadingDepartment) {
        return <div className="p-5 text-center"><CircularProgress /></div>;
    }

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[20px] font-[600]">{isEditMode ? 'Edit' : 'Create'} Department</h1>
                <Link href={`/departments/${activeTab.toLowerCase() === 'govt' ? 'government' : activeTab.toLowerCase()}`}>
                    <Button variant="outlined" className="btn-border flex items-center gap-2">
                        <IoMdArrowBack size={20} /> Back to List
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
                    <h2 className="text-[18px] font-[600] mb-4">Basic Information</h2>

                    <div className="col_ mb-4">
                        <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100'
                            placeholder="Enter department name"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="col_ mb-4">
                        <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Language*</label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100'
                            required
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
                    </div>

                    <div className="col_ mb-4">
                        <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Department Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="mainImg"
                            onChange={handleImageChange}
                            className='w-full border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100'
                        />
                        {formData.mainImg && typeof formData.mainImg === 'object' && (
                            <img src={URL.createObjectURL(formData.mainImg)} alt="Preview" className="mt-2 w-[100px] h-[100px] object-cover rounded-md" />
                        )}
                        {formData.mainImg && typeof formData.mainImg === 'string' && (
                            <img src={formData.mainImg} alt="Preview" className="mt-2 w-[100px] h-[100px] object-cover rounded-md" />
                        )}
                    </div>

                    <div className="flex gap-3 mt-5">
                        <Button
                            type="submit"
                            className="btn-dark"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isEditMode ? 'Update Department' : 'Create Department'}
                        </Button>
                        <Link href={`/departments/${activeTab.toLowerCase() === 'govt' ? 'government' : activeTab.toLowerCase()}`}>
                            <Button type="button" className="btn-border">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </form >
        </div >
       
    );
};

export default DepartmentForm;
