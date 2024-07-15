import '@/app/globals.css';
import React from 'react';
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

      if (error) {
          alert("Wrong Password..");
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
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome</h1>
        <h2 className="text-xl font-semibold mb-8 text-gray-700">Login to continue</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Email">
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
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
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
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between items-center">
          <button
            className="font-poppins bg-[#fc8f83] hover:bg-[#d67368] text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            Log In
          </button>
          <a className="text-sm font-semibold text-pink-600 hover:text-pink-800" href="/SignupPage">
            Register
          </a>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
