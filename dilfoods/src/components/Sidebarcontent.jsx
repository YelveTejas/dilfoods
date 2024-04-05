import { Box } from "@chakra-ui/react"
import {

    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Text,


  } from '@chakra-ui/react'

import { CgProfile } from "react-icons/cg";

import { Link} from "react-router-dom"
import { FaChartBar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineRadarChart } from "react-icons/ai";


  const LinkItems = [
    { name: 'Dashboard', icon:MdDashboard },
    { name: 'line', icon: FaChartBar },
    { name: 'Radar', icon: AiOutlineRadarChart }
  ]
 export const SidebarContent = ({ onClose, ...rest }) => {
   
    
    return (
      <Box
        
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" gap={'5px'} >
          <CgProfile size={'18px'}/>
          <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
            Admin
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
            <Link to={`/${link.name.toLowerCase()}`} onClick={() => onClose()}>
           <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
          </Link>
        ))}
      </Box>
    )
  }


  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box
        as="a"
        href="#"
       
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
        
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
              color={'blue'}
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          <Text fontSize={'18px'} fontWeight={'md'}>{children}</Text>
        </Flex>
      </Box>
    )
  }