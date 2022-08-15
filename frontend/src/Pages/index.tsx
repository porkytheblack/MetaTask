import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FlexColCenterStart } from '../utils/FlexConfigs'
import Login from './login'
import Tasks from './Tasks'

function Router() {
  return (
    <Flex {
        ...FlexColCenterStart
    } w="100%" h="100%" >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/tasks" element={<Tasks/>} />
            </Routes>
        </BrowserRouter>
    </Flex>
    
  )
}

export default Router