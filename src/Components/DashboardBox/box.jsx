import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { FiChevronsUp } from "react-icons/fi";



const Box = (props) => {

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <div className='box w-full h-auto p-3 py-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] flex  flex-col gap-3 rounded-md bg-gray-100 dark:bg-themeDark'>
            <div className="w-full flex items-center justify-between">
                <div className='flex items-center justify-between gap-3'>
                    <div className='leftCol flex items-center gap-3'>
                        {props.icon}
                        <div className="info flex flex-col gap-0">
                            <h4>{props.title}</h4>
                            <h5 className='text-[22px] font-bold dark:text-gray-200'>{props.count}</h5>
                        </div>



                    </div>
                </div>

                <div className="chart w-[70px] h-[40px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={70} height={40} data={data} barGap={1} barCategoryGap="10%"   >
                            <Bar dataKey="uv" fill={props.color} barSize={6} radius={[10, 10, 10, 10]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <hr className='dark:!border-[rgba(255,255,255,0.1)]'/>

            <div className='flex items-center gap-3'>
                <span className={`${props.progress === true ? 'text-green-700' : 'text-red-700'} text-[14px] font-[500] flex items-center gap-0`}>
                    <FiChevronsUp className={`${props.progress === true ? 'text-green-700' : 'text-red-700 -rotate-180'}`} size={18} />
                    +32.40%</span>
                <span className='text-gray-700 dark:text-gray-400 text-[14px]'>
                    {
                        props.progress === true ? 'Increased ' : 'Decreased '
                    }
                    last month
                </span>
            </div>

        </div>
    )
}

export default Box