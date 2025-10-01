
import React from 'react'

const layout = ({children}) => {
  return (
    <>
      <main className='h-screen w-screen flex justify-center items-center'>{children}</main>
    </>
  )
}

export default layout