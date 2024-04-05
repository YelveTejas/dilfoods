import { Box, Center, Flex, Heading, Select,useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Bubble, Line} from 'react-chartjs-2';
import DoughnutChart from './DoughnutChart';
import PolarChart from './PolarChart';
import { BsPerson } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";

import Stats from './Stats';



const formatData = (data)=>{
  const revenue = data.map((item)=>item.revenue)
  const sales = data.map((item)=>item.sales)
  const activity = data.map((item)=>item.userActivity)
  
  return {
    labels:[
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets:[
      {
        label:"sales",
       
        data:sales
      },
      {
        label:"revenue",
    
        data:revenue
      },
      {
        label:"Activuty",
        data:activity,
       
      }

    ]
  }
}
const Dashboard = ({data,isdark}) => {
  const [year,setYear] = useState('All')
  //console.log(data)
  
  const filteredData =  year == "All" ? data : data.filter((item) => item.year === +year);
  
const chartdata =  formatData(filteredData,isdark)
const options = {
  animations: {
    tension: {
      duration: 1000,
      easing: 'easeInCubic',
      from: 1,
      to: 0,
      loop:false,
      color:'red',
    }
  },
  scales: {
    x: {
      type: 'category',
      labels: chartdata.labels,
      ticks: {
        color:useColorModeValue("black", "#fff")
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color:useColorModeValue("black", "#fff"), // Change the color of the x axis ticks
      },// AAdjust based on your data
    },
  }, 
};
  
  return (
    <>

    <Box py='10px' px={{base:"0px",lg:"20px"}}>
      <Center>
      <Heading as='h3' size='lg' mx='auto' textTransform={'uppercase'} fontFamily={'monospace'}>Revenue Chart</Heading>
      </Center>
      <Flex flexWrap={'wrap'} gap='10px' mt='10px'>
      <Stats value={`₹${filteredData.reduce((acc,curr)=>acc+curr.revenue,0)}`} title={'Total Revenue'}  isdark={isdark}  icon={<GiMoneyStack size={"2em"} color="blue" />}/>
      <Stats value={`${filteredData.reduce((acc,curr)=>acc+curr.sales,0)} units`} title={'Total Sales'} isdark={isdark} icon={<FcSalesPerformance size={"2em"} color="blue" />}/>
      <Stats value={filteredData.reduce((acc,curr)=>acc+curr.userActivity,0)} title={'user activity'} isdark={isdark} icon={<BsPerson size={"2em"} color="blue" />}/>
      </Flex>
    
       <Flex gap={'5px'} mt='10px'flexDir={{base:"column",md:"row"}} >
        <Select value={year} onChange={(e)=>setYear(e.target.value)} w='20%' mb='10px'>
          <option value="All">Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </Select>
      </Flex>
      <Flex w={{base:"100%",lg:"90%"}} mx='auto' p='10px' borderRadius={'10px'}  justifyContent={'center'} mt='20px' boxShadow={'lg'}> 
      <Bar
        data={chartdata}
       options={options}
    />
      </Flex>
      <Flex mt={{base:"50px",lg:"60px"}} px={{base:"10px",md:"20px",lg:"50px"}}  flexDir={{base:"column",lg:"row"}} justifyContent={'space-between'} h='auto' >
      <DoughnutChart/>
      <PolarChart data={data}/>
      </Flex>
     
  </Box>
  </>
  )
}

export default Dashboard