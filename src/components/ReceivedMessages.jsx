const ReceivedMessages = ({eachArr, ind, initial}) => {
   const lastIndex = eachArr.length - 1;

   return (
      <>
      <div key={ind} className="chat-message">
         <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            {
               eachArr.map((eachMessage, ind2) => {
                  return (
                     (ind2 != lastIndex 
                        && <div key={ind2}>
                           <span className="px-4 py-2 rounded-lg inline-block bg-gray-500 text-white">{eachMessage.msg}</span>
                           </div>)
                     ||
                     (ind2 == lastIndex 
                        && <div key={ind2}>
                           <span className="px-4 py-2 rounded-lg inline-block bg-gray-500 text-white rounded-bl-none">{eachMessage.msg}</span>
                           </div>)
                  )
               })
            }
            </div>
            <div className="w-10 h-10 rounded-full order-1 p-2 bg-gray-600 text-white text-center">{initial}</div>
         </div>
      </div>
      </>
    );
}

export default ReceivedMessages;