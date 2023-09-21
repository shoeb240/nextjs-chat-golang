"use client"

import MessageInput from '@/components/MessageInput'
import ReceivedMessages from '@/components/ReceivedMessages'
import SenderCredential from '@/components/SenderCredential'
import SentMessages from '@/components/SentMessages'
import { useCallback, useEffect, useState, useMemo } from 'react'
import {v4 as uuidv4} from 'uuid';


export default function Home() {
   const [uid, setUid] = useState();
   const [newMessage, setMessage] = useState('');
   let [allMessages, setNewMessage] = useState([]);

   const websocket = useMemo(() => new WebSocket("ws://localhost:8080/room"), []);

   useEffect(() => {
      let uuid = window.localStorage.getItem('uuid');
      if (!uuid) {
         uuid = uuidv4();
         window.localStorage.setItem('uuid', uuid);
      }

      setUid(uuid);
   }, []);

   console.log('at Page.js');

   websocket.onmessage = (e) => {
      const newMsgObj = JSON.parse(e.data);
      const lastArrInd = allMessages.length - 1;
      const lastArr = allMessages[lastArrInd];

      if (lastArrInd >= 0 && lastArr[0].uid == newMsgObj.uid) {
         let allMsg = [...allMessages];
         allMsg[lastArrInd][lastArr.length] = newMsgObj;
         setNewMessage(allMsg);
      } else {
         setNewMessage([...allMessages, [newMsgObj]]);
      }
   };

   const inputMessage = useCallback((e) => {
      setMessage(e.target.value);
   }, []);

   const sendMessage = (newMessage) => {
      let newMsgObj = {
         msg: newMessage,
         initial: 'HS',
         uid: uid,
      };

      websocket.send(JSON.stringify(newMsgObj));

      setMessage('');
   };

  return (
    <>
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <SenderCredential uid={uid} />      
      <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue 
         scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
         {
            allMessages.map((eachArr, ind) => {
               let initial = '';

               return (
                  ((eachArr[0].uid !== uid) && <div key={ind} className="chat-message">
                     <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        {
                           eachArr.map((eachMessage, ind2) => {
                              initial = eachMessage.initial;
                              return (
                                 !eachMessage.initial && <div key={ind2}><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{eachMessage.msg}--</span></div>
                                 ||
                                 eachMessage.initial && <div key={ind2}><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{eachMessage.msg}++</span></div>
                              )
                           })
                        }
                        </div>
                        <div className="w-10 h-10 rounded-full order-1  bg-gray-700 p-2">{initial}</div>
                     </div>
                  </div>)
                  ||
                  ((eachArr[0].uid === uid) && <div key={ind}  className="chat-message">
                  <div className="flex items-end justify-end">
                     <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                     {
                        eachArr.map((eachMessage, ind3) => {
                           initial = eachMessage.initial;
                           return (
                              !eachMessage.initial && <div key={ind3}><span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">*{eachMessage.msg}</span></div>
                              ||
                              eachMessage.initial && <div key={ind3}><span className="px-4 py-2 rounded-lg inline-block rounded-br-none  bg-blue-600 text-white ">*{eachMessage.msg}</span></div>
                           )
                        })
                     }
                     </div>
                     <div className="w-10 h-10 rounded-full order-2 bg-blue-700 p-2" >{initial}</div>
                  </div>
               </div>)

               );
            })
         }
      </div>
      <MessageInput newMessage={newMessage} sendMessage={sendMessage} inputMessage={inputMessage}  />
   </div>
    </>
  )
}
