"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link'



export default function Tabledata() {
    const [userData, setUserData] = useState([]);
    useEffect(
        () => {
            fetchData();
        }, []
    )
    const fetchData = async () => { 
        try {
            const result = await axios("http://localhost:3000/");
            console.log(result.data);
setUserData(result.data)
        } catch (err) {
            console.log("something wrong");
        }
    }
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:3000/deleteuser/${id}`);
            const newUserData = userData.filter(item => item._id !== id);
            setUserData(newUserData);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
     
    return (
        <div>
            <table className="table table-zebra">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Age</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((rs, index ) =>(
                    <tr key={rs._id} className='bg-white border-b'>
                        <td className='py-3 px-6'>{index + 1}</td>
                        <td className='py-3 px-6'>{rs.name}</td>
                        <td className='py-3 px-6'>{rs.email}</td>
                        <td className='py-3 px-6'>{rs.age}</td>
                        <td className='flex justify-center gap-1 py-3'>
                                <Link href={`/user/view/${rs._id}`}
                                className='btn btn-info'>view</Link>
                            <Link href={`/user/edit/${rs._id}`}
                                className='btn btn-info'>Edit</Link>
                            <button onClick={()=> handleDelete(rs._id)} className='btn btn-secondary'>Delete</button>
                        </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
