import * as React from "react"
import {
  ChakraProvider,
  theme,
  Flex,
} from "@chakra-ui/react"
import { FlexColCenterStart } from "./utils/FlexConfigs"
import Router from "./Pages"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex {
      ...FlexColCenterStart
    } w="100%" h="100%" minH="100vh" >
      <Router/>
    </Flex>
  </ChakraProvider>
)
