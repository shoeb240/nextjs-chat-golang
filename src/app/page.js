"use client"

import MessageInput from '@/components/MessageInput'
import ReceivedMessages from '@/components/ReceivedMessages'
import SenderCredential from '@/components/SenderCredential'
import SentMessages from '@/components/SentMessages'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useMemo, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';


export default function Home() {
   const router = useRouter();
   const [newMessage, setMessage] = useState('');
   const [allMessages, setNewMessage] = useState([]);
   const [userName, setUserName] = useState('');
   const [initial, setInitial] = useState('');
   const websocket = useMemo(() => new WebSocket("ws://localhost:8080/room"), []);

   const uid = useMemo(() => {
      let uuid = window.localStorage.getItem('uuid');

      if (!uuid) {
         uuid = uuidv4();
         window.localStorage.setItem('uuid', uuid);
      }

      return uuid;
   }, []);

   useEffect(() => {
      const userName = window.localStorage.getItem('userName');
      const initial = window.localStorage.getItem('initial');
      
      if (! userName || ! initial) {
         router.push("/enterRoom");
      }
      setUserName(userName);
      setInitial(initial);
   }, []);

   const inputMessage = useCallback((e) => {
      setMessage(e.target.value);
   }, []);

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

   const sendMessage = (newMessage) => {
      let newMsgObj = {
         msg: newMessage,
         initial: initial,
         uid: uid,
      };
      
      websocket.send(JSON.stringify(newMsgObj));
      setMessage('');
   };

  return (
    <>
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen max-w-2xl m-auto bg-gray-400 dark:bg-gray-900 ">
      <SenderCredential userName={userName} initial={initial} />      
      <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue 
         scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
         {
            allMessages.map((eachArr, ind) => {
               return (
                  ((eachArr[0].uid !== uid) && <ReceivedMessages key={ind} eachArr={eachArr} initial={eachArr[0].initial} />)
                  ||
                  ((eachArr[0].uid === uid) && <SentMessages key={ind} eachArr={eachArr} initial={initial} />)
               );
            })
         }
      </div>
      <MessageInput newMessage={newMessage} sendMessage={sendMessage} inputMessage={inputMessage}  />
   </div>
    </>
  )
}
