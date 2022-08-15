import { Flex } from '@chakra-ui/react'
import React from 'react'
import { FlexColCenterStart } from '../../utils/FlexConfigs'
import TaskListItem from '../molecules/TaskListItem'

var tasks = [
    {
        title: "Task 1",	
        description: "Description 1",
        completed: false,	
        deleted: false,
        starred: true,
        important: false,
        created_at: "2020-01-01",
    },
    {
        title: "Task 2",
        description: "Description 2",
        completed: false,
        deleted: false,
        starred: false,
        important: true,
        created_at: "2020-01-01",
    },
    {
        title: "Task 3",
        description: "Description 3",
        completed: false,
        deleted: false,
        starred: false,
        important: false,
        created_at: "2020-01-01",

    },
    {
        title: "Task 4",
        description: "Description 4",
        completed: false,
        deleted: false,
        starred: false,
        important: false,
        created_at: "2020-01-01"
    }
]

function TaskList() {
  return (
    <Flex w="100%" h="100%" {
        ...FlexColCenterStart
    } >
        {
            tasks.map(({
                title,
                description,
                completed,
                deleted,
                starred,
                important,
                created_at
            })=>(
                <TaskListItem title={title} starred={starred} description={description} important={important} completed={completed} created_at={created_at} />
            ))
        }
    </Flex>
  )
}

export default TaskList