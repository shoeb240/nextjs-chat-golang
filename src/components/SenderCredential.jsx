import { useRouter } from "next/navigation";
import React from "react";

const SenderCredential = ({userName, initial}) => {
   const router = useRouter();

   const exitRoom = () => {
      window.localStorage.removeItem('userName');
      window.localStorage.removeItem('initial');

      router.push('/enterRoom');
   }

   return (
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
         <div className="relative flex items-center space-x-4">
            <div className="relative">
               <span className="absolute text-green-500 right-0 bottom-0">
                  <svg width="20" height="20">
                     <circle cx="10" cy="15" r="5" fill="currentColor"></circle>
                  </svg>
               </span>
               <div className="w-10 h-10 rounded-full order-2 bg-blue-700 p-2 text-center text-white ml-2" >{initial}</div>
            </div>
            <div className="flex flex-col leading-tight">
               <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{userName}</span>
               </div>
            </div>
         </div>
         <div className="flex items-center space-x-2">
            <button type="button" onClick={exitRoom} className="inline-flex items-center justify-center rounded-lg 
            border h-10 w-10 transition duration-500 ease-in-out text-gray-500 font-semibold hover:bg-gray-300 focus:outline-none mr-2">
               Exit
            </button>
         </div>
      </div>
    );
}

export default SenderCredential;