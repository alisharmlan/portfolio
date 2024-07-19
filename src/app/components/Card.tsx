import { QueryDocumentSnapshot, collection, addDoc, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import addData from '@/firebase/firestore/addData';
import Image from 'next/image'

interface propData {
  product: QueryDocumentSnapshot<DocumentData, DocumentData>,
  user: {} | null
}

function GetProductID(productInfo: {brand: string, type: string, code: string}): string{
  // console.lsog(`Product: ${productInfo.brand}-${productInfo.type}-${productInfo.code}`);
  return `${productInfo.brand}-${productInfo.type}-${productInfo.code}`;
}


function Card(props: propData) {
  // console.log(product.data);
  // console.log(user.uuid);

  const {product, user} = props;

  const productInfo = product._document.data.value.mapValue.fields;
  const [name, setName] = useState<string>("test");
  const [brand, setBrand] = useState<string>(productInfo.brand.stringValue);
  const [price, setPrice] = useState<string>(productInfo.price.stringValue);
  const [code, setCode] = useState<string>(productInfo.code.stringValue);
  const [color, setColor] = useState<string>(productInfo.color.stringValue);
  const [type, setType] = useState<string>(productInfo.type.stringValue);
  const [productid, setProductid] = useState<string>(GetProductID({brand, type, code}));

  const [isSaved, setIsSaved] = useState<Boolean>(false);

  let [filetype, setFiletype] = useState<string>("jpg")

  const saveToProfile = async () => {
    try {
      let savedProducts = {
        [`${brand}-${type}-${code}`]: productInfo 
      }
      const {result, error} = await addData("users", user?.uid, {savedProducts});
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
          <p className="text-gray-600 text-lg">
            {type}: {code}
          </p>
          <p className="text-gray-600">Price: RM{price}</p>
        </div>
        <div className="mb-4 hidden xl:block">
          <Image
            src={`/${productid}.${filetype}`}
            width={500}
            height={500}
            alt="Picture of the author"
            onError={(e) => setFiletype("png")}
          />
        </div>
      </div>
      {!isSaved ? (
        <button
          className="bg-[#fc8f83] hover:bg-[#fa7061] text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={saveToProfile}
        >
          Save to profile
        </button>
      ) : (
        <button className="bg-[#fa7061] text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out">
          Saved ✅
        </button>
      )}
    </div>
  );
}

export default Card;
