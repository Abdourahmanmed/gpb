import React from 'react'

interface BoxInfoPropos {
    titre:string;
    Nombre:string;
    color:string;
}

const BoxInfo = ({titre,Nombre,color}:BoxInfoPropos) => {
  return (
    <div className='flex flex-col items-center justify-center  py-2 px-auto w-[400px] h-auto bg-white rounded-lg gap-4 shadow-blue'>
        <h1 className='font-semibold text-primary'>{titre}</h1>
        <p className={`text-4xl ${color}`}>{Nombre}</p>
    </div>
  )
}

export default BoxInfo