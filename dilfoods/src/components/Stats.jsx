import { Stat, StatLabel, StatNumber,Flex,Box,useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Stats = ({value,title,icon}) => {
  return (
      <Stat  borderRadius={'10px'}  p='15px' boxShadow={'md'}  cursor={'pointer'} border={useColorModeValue('','2px solid blue')}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Box>
          <StatLabel fontSize={{base:"14px",md:"16px",lg:"18px"}} textTransform={'capitalize'}>{title}</StatLabel>
          <StatNumber>{value}</StatNumber>
          </Box>
           <Box   my={"auto"}
          color={useColorModeValue("gray.200", "gray.800")}
          alignContent={"center"}>
             {icon}
           </Box>
        </Flex>
      
      </Stat>
  )
}

export default Stats