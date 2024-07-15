import '@/app/globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import signUp from "@/firebase/auth/signup";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fc8f83] to-purple-200">
      <div className="font-poppins bg-white shadow-2xl rounded-lg p-8 mb-4 border border-gray-200 max-w-md w-full">
        <form onSubmit={handleForm} className="form"> 
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Let's Sign up</h1>
          <div className="mb-4"> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="font-poppins bg-[#fc8f83] hover:bg-[#d67368] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Sign Up
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-800" href="/LoginPage">
              Existing User
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
