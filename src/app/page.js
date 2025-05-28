"use client";
import DashboardBoxes from "@/Components/DashboardBox";
import { Button } from "@mui/material";
import { FiPlus } from "react-icons/fi";

import {
  AreaChart,
  ComposedChart,
  LineChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbSocial } from "react-icons/tb";
import YearSelect from "@/Components/YearSelect";
import Cookies from "js-cookie";
import SearchBox from "@/Components/SearchBox";
import Orders from "./(app)/orders/page";

// Custom Tooltip Component
const CustomTooltipProfit = ({ active, payload, label }) => {
  const theme = Cookies.get("theme");
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme === "dark" ? "#151515" : "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>Days:</strong> {label}
        </p>
        <p>
          <span style={{ color: "#8884d8" }}>Total Profit:</span>{" "}
          {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const CustomTooltipSalesReport = ({ active, payload, label }) => {
  const theme = Cookies.get("theme");
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme === "dark" ? "#151515" : "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>Month:</strong> {label}
        </p>
        <p>
          <span style={{ color: "#8884d8" }}>Revenue:</span> ${payload[0].value}
        </p>
        <p>
          <span style={{ color: "#1a9ced" }}>Expense:</span> ${payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const CustomerRateTooltip = ({ active, payload, label }) => {
  const theme = Cookies.get("theme");
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme === "dark" ? "#151515" : "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>Month:</strong> {label}
        </p>
        <p>
          <span style={{ color: "#10b780" }}>New Customers:</span>{" "}
          {payload[0].value}
        </p>
        <p>
          <span style={{ color: "#3872fa" }}>Old Customers:</span>{" "}
          {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

export default function Home() {
  const profitData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const salesData = [
    {
      name: "JAN",
      revenue: 5000,
      expense: 1500,
    },
    {
      name: "FEB",
      revenue: 7500,
      expense: 3500,
    },
    {
      name: "MAR",
      revenue: 4500,
      expense: 2700,
    },
    {
      name: "APRIL",
      revenue: 2754,
      expense: 4859,
    },
    {
      name: "MAY",
      revenue: 6574,
      expense: 9574,
    },
    {
      name: "JUNE",
      revenue: 7485,
      expense: 4758,
    },
    {
      name: "JULY",
      revenue: 2458,
      expense: 1500,
    },
    {
      name: "AUG",
      revenue: 4758,
      expense: 6452,
    },
    {
      name: "SEP",
      revenue: 7485,
      expense: 2545,
    },
    {
      name: "OCT",
      revenue: 1745,
      expense: 1500,
    },
    {
      name: "NOV",
      revenue: 7485,
      expense: 4759,
    },
    {
      name: "DEC",
      revenue: 4156,
      expense: 3585,
    },
  ];

  const customerRateData = [
    {
      name: "JAN",
      newCustomer: 4000,
      oldCustomer: 2400,
    },
    {
      name: "FEB",
      newCustomer: 4500,
      oldCustomer: 2800,
    },
    {
      name: "MARCH",
      newCustomer: 5200,
      oldCustomer: 3200,
    },
    {
      name: "APRIL",
      newCustomer: 6500,
      oldCustomer: 3500,
    },
    {
      name: "MAY",
      newCustomer: 3500,
      oldCustomer: 1850,
    },
    {
      name: "JUNE",
      newCustomer: 3800,
      oldCustomer: 2250,
    },
    {
      name: "JULY",
      newCustomer: 4500,
      oldCustomer: 2700,
    },
    {
      name: "AUG",
      newCustomer: 4800,
      oldCustomer: 3200,
    },
    {
      name: "SEP",
      newCustomer: 4500,
      oldCustomer: 2400,
    },
    {
      name: "OCT",
      newCustomer: 4000,
      oldCustomer: 3500,
    },
    {
      name: "NOV",
      newCustomer: 4000,
      oldCustomer: 2400,
    },
    {
      name: "DEC",
      newCustomer: 7000,
      oldCustomer: 2400,
    },
  ];

  const [revenue, setRevenue] = useState("Monthly");
  const [selectedProfit, setSelectedProfit] = useState(0);

  const handleChangeRevenue = (event) => {
    setRevenue(event.target.value);
  };

  const selectProfit = (index) => {
    setSelectedProfit(index);
  };

  const changeYear = (date) => {
    console.log(date);
  };

  return (
    <>
      <div className="box_dashbiard mb-4 w-full h-auto rounded-md border border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.2)] bg-white dark:bg-themeDark py-1 px-5 flex items-center justify-between ">
        <div className="left_col flex flex-col gap-4">
          <h1 className="text-[35px] font-bold leading-10 dark:text-gray-100">
            Good Morning, <br />
            Cameron
          </h1>
          <p className="text-[16px] text-gray-800  dark:text-gray-100">
            Here’s What happening on your store today. See the statistics at
            once.
          </p>

          <div>
            <Button className="!bg-dark !text-white !capitalize !font-[600] !px-4 dark:!bg-white dark:!text-black">
              <FiPlus size={20} className="text-white dark:!text-black" /> Add
              Product
            </Button>
          </div>
        </div>

        <div className="rightCol w-[250px]">
          <img src="/shop-illustration.webp" className="w-full" />
        </div>
      </div>

      {/* <DashboardBoxes /> */}

      <div className="flex gap-4 my-4">
        <div className="card  dark:bg-themeDark p-0 w-[65%] dark:border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between p-5">
            <div className="leftCol">
              <h2 className="text-[18px]">Total Profit</h2>
              <span className="text-[22px] font-bold">$8,950.00</span>
            </div>

            <Button variant="outlined" className="!capitalize" size="small">
              Details
            </Button>
          </div>

          <div className="p-5 pt-0">
            <div className="w-full rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] py-2 flex items-center justify-between px-4">
              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 0 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(0)}
              >
                5D{" "}
              </span>

              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 1 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(1)}
              >
                2W{" "}
              </span>

              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 2 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(2)}
              >
                1M{" "}
              </span>

              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 3 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(3)}
              >
                6M{" "}
              </span>

              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 4 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(4)}
              >
                1Y{" "}
              </span>

              <span
                className={`flex items-center justify-center p-2 px-4 rounded-md text-[14px] cursor-pointer ${
                  selectedProfit === 5 && "bg-gray-300 dark:bg-gray-800"
                }`}
                onClick={() => selectProfit(5)}
              >
                2Y{" "}
              </span>
            </div>
          </div>

          <div className="w-full h-[250px] ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={profitData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Tooltip content={<CustomTooltipProfit />} />
                <Area
                  type="monotone"
                  dataKey="uv"
                  strokeWidth={3}
                  stroke="#8884d8"
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card  dark:bg-themeDark w-[35%] p-5 dark:border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            <div className="leftCol">
              <h2 className="text-[20px] font-bold">Channel revenue</h2>
            </div>

            <Select
              value={revenue}
              onChange={handleChangeRevenue}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value={"Monthly"}>Monthly</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
              <MenuItem value={"Annualy"}>Annualy</MenuItem>
            </Select>
          </div>

          <h3 className="flex items-center gap-2">
            <span className="text-[30px] font-bold">3.4%</span>
            <span>Growth Rate</span>
          </h3>

          <div className="grid grid-cols-3 gap-5 mt-5 mb-4">
            <div className="box__ flex flex-col">
              <span className="flex w-full h-[5px] rounded-full bg-blue-400"></span>
              <span className="font-[600]">28%</span>
            </div>

            <div className="box__ flex flex-col">
              <span className="flex w-full h-[5px] rounded-full bg-green-200"></span>
              <span className="font-[600]">38%</span>
            </div>

            <div className="box__ flex flex-col">
              <span className="flex w-full h-[5px] rounded-full bg-orange-200"></span>
              <span className="font-[600]">42%</span>
            </div>
          </div>

          <div className="p-4 py-6 bg-gray-200 dark:bg-[rgba(255,255,255,0.050)] rounded-md w-full mt-3 grid grid-cols-3 gap-2">
            <div className="col_ flex items-center justify-center flex-col">
              <span className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-blue-400">
                <MdOutlineShoppingCart size={25} className="dark:text-black" />
              </span>
              <h3 className="text-[16px] font-[600] mt-2">$2.9K</h3>
              <p className="text-[14px]">Online store</p>
            </div>

            <div className="col_ flex items-center justify-center flex-col">
              <span className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-green-200">
                <IoStorefrontOutline size={25} className="dark:text-black" />
              </span>
              <h3 className="text-[16px] font-[600] mt-2">$2.9K</h3>
              <p className="text-[14px]">Online store</p>
            </div>

            <div className="col_ flex items-center justify-center flex-col">
              <span className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-orange-200">
                <TbSocial size={25} className="dark:text-black" />
              </span>
              <h3 className="text-[16px] font-[600] mt-2">$2.9K</h3>
              <p className="text-[14px]">Online store</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card  dark:bg-themeDark w-full p-0 pr-1 pb-5 dark:border-[rgba(255,255,255,0.1)] salesReport">
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-[20px] font-bold">Sales Report</h2>
          <div className="ml-auto">
            <YearSelect onChange={changeYear} />
          </div>
        </div>

        <div className="w-full h-[400px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={salesData}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="name" scale="band" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip content={<CustomTooltipSalesReport />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
                fill="url(#colorValue)"
                stroke="#8884d8"
              />
              <Bar
                dataKey="expense"
                barSize={20}
                fill="#1a9ced"
                radius={[10, 10, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Orders />

      <div className="card dark:bg-themeDark w-full p-0 pr-1 pb-5 mt-4 dark:border-[rgba(255,255,255,0.1)] salesReport">
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-[20px] font-bold">Repeat Customer Rate</h2>
          <div className="ml-auto">
            <YearSelect onChange={changeYear} />
          </div>
        </div>

        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={customerRateData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="none" />

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomerRateTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="newCustomer"
                activeDot={false}
                strokeWidth={5}
                stroke="#10b780"
              />
              <Line
                type="monotone"
                dataKey="oldCustomer"
                activeDot={false}
                strokeWidth={5}
                stroke="#3872fa"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
