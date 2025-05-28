"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import Box from './box';
import { GoGift } from "react-icons/go";
import { FiPieChart } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";


const DashboardBoxes = () => {
    return (
        <div className='dashboardBoxes'>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Box title="New Orders" icon={<GoGift size={40} className='text-[#3b82f6]' color="#3b82f6" />} count={"1,390"} progress={true} color="#3b82f6" />
                </SwiperSlide>
                <SwiperSlide>
                    <Box title="Sales" icon={<FiPieChart size={40} className='text-[#10b981]' />} count={"$57,890"} progress={false} color="#10b981" />
                </SwiperSlide>

                <SwiperSlide>
                    <Box title="Revenue" icon={<BsBank size={35} className='text-[#7928ca]' />} count={"$12,390"} progress={true} color="#7928ca" />
                </SwiperSlide>

                <SwiperSlide>
                    <Box title="Total Users" icon={<LuUsers size={35} className='text-[#ff2aca]' />} count={"538"} progress={true} color="#ff2aca" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default DashboardBoxes