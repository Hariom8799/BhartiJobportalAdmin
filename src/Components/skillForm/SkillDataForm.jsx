"use client";
import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const SkillForm = () => {
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

  useEffect(() => {
    if (id) fetchSkillDetails();
  }, [id]);

  const fetchSkillDetails = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading('Loading skill details...');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development/${id}`);
      const data = await res.json();

      if (data.success) {
        setFormData({
          title: data.data.title || '',
          shortDescription: data.data.shortDescription || '',
          longDescription: data.data.longDescription || '',
          status: data.data.status || 'inactive',
        });
        setThumbnailPreview(data.data.thumbnail || null);
        setMainImgPreview(data.data.mainImg || null);
        toast.success('Skill details loaded successfully');
      } else {
        toast.error('Failed to load skill details');
      }
    } catch (error) {
      toast.error('An error occurred while loading');
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (e) => {
    setFormData((prev) => ({ ...prev, longDescription: e.target.value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'thumbnail') {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else if (type === 'mainImg') {
      setMainImg(file);
      setMainImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.shortDescription ||
      !formData.longDescription ||
      (!thumbnail && !thumbnailPreview) ||
      (!mainImg && !mainImgPreview)
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    let submittingToast;
    try {
      setSubmitting(true);
      submittingToast = toast.loading(id ? 'Updating skill...' : 'Creating skill...');

      const apiUrl = id
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development/${id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development`;

      const method = id ? 'PUT' : 'POST';

      const form = new FormData();
      form.append('title', formData.title);
      form.append('shortDescription', formData.shortDescription);
      form.append('longDescription', formData.longDescription);
      form.append('status', formData.status);

      if (thumbnail) form.append('images', thumbnail);
      if (mainImg) form.append('images', mainImg);

      if (!thumbnail && thumbnailPreview) {
        form.append('existingThumbnail', thumbnailPreview);
      }
      if (!mainImg && mainImgPreview) {
        form.append('existingMainImg', mainImgPreview);
      }

      const res = await fetch(apiUrl, {
        method,
        body: form,
      });

      const result = await res.json();

      if (result.success) {
        toast.success(id ? 'Skill updated successfully' : 'Skill created successfully');
        router.push('/skills');
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    } finally {
      setSubmitting(false);
      toast.dismiss(submittingToast);
    }
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[20px] font-[600]">{id ? 'Edit' : 'Create'} Skill</h1>
        <Link href="/skills">
          <Button variant="outlined" className="btn-border">Back to List</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex gap-3 mt-3">
          <div className="w-full flex flex-col gap-3">
            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-[18px] font-[600] mb-4">Basic Information</h2>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  required
                  className="w-full h-[45px] px-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Short Description*</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Enter short description"
                  required
                  className="w-full h-[100px] p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Long Description*</label>
                <Editor value={formData.longDescription} onChange={handleEditorChange} />
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Thumbnail Image*</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'thumbnail')} />
                {thumbnailPreview && (
                  <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-[150px] mt-2 border rounded" />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Main Image*</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'mainImg')} />
                {mainImgPreview && (
                  <img src={mainImgPreview} alt="Main Image Preview" className="w-[150px] mt-2 border rounded" />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-[500] text-gray-600 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-[45px] px-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                >
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </select>
              </div>

              <div className="flex gap-3 mt-5">
                <Button type="submit" className="btn-dark" disabled={submitting}>
                  {submitting ? 'Saving...' : id ? 'Update Skill' : 'Create Skill'}
                </Button>
                <Link href="/skills">
                  <Button type="button" className="btn-border">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
