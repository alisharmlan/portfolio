import '@/app/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import getDocuments from '@/firebase/firestore/getData';

const ProfilePage: React.FC = () => {
  const authContext = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const [savedProducts, setSavedProducts] = useState<string[]>([]);

  const [name, setName] = useState<String>();
  const [age, setAge] = useState<Number>();
  const [skintype, setSkintype] = useState<String>("unknown");
  const [skincolor, setSkincolor] = useState<String>("unknown");
  const [skintone, setSkintone] = useState<String>("unknown");
  const [undertone, setUndertone] = useState<String>("unknown");
  const [allergy, setAllergy] = useState<String>("unknown");
  const [price, setPrice] = useState<String>("unknown");

  const fetchUser = async () => {
    const {result, error} = await getDocuments("users");
    if(result == null) return;
    const users = result.docs;
    users.map((value, index) => {
      const currentUser: Object = value._document.data.value.mapValue.fields;
      console.log(currentUser);
      
      if(currentUser && "uuid" in currentUser && currentUser.uuid.stringValue == user){
        // console.log(`${currentUser.uuid.stringValue} == ${user}: ${currentUser.uuid.stringValue == user}`);
        console.log("User exists!");
        setData(currentUser);
      }
        
      
    })
  }

  const setData = (currentUser: Object) => {
    setName(currentUser.name.stringValue);
    setAge(currentUser.age.integerValue);
    let currentUserPreferences = currentUser.preferences.mapValue.fields;
    setSkintone(currentUserPreferences.skintone.stringValue);
    setSkincolor(currentUserPreferences.skincolor.stringValue);
    setSkintype(currentUserPreferences.skintype.stringValue);
    setUndertone(currentUserPreferences.undertone.stringValue);
    // setSavedProducts({
    //   currentUser.savedProducts.
    // })
    fetchSavedProducts(currentUser.savedProducts)
  }

  const fetchSavedProducts = (userProducts: Object) => {
    console.log(userProducts.mapValue.fields);

    let products = Object.keys(userProducts.mapValue.fields).map((value, index) => {
      return value
    })

    console.log(products);
    
    setSavedProducts(products);
  }

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div className="bg-pink-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center pt-4">
          <h1 className="text-4xl font-bold text-pink-700">My Beauty Profile</h1>
          <h1 className="text-pink-700 font-semibold text-xl mt-5">{name}</h1>
          <h1 className="text-gray-500 text-sm">nuralisa123@gmail.com</h1>
          <p className="text-gray-500 text-center mt-4">
            Welcome to your profile! Here you can find your personalized makeup recommendations and explore new beauty products tailored just for you.
          </p>
        </div>
        <div className="mt-6">
          
          <h2 className="text-2xl font-semibold text-pink-700">Profile Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Skin Tone:</h3>
              <p className="text-pink-800">{skintone}</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Skin Color:</h3>
              <p className="text-pink-800">{skintone}</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Skin Type:</h3>
              <p className="text-pink-800">{skintype}</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Skincare Concerns:</h3>
              <p className="text-pink-800">{allergy}</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Undertone:</h3>
              <p className="text-pink-800">{undertone}</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow">
              <h3 className="text-pink-600">Age:</h3>
              <p className="text-pink-800">{age}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button onClick={fetchUser}>
            Clear Products
          </button>
          <h2 className="text-2xl font-semibold text-pink-700">Saved Products</h2>
          <ul className="mt-2">
            {savedProducts.length > 0 ? (
              savedProducts.map((product, index) => (
                <li key={index} className="border-b border-pink-200 py-2 text-pink-800">
                  {product}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No saved products yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
