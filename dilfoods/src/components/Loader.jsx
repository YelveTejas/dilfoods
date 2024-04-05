import React from 'react'
import { Box, Flex, Skeleton } from '@chakra-ui/react'
const Loader = () => {
  return (
    <Box>
      <Skeleton h='100px' mt='50px'>

      </Skeleton>
        <Skeleton h='500px' w='full' mt='10px'>
            
        </Skeleton>
        <Flex   flexDir={{base:"column",lg:"row"}} mt='30px'>
            <Skeleton h='300px'></Skeleton>
            <Skeleton h='300px'></Skeleton>
        </Flex>
    </Box>
  )
}

export default Loader