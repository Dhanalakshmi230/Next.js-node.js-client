"use client";
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UserField {
    name: string;
    email: string;
    age: string;
}

const CreateUserPage = () => {
    const [userField, setUserField] = useState<UserField>({
        name: "",
        email: "",
        age: ""
    });

    const changeUserFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserField(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create', userField);
            console.log(response);
            window.location.href = "/";
        } catch (err) {
            console.error('Something went wrong', err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Add New User</h1>
            <form onSubmit={onSubmitChange}>
                <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="name"
                        placeholder="Full Name..."
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="email"
                        placeholder="Email..."
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-900">
                        Age
                    </label>
                    <input
                        type="text"
                        name="age"
                        className="input input-bordered input-primary w-full max-w-xs"
                        id="age"
                        placeholder="Age..."
                        onChange={changeUserFieldHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
};

export default CreateUserPage;
