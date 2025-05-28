"use client"
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import SearchBox from '@/Components/SearchBox';
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import toast from 'react-hot-toast';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'title', label: 'TITLE', minWidth: 200 },
  { id: 'thumbnail', label: 'THUMBNAIL', minWidth: 100 },
  {
    id: 'shortDescription',
    label: 'SHORT DESCRIPTION',
    minWidth: 200,
  },
  {
    id: 'status',
    label: 'STATUS',
    minWidth: 100,
  },
  {
    id: 'createdAt',
    label: 'CREATED AT',
    minWidth: 120,
  },
  {
    id: 'ACTIONS',
    label: 'ACTIONS',
    minWidth: 100,
  }
];

const SkillDataList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [skillData, setskillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch skill development data when component mounts
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development`);
      const result = await response.json();
      
      if (result.success) {
        setskillData(result.data);
      } else {
        console.error('Failed to fetch skill development:', result.message);
        toast.error('Failed to fetch skill development: ' + result.message);
      }
    } catch (error) {
      console.error('Error fetching skill development:', error);
      toast.error('Error fetching skill development');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill development?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
          // Remove the deleted item from state
          setskillData(skillData.filter(item => item._id !== id));
          
          toast.success('Skill development deleted successfully');
        } else {
          toast.error(`Failed to delete: ${result.message}`);
        }
      } catch (error) {
        toast.error('An error occurred while deleting');
      }
    }
  };

  // Filter skill development based on search query
  const filteredSkillData = skillData.filter(skill =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">Recent skill development</h2>
        <div className="ml-auto flex items-center gap-3">
          <Button className="gap-2 btn-border !capitalize">
            <PiExportBold size={20} /> Export
          </Button>
          <Link href="/skills/add">
            <Button className="gap-2 btn-dark !capitalize">
              <IoMdAdd size={20} /> Add skill development
            </Button>
          </Link>
        </div>
      </div>

      <div className='flex items-center justify-between w-full px-5 mb-4'>
        <SearchBox
          placeholder="Search skill development..."
          width={"500px"}
          onSearch={handleSearch}
        />
        <Button className="gap-2 btn-border !capitalize">
          <LiaFilterSolid size={20} /> Filters
        </Button>
      </div>

      {loading ? (
        <div className="p-5 text-center">Loading...</div>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSkillData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((skill) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={skill._id}>
                        <TableCell>
                          <Checkbox {...label} size="small" />
                        </TableCell>
                        <TableCell>
                          <div className="flex-col w-[200px]">
                            <h3 className="font-[600]">{skill.title}</h3>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-center rounded-md w-[80px] h-[60px] overflow-hidden">
                            <img
                              src={skill.thumbnail}
                              className="w-full h-full object-cover"
                              alt={skill.title}
                            />
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="w-[200px] truncate">
                            {skill.shortDescription}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex items-center gap-1'>
                            <span className={`flex items-center justify-center w-[10px] h-[10px] rounded-full
                                ${skill.status === "active" ? "bg-[#4ad47a]" : "bg-[#c9b23d]"}`}>
                            </span>
                            <span className={`capitalize ${skill.status === "active" ? "text-[#4ad47a]" : "text-[#c9b23d]"}`}>
                              {skill.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(skill.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1 actions w-[150px]">
                            <Tooltip title="Edit" placement="top">
                              <Link href={`/skills/edit/${skill._id}`}>
                                <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100">
                                  <MdOutlineEdit size={22} className="text-themeDark dark:!text-gray-100" />
                                </Button>
                              </Link>
                            </Tooltip>

                            <Tooltip title="View" placement="top">
                              <Link href={`/skills/view/${skill._id}`}>
                                <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100">
                                  <FaRegEye size={22} className="text-themeDark dark:!text-gray-100" />
                                </Button>
                              </Link>
                            </Tooltip>

                            <Tooltip title="Delete" placement="top">
                              <Button
                                className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"
                                onClick={() => handleDelete(skill._id)}
                              >
                                <MdOutlineDeleteOutline size={22} className="text-themeDark dark:!text-gray-100" />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredSkillData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default SkillDataList;