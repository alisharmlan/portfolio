"use client";
import Link from 'next/link'; // Import Link
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Card from './components/Card'
import React, { useEffect, useState } from "react";
import SignOutButton from '@/firebase/auth/signout';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import getDocuments from "@/firebase/firestore/getData"
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export default function Home() {

  interface UserData {
    uid: string
  }

  interface AuthContext {
    user?: UserData | {} |null,
    uid?: string
  }

  const authContext: AuthContext = useAuthContext();
  const user = authContext.user || null;
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState<QueryDocumentSnapshot[]>();
  const router = useRouter()

  React.useEffect(() => {
    if (user == null) {
      alert("Oh no! It looks you've signed out!")
      return router.push("/LoginPage")
    }
    setUserData(user)
  }, [user])

  const fetchAllProducts = async () => {
    const { result, error } = await getDocuments("products")
    if (result == null || error) return;
    setProductData(result.docs)
    console.log(productData);
  }

  useEffect(() => {
    fetchAllProducts();
  }, [])

  return (
    <div className="bg-[#FCB9B2] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <div className='text-center'>
          <h2 className="text-2xl font-semibold mt-10">Welcome to Makeup Recommender</h2>
          <p className="text-lg">Try our latest makeup products and see how they look on you!</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-[#fc8f83] font-semibold shadow-md rounded-lg w-64 p-4 mt-4 text-center transition duration-200 ease-in-out transform hover:scale-105">
            <Link href={`/GetPersonalized?user=${userData ? encodeURIComponent(userData.uid) : encodeURIComponent("default")}`}>
              ✨  Get personalized Now ✨
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-[#fc8f83] font-semibold shadow-md rounded-lg w-64 p-4 mt-4 text-center transition duration-200 ease-in-out transform hover:scale-105">
            <Link href={`/ProfilePage?user=${userData ? encodeURIComponent(userData.uid) : encodeURIComponent("default")}`}>
              Profile
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center mt-14">
          <h2 className='font-semibold text-2xl'>All the products</h2>
        </div>

        <div className='p-5 grid grid-cols-3 gap-4'>
          {
            userData ? (
              productData?.map((value: QueryDocumentSnapshot<DocumentData, DocumentData>, index) => {
                return <Card key={index} user={user} product={value} />
              })
            ) : <h1> Loading .. </h1>
          }
        </div>

        <div className="rounded-lg bg-gray-100 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Makeup Tutorials For Beginner</h2>
          {/* Placeholder for makeup tutorials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="https://www.youtube.com/watch?v=GoBkIqzXq1w" passHref={true}>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Tutorial 1</h3>
                <p className="text-gray-600">Learn how to apply foundation flawlessly.</p>
              </div>
            </Link>

            <Link href="https://www.youtube.com/watch?v=ljItjePnX6Y" passHref={true}>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Tutorial 2</h3>
                <p className="text-gray-600">Discover tips for achieving a natural makeup look.</p>
              </div>
            </Link>

            <Link href="https://www.youtube.com/watch?v=XMkowr-yIUU" passHref={true}>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Tutorial 3</h3>
                <p className="text-gray-600">Beginners Guide to Contour Makeup for Every Face Shape.</p>
              </div>
            </Link>
            {/* Add more tutorials as needed */}
          </div>
        </div>
      </main>
      <SignOutButton />
      <Footer />
    </div>
  )
}
