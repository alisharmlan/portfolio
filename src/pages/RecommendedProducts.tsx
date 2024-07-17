import React, {useEffect, useState} from 'react'
import getDocuments from "@/firebase/firestore/getData";
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';
import fetchUser, {User} from './GetUser';
import { useSearchParams } from 'next/navigation';

function RecommendedProducts() {
    const authContext: {user?: string} = useAuthContext();
      const searchParams = useSearchParams();
      const user = searchParams?.get("user");

    const [products, setProducts] = useState<QueryDocumentSnapshot[]>();
    const fetchAllProducts = async () => {
        const {result, error} = await getDocuments("products")
        if(result == null) return;
        setProducts(result.docs)
    }
    
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        fetchAllProducts();
        (async () => {
          const data = await fetchUser(user);
          setUserData(data);
        })();
    }, [user])
    
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8]">
        <button onClick={fetchAllProducts}>Get All Products</button>
        hi : {userData?.name.stringValue}
      </div>
    );
}

export default RecommendedProducts