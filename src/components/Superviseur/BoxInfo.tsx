import React from 'react'
import CountUp from 'react-countup';

interface BoxInfoPropos {
    titre:string;
    Nombre:number;
    color:string;
}

const BoxInfo = ({titre,Nombre,color}:BoxInfoPropos) => {
  return (
    <div className='flex flex-col items-center justify-center  py-2 px-auto w-[400px] h-auto bg-white rounded-lg gap-4 shadow-blue'>
        <h1 className='font-semibold text-primary'>{titre}</h1>
        <p className={`text-4xl ${color}`}> <CountUp end={Nombre} duration={3} /></p>
    </div>
  )
}

export default BoxInfo