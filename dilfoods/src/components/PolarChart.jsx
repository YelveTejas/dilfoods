import { Box, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import { PolarArea } from 'react-chartjs-2';


const formatData = (data)=>{
  const activity = data.map((item)=>item.userActivity)
  const sales = data.map((item)=>item.sales)
  const backgroundColors = [
    'rgba(255, 99, 132, 0.8)',    // Red
    'rgba(54, 162, 235, 0.8)',    // Blue
    'rgba(255, 206, 86, 0.8)',    // Yellow
    'rgba(75, 192, 192, 0.8)',    // Cyan
    'rgba(153, 102, 255, 0.8)',   // Purple
    'rgba(255, 159, 64, 0.8)',    // Orange
    'rgba(102, 204, 255, 0.8)',   // Light Blue
    'rgba(255, 153, 204, 0.8)',   // Pink
    'rgba(102, 255, 102, 0.8)',   // Light Green
    'rgba(255, 102, 102, 0.8)',   // Light Red
    'rgba(204, 204, 102, 0.8)',   // Light Yellow
    'rgba(255, 204, 102, 0.8)' // Green (repeated for variation)
   
  ];
  return {
    labels:[
      'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
],
    datasets:[
      {
        label:"User  Activity",
        borderWidth:0,
        backgroundColor: backgroundColors.slice(0, activity.length),
        data:activity
      },

    ]
  }
}
const PolarChart = ({data}) => {


  const [year,setYear] = useState('All')

  const filteredData =  year == "All" ? data : data.filter((item) => item.year === +year);
  const chartdata =formatData(filteredData)
  return (
    <Box w={{base:"full",lg:"40%"}}  h='full'> 
    <Center>
     <Heading as='h3' size={'lg'} fontFamily={'monospace'} textTransform={'uppercase'}>User Activity</Heading>
     </Center>
    
    <Flex >
      <Select onChange={(e)=>setYear(e.target.value)} my='10px'>
          <option value="All">Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
      </Select>
    </Flex>
    <Box >
    <PolarArea data={chartdata}/>
    </Box>
   
    </Box>
  )
}

export default PolarChart