import { AddIcon, CloseIcon, RepeatIcon, SearchIcon } from '@chakra-ui/icons'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import useTaskContract from '../../hooks/useTaskContract'
import { FlexColCenterStart, FlexRowCenterBetween } from '../../utils/FlexConfigs'

function TopBar() {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")     
    const [isError, setIsError] = useState<boolean>(false)
    const {
        onClose,
        onOpen,
        isOpen
    } = useDisclosure()

    const {
        addTask,
        fetchTasks
    } = useTaskContract()

    const submitTask = ()=>{
        addTask(title, description).then((d)=>{
            console.log(d)
            onClose()
        }).catch((e)=>{
            console.log(e)
            setIsError(true)
        })
    }

    const fetchTasksData= ( ) => {
        fetchTasks().then((data: any)=>{
            console.log(data)
        }).catch((e: any)=>{
            console.log(e)
        })
    }
  return (
    <Flex 
        w="100%"
        {
            ...FlexRowCenterBetween
        }
        p="20px"
    >
        
        <Menu>
            <MenuButton display={"flex"} alignItems="center" justifyContent={"space-between"}  as={Button}>
                <Text fontSize="lg" fontWeight="semibold" >
                    Filter
                </Text>
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Text fontSize="lg" fontWeight="semibold" >
                        All
                    </Text>
                </MenuItem>
                <MenuItem>
                    <Text fontSize="lg" fontWeight="semibold" >
                        Important
                    </Text>
                </MenuItem>
                <MenuItem>
                    <Text fontSize="lg" fontWeight="semibold" >
                        Unimportant
                    </Text>
                </MenuItem>
                <MenuItem >
                    <Text fontSize="lg" fontWeight="semibold" >
                        Starred
                    </Text>
                </MenuItem>
                <MenuItem>
                    <Text fontSize="lg" fontWeight="semibold" >
                        UnStarred
                    </Text>
                </MenuItem>
            </MenuList>
        </Menu>
        <InputGroup w="50%" >
            <InputLeftElement children={
                <SearchIcon/>
            } />
            <Input type="text" placeholder="Search" />
        </InputGroup>
        <IconButton onClick={()=>{
            onOpen()
        }} aria-label="add-task" >
            <AddIcon/>
        </IconButton>

        <IconButton onClick={fetchTasksData} aria-label="refetch" > 
            <RepeatIcon/>            
        </IconButton>
        <Drawer size="md" isOpen={isOpen} onClose={onClose}  placement="right"  >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth="1px" >
                    Create a new Task.
                </DrawerHeader>
                <DrawerBody>
                    {isError && <Text color="red.500" fontSize="md" fontWeight="semibold" >
                        <CloseIcon color="red" mr="10px" />    An Error occured
                    </Text>}
                    <Flex
                        {
                            ...FlexColCenterStart
                        }
                        w="100%"
                        p="20px"

                    >
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input value={title} onChange={(e)=>{
                                setTitle(e.target.value)
                            }} id="title" placeholder="Title" type="text"  />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Textarea value={description} onChange={(e)=>{
                                setDescription(e.target.value)
                            }} id="description" placeholder="Description" />
                        </FormControl>
                    </Flex>
                </DrawerBody>
                <DrawerFooter borderTopWidth={"1px"} >
                    <Button mr="20px" onClick={submitTask} background="blue.500" >
                        Save
                    </Button>
                    <Button onClick={onClose} >
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    </Flex>
  )
}

export default TopBar