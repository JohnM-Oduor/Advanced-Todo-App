import React from 'react'

const Todo = ({ id, title, description, mongoId, complete, deleteTodo, completeTodo }) => {
  return (
    <tr className="bg-neutral-primary border-b border-gray-300 border-default ">
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {title}
      </td>

      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">
        {complete ? "Completed" : "pending"}
      </td>
      <td className="px-6 py-4 flex gap-1">
        <button onClick={() => deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white cursor-pointer'>Delete</button>
        {complete?"":<button onClick={() => completeTodo(mongoId)} className='py-2 px-4 bg-green-500 text-white cursor-pointer'>Done</button>}
      </td>
    </tr>
  )
}

export default Todo
