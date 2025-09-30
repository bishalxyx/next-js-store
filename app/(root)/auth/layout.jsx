// import { Header } from '@/components/Application/Header'
import React from 'react'

const layout = ({children}) => {
  return (
    <>
    {/* <Header/> */}
    <div className='h-screen w-screen flex justify-center items-center'>{children}</div>
    </>
  )
}

export default layout