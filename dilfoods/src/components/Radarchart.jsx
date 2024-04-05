import React, { useEffect, useState } from "react";

import { Box,Skeleton,Heading,Center } from "@chakra-ui/react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
const formatData = (data) => {
  const freshness = data.map((item) => item.freshness);
  const nutrition = data.map((item) => item.nutrition);
  const sustain = data.map((item) => item.sustainability);

  return {
    labels: [
      "Seafood",
      "Poultry",
      "Legumes",
      "Nuts and Seeds",
      "Beverages",
      "Snacks",
      "Desserts",
      "Condiments",
      "Baked Goods",
      "Frozen Foods",
      "Canned Foods",
      "Sauces",
      "Spices",
      "Oils",
      "Herbs",
      "Dairy Alternatives",
      "Organic Foods",
      "Gluten-Free Foods",
      "Vegan Foods",
      "Vegetarian Foods",
    ],
    datasets: [
      {
        type: "radar",
        label: "Freshness",

        borderWidth: 0,
        data: freshness,
      },
      {
        type: "radar",
        label: "Nutrition",
        borderWidth: 0,
        data: nutrition,
      },
      {
        type: "radar",
        label: "Sunstainibility",
        borderWidth: 0,
        data: sustain,
      }
    ],
  };
};
const Radarchart = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const chartdata = formatData(data);

  const fetchdata=async()=>{
    try{ 
     setLoading(true)
      const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/foodData`)
      setData(data.data)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchdata()
  },[])

  return (
   <>
    <Center>
    <Heading as='h3' size={{base:"md",lg:"lg"}} mx='auto' textTransform={'uppercase'} fontFamily={'monospace'}>Revenue and sales Chart</Heading>
    </Center>
     <Box w={{base:"100%",lg:"50%"}} mt='30px' mx='auto'>
    <Radar data={chartdata} />
    </Box>
   </>
  );
};

export default Radarchart;
