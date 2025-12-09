"use client";
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) => {

    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  const completeTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }))
    console.log(formData);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api code
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg)
      setFormData({
        title: "",
        description: "",
      })
      await fetchTodos();
    } catch (error) {
      toast.error('Error')
    }

  }

  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto" >
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white cursor-pointer">Add Todo</button>
      </form>



      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border-gray-300 border-default mt-12 mb-20 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-gray-100 border-gray-300 border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium ">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                TITLE
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                DESCRIPTION
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            })}
          </tbody>
        </table>



      </div>

    </>
  );
}
