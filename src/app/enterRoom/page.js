"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnterRoom() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    
    const getInitials = (userName) => {
        const words = userName.split(' ');
        console.log(words);
        console.log(words[0]);
        console.log(words[1]);
        const initial = words[0][0].toUpperCase() + (Array.isArray(words[1]) ? words[1][0].toUpperCase() : '');

        return initial;
    }

    const enterRoom = () => {
        window.localStorage.setItem("userName", userName);
        window.localStorage.setItem("initial", getInitials(userName));
        router.push("/");
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    return (
        <div className="flex items-center h-screen">
            <div className="bg-gray-100 mx-auto max-w-screen-sm w-2/3 md:max-w-md md:w-1/2 xl:w-1/3 h-60 px-6 lg:px-16 xl:px-12
            flex items-center justify-center ">
                <div className="w-full h-100">
                    <div className=" align-bottom">
                        <input type="text" placeholder="Enter Your name" value={userName} onChange={handleUserName} 
                            className="w-full px-4 py-3 rounded-lg text-gray-600 bg-gray-200 mt-2 border  placeholder-gray-600 focus:placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                    </div>
                    <button onClick={enterRoom} className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6">Enter Room</button>
                </div>
            </div>
        </div>
    );
}