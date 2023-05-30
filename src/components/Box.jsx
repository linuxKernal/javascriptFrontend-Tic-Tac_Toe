import {React ,useContext } from 'react'
import myContext from '../context/myContext'

export default function Box({index,action,value,theme}) {
  const {superColor}  = useContext(myContext)
  console.log(superColor)
  let classTheme = "flex justify-center items-center text-4xl"
  if(theme === "classic") classTheme+= " bg-blue-400 rounded-md text-white"
  else classTheme+= ` ${superColor} text-white` 
  return (
    <div onClick={()=>action(value)} className={classTheme}>
        {index}
    </div>
  )
}
