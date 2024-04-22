
"use client";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState,ChangeEvent } from "react";

export default function VieUserPage() {
    const { id } = useParams();
    console.log(id);
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        age: ""
    })
    useEffect(() => {
        fetchUser();
    },[id]);
    const fetchUser = async () => {
        try {
            const result = await axios.get("http://localhost:3000/get/" + id);
            console.log(result.data);
            setUserField(result.data)
        } catch (err) {
            console.log("somthing wrong");
        }
    }
    const changeUserFieldHandler = (e) => {
        
        setUserField(prevState => ({
            ...userField,
            [e.target.name]: e.target.value
        }));
        console.log(userField);
    };
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
             await axios.put("http://localhost:3000/update/"+id, userField);
            
            window.location.href = "/";
        } catch (err) {
            console.error('Something went wrong', err);
        }
    };

return(
    <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Edit Form</h1>
            <form>
            <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                       ID:
                </label>
                <input
                        type="text"
                        name="id"
                      value={id}
                        id="id"
                       disabled 
                        // onChange={changeUserFieldHandler}
                    />
                 
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="name"
                        placeholder="Full Name..."
                    value={userField.name}
                    onChange={e =>changeUserFieldHandler(e)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="email"
                        placeholder="Email..."
                    onChange={e =>changeUserFieldHandler(e)}
                    value={userField.email}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-900">
                        Age:
                    </label>
                    <input
                        type="text"
                        name="age"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="age"
                    placeholder="Age..."
                    value={userField.age}
                    onChange={e =>changeUserFieldHandler(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={e=>onSubmitChange(e)}>Update</button>
            </form>
        </div>
)
}