import '@/app/globals.css';
import React, { useEffect } from 'react';
import signIn from "@/firebase/auth/signin";
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext';
import addData from '@/firebase/firestore/addData';

const GetPersonalizedPage = () => {

  const authContext = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  useEffect(() => {
    console.log(user)
    
  })

  const [name, setName] = useState<String>();
  const [age, setAge] = useState<Number>();
  const [skintype, setSkintype] = useState<String>("unknown");
  const [skincolor, setSkincolor] = useState<String>("unknown");
  const [skintone, setSkintone] = useState<String>("unknown");
  const [undertone, setUndertone] = useState<String>("unknown");
  const [allergy, setAllergy] = useState<String>("unknown");
  const [price, setPrice] = useState<String>("unknown");

  const handleForm = async (event: any) => {
    event.preventDefault()
    if(user == undefined){
      alert("Oh no! There is no user detected! 😲")
      return;
    }
    
    let updatedUserData = {
      name: name,
      age: age, 
      preferences: {
        skintype: skintype,
        skintone: skintone,
        skincolor: skincolor,
        undertone: undertone,
        allergy: allergy,
        price: price
      }
    }

    const {result, error} = await addData("users", user, updatedUserData);
    console.log(result);
    
    return router.push("/Recommended")
  }

  return (
    <div className="flex justify-center items-center h-full w-screen bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8]">
      <div className="font-poppins bg-white shadow-xl rounded-lg p-8 mb-4">
        <form onSubmit={handleForm} className="w-full"> 
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Let's Get Personalized</h1>
          <h2 className="text-xl font-semibold text-gray-700">Update your make up preference</h2>
          <h2 className="text-xl mb-8 text-gray-700">It will help the website to recommend the most suitable make up for you</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Name">
              Name Anda
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Name"
              type="text"
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Age">
              Age
            </label>
            <input
              onChange={(e) => setAge(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Age"
              type="number"
              placeholder="Age"
              required
            />
          </div>

          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Age">
              Skintype
            </label>
            <div className='flex'>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintype('Normal')}
                  checked={skintype === 'Normal'}
                  type="radio"
                  name="skintype"
                />
                Normal
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintype('Oily')}
                  checked={skintype === 'Oily'}
                  type="radio"
                  name="skintype"
                />
                Oily
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintype('Dry')}
                  checked={skintype === 'Dry'}
                  type="radio"
                  name="skintype"
                />
                Dry
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintype('Combination')}
                  checked={skintype === 'Combination'}
                  type="radio"
                  name="skintype"
                />
                Combination
              </label>
              
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Skincolor
            </label>
            <div className="flex">
              <label className="mr-2">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Fair')}
                  checked={skincolor === 'Fair'}
                  type="radio"
                  name="skincolor"
                />
                Fair
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Tan')}
                  checked={skincolor === 'Tan'}
                  type="radio"
                  name="skincolor"
                />
                Tan
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Medium')}
                  checked={skincolor === 'Medium'}
                  type="radio"
                  name="skincolor"
                />
                Medium
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Deep')}
                  checked={skincolor === 'Deep'}
                  type="radio"
                  name="skincolor"
                />
                Deep
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Light')}
                  checked={skincolor === 'Light'}
                  type="radio"
                  name="skincolor"
                />
                Light
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkincolor('Unknown')}
                  checked={skincolor === 'Unknown'}
                  type="radio"
                  name="skincolor"
                />
                I don't know
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Skintone
            </label>
            <div className="flex">
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintone('Cool')}
                  checked={skintone === 'Cool'}
                  type="radio"
                  name="skintone"
                />
                Cool
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintone('Neutral')}
                  checked={skintone === 'Neutral'}
                  type="radio"
                  name="skintone"
                />
                Neutral
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintone('Warm')}
                  checked={skintone === 'Warm'}
                  type="radio"
                  name="skintone"
                />
                Warm
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setSkintone('Unknown')}
                  checked={skintone === 'Unknown'}
                  type="radio"
                  name="skintone"
                />
                I don't know
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Undertone
            </label>
            <div className="flex">
              <label className="mr-2">
                <input
                  className='mr-2'
                  onChange={() => setUndertone('Yellow')}
                  checked={undertone === 'Yellow'}
                  type="radio"
                  name="undertone"
                />
                Yellow
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setUndertone('Pink')}
                  checked={undertone === 'Pink'}
                  type="radio"
                  name="undertone"
                />
                Pink
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setUndertone('Neutral')}
                  checked={undertone === 'Neutral'}
                  type="radio"
                  name="undertone"
                />
                Neutral
              </label>
              <label className="mr-5">
                <input
                  className='mr-2'
                  onChange={() => setUndertone('Unknown')}
                  checked={undertone === 'Unknown'}
                  type="radio"
                  name="undertone"
                />
                I don't know
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Allergy">
              Allergy
            </label>
            <input
              onChange={(e) => setAllergy(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Allergy"
              type="text"
              placeholder="Allergy"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Price">
              Price
            </label>
            <label className="mr-5">
              <input
                className='mr-2'
                onChange={() => setPrice('cheap')}
                checked={price === 'cheap'}
                type="radio"
                name="price"
              />
              Less than 20MYR
            </label>
            <label className="mr-5">
              <input
                className='mr-2'
                onChange={() => setPrice('any')}
                checked={price === 'any'}
                type="radio"
                name="price"
              />
              I don't mind
            </label>
          </div>
          <button
              className="mr-5 font-poppins bg-pink-100 hover:bg-pink-300 text-pink-400 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              type="button" onClick={() => {router.push("/")}}
            >
              Back
          </button>
          <button
              className="font-poppins bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Get me personalized now!
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetPersonalizedPage;
