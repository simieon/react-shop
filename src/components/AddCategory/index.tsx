import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import { type } from "os";
import { useState } from "react";
import express from 'express';
import axios from "axios";

const AddCategory = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [base64, setBase64] = useState('')

    const Send = async(e:any)=>{
        e.preventDefault();
        axios.post("http://localhost:8083/api/categories",{name:name, image:base64, description:description}).then(resp => {
            console.log("Server result", resp);})
        document.getElementsByTagName('form')[0].reset();
    }

    function FileToBase64(input:Blob | null){
        let reader = new FileReader();
        if(input!=null)
        {
            reader.readAsDataURL(input)
            reader.onload=function(){
                setBase64(reader.result?reader.result.toString():"undefined");
            }
        }
    }
    
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
            <div>
                <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Add New Category
                </h2>
            </div>
            <form className="mt-8 space-y-6 " onSubmit={Send} method="post" >
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="categoryName" onChange={e=>setName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Image</label>
                    <input type="file" id="categoryImage"  onChange={(e)=>FileToBase64(e.target.files?e.target.files[0]:e.target.files)}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" id="categoryDescription" onChange={e=>setDescription(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5"/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </form>
            </div>
            </div>
        </>
    )
}

export default AddCategory;
