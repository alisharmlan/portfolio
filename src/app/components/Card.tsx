import { QueryDocumentSnapshot, collection, addDoc, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import addData from '@/firebase/firestore/addData';
import Image from 'next/image'

interface propData {
  product: QueryDocumentSnapshot<DocumentData, DocumentData>,
  user: {} | null
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

      <div className="w-full rounded-lg border-dashed border-2 border-red-300 p-4 mb-6 grid grid-cols-2">  
        <div className="mb-4">
          <p className="text-4xl text-red-300 font-bold">{color}</p>
          <p className="text-xl text-gray-600 mt-5">{brand}</p>
          <p className="text-gray-600 text-lg">{type}: {code}</p>
          <p className="text-gray-600">Price: RM{price}</p>
          {/* <p className="text-gray-600">Suitablity: {price}%</p> */}
        </div>
        <div className="mb-4">
          <Image
          src="/m-f-brownies.png"
          width={500}
          height={500}
          alt="Picture of the author"
          />
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
