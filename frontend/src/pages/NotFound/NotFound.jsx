import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className=''>
            <Navbar/>
            <div className=''>
                <div className='font-semibold text-ascent-2 text-3xl'>
                    Not Found Page
                </div>
                <button className='bg-blue rounded-lg px-2 py-2'>
                    <Link to='/'>Go to Home Page</Link>                
                </button>
            </div>           
        </div>
    )
}

export default NotFound
