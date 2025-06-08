"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Tabs, Tab } from "@mui/material";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import SearchBox from "@/Components/SearchBox";
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "name", label: "NAME", minWidth: 200 },
  { id: "language", label: "LANGUAGE", minWidth: 120 },
  { id: "mainImg", label: "IMAGE", minWidth: 100 },
  { id: "createdAt", label: "CREATED AT", minWidth: 120 },
  { id: "ACTIONS", label: "ACTIONS", minWidth: 100 },
];


const DepartmentDataList = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the department type from the URL path
  const getDepartmentTypeFromPath = (path) => {
    if (path.includes("/departments/government")) return "government";
    if (path.includes("/departments/aided")) return "aided";
    if (path.includes("/departments/public")) return "public";
    return "government"; // Default to government if path doesn't match
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(getDepartmentTypeFromPath(pathname));

  useEffect(() => {
    const currentType = getDepartmentTypeFromPath(pathname);
    setActiveTab(currentType);
  }, [pathname]);

  useEffect(() => {
    fetchDepartments();
  }, [activeTab]);

  const getApiEndpoint = (type) => {
    const endpoints = {
      government: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt`,
      aided: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided`,
      public: `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public`,
    };
    return endpoints[type] || endpoints["government"];
  };

  const fetchDepartments = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Fetching departments...");
      const response = await fetch(getApiEndpoint(activeTab));
      const result = await response.json();

      if (result.success) {
        setDepartmentData(result.departments);
        toast.success("Departments fetched successfully");
      } else {
        toast.error(`Failed to fetch departments: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Error fetching departments");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    router.push(`/departments/${newValue}`);
    setPage(0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const loadingToast = toast.loading("Deleting department...");
        const response = await fetch(`${getApiEndpoint(activeTab)}/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          setDepartmentData(departmentData.filter((item) => item._id !== id));
          toast.success("Department deleted successfully");
        } else {
          toast.error(`Failed to delete: ${result.message}`);
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        toast.error("An error occurred while deleting");
      } finally {
        toast.dismiss();
      }
    }
  };

  const getDepartmentTypeLabel = (type) => {
    switch (type) {
      case "government":
        return "Government Departments";
      case "aided":
        return "Aided Departments";
      case "public":
        return "Public Undertakings";
      default:
        return "Departments";
    }
  };

  const getAddLink = () => {
    return `/departments/${activeTab}/add`;
  };

  const getEditLink = (id) => {
    return `/departments/${activeTab}/edit/${id}`;
  };

  const filteredDepartmentData = departmentData.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <div className="card w-full py-1 pl-3 pb-5 dark:bg-themeDark dark:border-[rgba(255,255,255,0.1)] mt-4">
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">
          {getDepartmentTypeLabel(activeTab)}
        </h2>
        <div className="ml-auto flex items-center gap-3">
          {/* <Button className="gap-2 btn-border !capitalize">
            <PiExportBold size={20} /> Export
          </Button> */}
          <Link href={getAddLink()}>
            <Button className="gap-2 btn-dark !capitalize">
              <IoMdAdd size={20} /> Add Department
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-5 mb-4">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="department type tabs"
          variant="fullWidth"
        >
          <Tab label="Government Departments" value="government" />
          <Tab label="Aided Departments" value="aided" />
          <Tab label="Public Undertakings" value="public" />
        </Tabs>
      </div>

      <div className="flex items-center justify-between w-full px-5 mb-4">
        <SearchBox
          placeholder="Search departments..."
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
                  {filteredDepartmentData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} align="center">
                        No departments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDepartmentData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((dept) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={dept._id}
                          >
                            <TableCell>
                              <Checkbox {...label} size="small" />
                            </TableCell>
                            <TableCell>
                              <div className="flex-col w-[200px]">
                                <h3 className="font-[600]">{dept.name}</h3>
                              </div>
                            </TableCell>

                            <TableCell>{dept.language}</TableCell>

                            <TableCell>
                              {dept.mainImg ? (
                                <img
                                  src={dept.mainImg}
                                  alt={dept.name}
                                  className="w-[50px] h-[50px] object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-[50px] h-[50px] bg-gray-300 flex items-center justify-center rounded-md">
                                  <span>No Image</span>
                                </div>
                              )}
                            </TableCell>

                            <TableCell>
                              {new Date(dept.createdAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-1 actions">
                                <Tooltip title="Edit" placement="top">
                                  <Link href={getEditLink(dept._id)}>
                                    <Button className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100">
                                      <MdOutlineEdit
                                        size={22}
                                        className="text-themeDark dark:!text-gray-100"
                                      />
                                    </Button>
                                  </Link>
                                </Tooltip>

                                <Tooltip title="Delete" placement="top">
                                  <Button
                                    className="!min-w-[32px] !w-[32px] !h-[32px] !text-themeDark dark:!text-gray-100"
                                    onClick={() => handleDelete(dept._id)}
                                  >
                                    <MdOutlineDeleteOutline
                                      size={22}
                                      className="text-themeDark dark:!text-gray-100"
                                    />
                                  </Button>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredDepartmentData.length}
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

export default DepartmentDataList;
