import '@/app/globals.css'; 
import { useRouter } from 'next/router'
import React from 'react'

function Test() {

    const router = useRouter();
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-200 to-purple-200">
            <div className="font-poppins text-center rounded-lg p-8 w-screen">
                <h2 className='text-2xl font-semibold text-pink-400'>Welcome to</h2>
                <h1 className='text-4xl font-bold text-pink-400'>The Make Up Recommender</h1>
            </div>
    
            <div className='font-poppins flex'>
            <button
                className=" bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                type="button"
                onClick={() => router.push(`/GetPersonalized`)}
                >
                Update My Perferences
                </button>
            </div>
        </div>
    )
}

export default Test