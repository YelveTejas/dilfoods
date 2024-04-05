import { Box, Center, Heading, Select, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios';
const formatData = (data)=>{
  const salescount = data.map((item)=>item.salesCount)
  const sales = data.map((item)=>item.sales)
  const backgroundColors = [
    'rgba(255, 99, 132, 0.8)',    // Red
    'rgba(54, 162, 235, 0.8)',   // Blue
    'rgba(255, 206, 86, 0.8)',   // Yellow
    'rgba(75, 192, 192, 0.8)',   // Green
    'rgba(153, 102, 255, 0.8)',  // Purple
    'rgba(255, 159, 64, 0.8)',   // Orange
    'rgba(255, 99, 132, 0.9)',   // Red (repeated for variation)
    'rgba(54, 162, 235, 0.9)',   // Blue (repeated for variation)
    'rgba(255, 206, 86, 0.9)',   // Yellow (repeated for variation)
    'rgba(75, 192, 192, 0.9)',   // Green (repeated for variation)
   
  ];
  return {
    labels:[
      "Bhole ke Chole",
      "Dil Punjabi",
      "The Chaat Cult",
      "Kichdi Bar",
      "Bihari Bowl",
],
    datasets:[
      {
        label:"User  Activity",
        borderWidth:0,
        backgroundColor: backgroundColors.slice(0, salescount.length),
        data:salescount
      },

    ]
  }
}
const DoughnutChart = () => {
  const [data,setData] = useState([])
  const [year,setYear] = useState('All')
  const [loading,setLoading] = useState(false)
  const fetchdata = async()=>{
    setLoading(true)
    try{
     const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/topSellingProducts`)
     setLoading(false)
      setData(data.data)
    }catch(error){
      setLoading(false)
        console.log(error)
    }
  }
 
  useEffect(()=>{
    fetchdata()
  },[])
  const options = {
    animation: {
      animateRotate: true, // Animate rotation of the chart
      animateScale: true, // Animate scaling of the chart elements
    },
    
  };
  const filteredData =  year == "All" ? data : data.filter((item) => item.year === +year);
  const chartdata = formatData(filteredData)
  return (
    <Box  w={{base:"full",lg:"40%"}} >
      <Center>
        <Heading as='h3' size={'lg'} fontFamily={'monospace'} textTransform={'uppercase'}>Popular Dishes</Heading>
      </Center>
      <Select onChange={(e)=>setYear(e.target.value)} my='10px'>
      <option value="All">Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
      </Select>
      <Box >
        {
          loading ? (
            <Skeleton h='300px' >

            </Skeleton>
          ):(
            <Doughnut data={chartdata} options={options}/>
          )
        }
    
      </Box>
      
    </Box>
  )
}

export default DoughnutChart