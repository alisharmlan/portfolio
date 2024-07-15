import { QueryDocumentSnapshot, collection, addDoc, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import addData from '@/firebase/firestore/addData';

interface propData {
  product: QueryDocumentSnapshot<DocumentData, DocumentData>,
  user: Object
}

function Card(props: propData) {
  // console.log(product.data);
  // console.log(user.uuid);

  const {product, user} = props;

  const productInfo = product._document.data.value.mapValue.fields;
  const [name, setName] = useState<String>("test");
  const [brand, setBrand] = useState<String>(productInfo.brand.stringValue);
  const [price, setPrice] = useState<String>(productInfo.price.stringValue);
  const [code, setCode] = useState<String>(productInfo.code.stringValue);
  const [color, setColor] = useState<String>(productInfo.color.stringValue);
  const [type, setType] = useState<String>(productInfo.type.stringValue);

  const [isSaved, setIsSaved] = useState<Boolean>(false);

  
  useEffect(() => {
    console.log(productInfo.name);
  })

  const saveToProfile = async () => {
    try {
      let savedProducts = {
        [`${brand}-${type}-${color}`]: productInfo 
      }
      const {result, error} = await addData("users", user.uid, {savedProducts});
      console.log(result);
      setIsSaved(true);
    } 
    catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // console.log(productInfo);
  


  return (
    <div className="grid grid-rows-1 w-full bg-red-100 shadow-lg rounded-lg p-6">
      <div className="w-full rounded-lg p-4 mb-6">
        <div className="mb-4">
          <p className="text-2xl font-semibold">{color}</p>
          <p className="text-gray-600 text-lg">{type}</p>
          <p className="text-gray-600 mt-5">Brand: {brand}</p>
          <p className="text-gray-600">Price: {price}</p>
          {/* <p className="text-gray-600">Suitablity: {price}%</p> */}
        </div>
      </div>
      {
        !isSaved ? 
          <button className="bg-[#fc8f83] hover:bg-[#fa7061] text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={saveToProfile}
          >
            Save to profile
          </button>
          : 
          <button className="bg-[#fa7061] text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out">
            Saved
          </button>
      }
      {/* <button className="bg-[#fc8f83] hover:bg-[#fa7061] text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={saveToProfile}
      >
        Save to profile
      </button> */}
    </div>

    
  );
}

export default Card;
