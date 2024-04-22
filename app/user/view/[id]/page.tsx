"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewUserPage() {
    const { id } = useParams();
    console.log(id);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        fetchUser();
    }, [id]);
    const fetchUser = async () => {
        try {
            const result = await axios.get("http://localhost:3000/get/" + id);
            console.log(result.data);
            setUser(result.data)
        } catch (err) {
            console.log("somthing wrong");
        }
    }
    return (
        <div className="max-w-2xl mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">View User</h1>
            <table className="table table-zebra">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left">S No.</th>
                        <th className="py-3 px-6 text-left">Full Name</th>
                        <th className="py-3 px-6 text-left">Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
