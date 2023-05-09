import React from 'react'
import Navbar from '../NavItems/Navbar'
import Sidebar from '../NavItems/Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-full dark:bg-[#1e293b]'>
                <Sidebar />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout
