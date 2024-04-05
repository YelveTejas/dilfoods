import { Box ,useColorModeValue,Heading,Center} from '@chakra-ui/react';
import React from 'react'
import { Bar, Bubble,Line } from 'react-chartjs-2';
const formatData = (data)=>{
  const revenue = data.map((item)=>item.revenue)
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

    ]
  }
}
const BarChart = ({data}) => {
  const chartdata = formatData(data)
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
          color:useColorModeValue("black", "#fff"),
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
    <Center>
    <Heading as='h3' size={{base:"md",lg:"lg"}} mx='auto' textTransform={'uppercase'} fontFamily={'monospace'}>Revenue and sales Chart</Heading>
    </Center>
     <Box w={{base:"100%",lg:"90%"}} mt='30px' mx='auto'>
    <Line data={chartdata} options={options}/>
    </Box>
    </>
   
  )
}

export default BarChart