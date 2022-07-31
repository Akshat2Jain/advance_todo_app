
import React from 'react'
import { IndividualTodo ,} from './Individualtodo'

export const Todos = ({todos,deleteTodo}) => {
    return todos.map((individualTodo)=>(
        <IndividualTodo individualTodo={individualTodo} 
        key={individualTodo.id} deleteTodo={deleteTodo}
        />
    ))
}

export default Todos