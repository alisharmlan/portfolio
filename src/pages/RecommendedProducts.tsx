import React, {useCallback, useEffect, useState} from 'react'
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
    const fetchAllProducts = useCallback(async () => {
      try{
        const {result, error} = await getDocuments("products")
        if(result == null) return;
        setProducts(result.docs);
        if(products)
        await console.log(products[0].data());
      }
      catch {
        (e: any) => {console.log(e)}
      }
    }, [products]) 
        
        
    
    const [userData, setUserData] = useState<User>(); // the data from the user used for the comparison
    useEffect(() => {
      if(!user){
        return;
      }
      
       if(!products) fetchAllProducts();

      (async () => {
        const data: User | undefined = await fetchUser(user);
        setUserData(data);
        await CalculateCompatibility(data);
      })();
        
    }, [user, fetchAllProducts, products])

    const [calcLoading, setCalcLoading] = useState<boolean>(true);
    const CalculateCompatibility = async (data?: User) => {
      if(!data) return;

      const {name, preferences} = data;

      console.log(`User ${name.stringValue.toString()} is being calculated!`);
      
      // when all is completed
      setCalcLoading(false);
    }
    
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8]">
        <button onClick={fetchAllProducts}>Get All Products</button>
        {
          user != null || undefined ? (
            // if the user exist
            <>
              {
                calcLoading ? (
                  // if calculation still loading
                  <> 
                    <h1>
                      loading...
                    </h1>
                  </>
                ) : (
                  // if done calculation
                  <>
                    <h1>
                      {products ? (<>hi: {products[0].data().brand}</>) : (<></>)
                      }
                    </h1>
                  </>
                )
              } 
            </>
        ): (
          // If the user doesn't exist
          <>
            <h1> Error user not found!</h1>
          </>
        )
      }
      </div>
    );
}

export default RecommendedProducts