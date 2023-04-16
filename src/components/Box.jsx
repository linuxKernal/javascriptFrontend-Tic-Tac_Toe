import React from 'react'

export default function Box({index,action,value}) {
  return (
    <div onClick={()=>action(value)} className="bg-blue-400 flex justify-center items-center text-4xl rounded-md text-white">
        {index}
    </div>
  )
}
