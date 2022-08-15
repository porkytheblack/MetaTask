import { Flex } from '@chakra-ui/react'
import React from 'react'
import DateBar from '../../components/molecules/DateBar'
import TopBar from '../../components/molecules/TopBar'
import TaskList from '../../components/organs/TaskList'
import { FlexColCenterCenter, FlexColCenterStart } from '../../utils/FlexConfigs'

function Tasks() {
  return (
    <Flex w="100%" h="100%" {
        ...FlexColCenterCenter
    } bg="blue.300"  >
        <Flex {
            ...FlexColCenterStart
        } w="80%" h="100%"  minH="100vh"  >
            <TopBar/>
            <DateBar/>
            <TaskList/>
        </Flex>
    </Flex>
  )
}

export default Tasks