import React from "react";

const MessageInput =  ({newMessage, sendMessage, inputMessage}) => {

    return (
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
         <div className="relative flex">
            <input type="text" value={newMessage} onChange={inputMessage} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-lg py-3" />
            <div className="absolute right-0 items-center inset-y-0 sm:flex">
               <button type="button" onClick={() => sendMessage(newMessage)} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
               </button>
            </div>
         </div>
      </div>
    );
}

export default React.memo(MessageInput);