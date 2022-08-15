import { CheckCircleIcon, DeleteIcon, StarIcon, WarningIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd, FlexRowCenterStart } from '../../utils/FlexConfigs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

function TaskListItem({
    title,
    completed,
    important,
    created_at,
    starred,
    description,
}: {
    title?: string,
    created_at?: string | Date,
    completed?: boolean,
    starred?: boolean,
    important?: boolean,
    description?: string
}) {

    const {isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
        {
            ...FlexRowCenterBetween
        }
        bg="gray.200"
        p="10px"	
        rounded="md"
        shadow="md"
        w="100%"	
        mb="10px"
        as={"button"}
        _hover={{
            backgroundColor: "gray.300"
        }}
        onClick={()=>{
            onOpen()
        }}
    
    >
        <Modal
            isOpen={isOpen}
            onClose={onClose}

        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Flex {
                        ...FlexRowCenterBetween
                    } w="100%" >
                        <Flex {
                            ...FlexRowCenterStart
                        }    >
                            <IconButton aria-label='delete' >
                                <DeleteIcon color="red.300" /> 
                            </IconButton>
                            <IconButton ml="20px" aria-label='star-icon' p="10px" >
                                <StarIcon color={starred ? "yellow.500": "gray.300"} />
                            </IconButton>
                            <IconButton ml="20px" aria-label="important-icon" p="10px" >
                                <WarningIcon color={important ? "red.500" : "gray.300"} />
                            </IconButton>
                            <IconButton ml="20px" aria-label="important-icon" p="10px" >
                                <CheckCircleIcon color={completed ? "green.500" : "gray.300"} />
                            </IconButton>


                        </Flex>
                        <Flex {
                            ...FlexRowCenterEnd
                        } >
                            <Text fontSize="lg" fontWeight="semibold" >
                                {
                                    dayjs(created_at).format(" DD MMM YYYY")
                                }
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex
                        {
                            ...FlexRowCenterCenter
                        }
                        p="20px"
                        w="100%"

                    >
                        <Text fontSize="md" fontWeight={"medium"} >
                            {
                                description
                            }
                        </Text>
                    </Flex>
                    

                </ModalBody>
            </ModalContent>
        </Modal>
        <Flex>
            <IconButton aria-label='star-icon' p="10px" >
                <StarIcon color={starred ? "yellow.500": "gray.300"} />
            </IconButton>
            <IconButton ml="20px" aria-label="important-icon" p="10px" >
                <WarningIcon color={important ? "red.500" : "gray.300"} />
            </IconButton>
            
        </Flex>
        <Text fontSize="md" textAlign={"left"} w="70%" fontWeight={"semibold"} >
            {
                title
            }
        </Text>
        <Text fontSize="sm" fontStyle={"italic"} fontWeight="semi-bold" >
            {
                dayjs(created_at).fromNow()
            }
        </Text>
        <IconButton ml="20px" aria-label="important-icon" p="10px" >
                <CheckCircleIcon color={completed ? "green.500" : "gray.300"} />
        </IconButton>
    </Flex>
  )
}

export default TaskListItem