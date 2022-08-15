import { Divider, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import { FlexRowCenterBetween } from '../../utils/FlexConfigs'

function DateBar({
    tasks
}:{
    tasks?: number
}) {
  return (
    <Flex 
        {
            ...FlexRowCenterBetween
        }
        w="100%"
        padding={"10px"}
    >
        <Text fontSize="md" fontWeight={"semibold"} >
            5 Tasks
        </Text>
        <Divider orientation='vertical' borderColor="black" />
        <Text w="90%" fontStyle={"italic"} fontSize="lg" fontWeight="semibold"   >
            {
                dayjs(Date.now()).format(" DD MMM YYYY")
            }
        </Text>
    </Flex>
  )
}

export default DateBar