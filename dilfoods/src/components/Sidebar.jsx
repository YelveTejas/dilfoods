
import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  Text,
  Drawer,
  useToast,
  DrawerContent,
  useDisclosure,
  useColorMode,
  HStack,
  Avatar,
  VStack,
  MenuButton,
  Button,
  Menu

} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import { SidebarContent } from './Sidebarcontent'
import axios from 'axios'
import Dashboard from './Dashboard'
import { useSearchParams } from 'react-router-dom'
import BarChart from './Barchart'
import Radarchart from './Radarchart'
import Loader from './Loader'

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();
 
  const [alldata,setAlldata] = useState([])
  const [searchParams] = useSearchParams();
  const [loading,setLoading] = useState(false)
  const isdark = colorMode === "dark";
  const toast = useToast()
      console.log(process.env.REACT_APP_BASE_URL,'url')
const fetchdata = async()=>{
  setLoading(true)
  try{
   const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/data`)
    setLoading(false)
    setAlldata(data.data)
    console.log(data)
    
  }catch(error){
    setLoading(false)
      console.log(error)
  }
}
 

useEffect(()=>{
  fetchdata()
},[])
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" >
      <Box position={'absolute'} right={'3'} display={{base:"none",lg:"block"}}>
        <IconButton
          icon={isdark ? <SunIcon /> : <MoonIcon />}
          isRound={true}
          onClick={toggleColorMode}
        ></IconButton>
      </Box>
        {
          loading ? (
            <Loader/>
          ):(
            window.location.pathname.includes('line') ? (
              <BarChart data={alldata} />
        ):
        window.location.pathname.includes('radar')?(
             <Radarchart/>
        ):(
            <Dashboard data={alldata}/>
        )
          )
        }
         
      </Box>
    </Box>
  )
}





const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isdark = colorMode === "dark";
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
      <HStack spacing={{ base: "2", md: "6" }}>
      <IconButton
          icon={isdark ? <SunIcon /> : <MoonIcon />}
          isRound={true}
          onClick={toggleColorMode}
        ></IconButton>
        
      </HStack>
    </Flex>
  )
}