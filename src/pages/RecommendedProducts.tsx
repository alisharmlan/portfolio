import "@/app/globals.css";
import React, { useCallback, useEffect, useState } from "react";
import getDocuments from "@/firebase/firestore/getData";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import fetchUser, { User } from "./GetUser";
import { useSearchParams } from "next/navigation";

function RecommendedProducts() {
  const authContext: { user?: string } = useAuthContext();
  const searchParams = useSearchParams();
  const user = searchParams?.get("user");

  const [products, setProducts] = useState<QueryDocumentSnapshot[]>();
  const fetchAllProducts = useCallback(async () => {
    try {
      const { result, error } = await getDocuments("products");
      if (result == null) return;
      setProducts(result.docs);
      if (products) await console.log(products[0].data());
    } catch {
      (e: any) => {
        console.log(e);
      };
    }
  }, [products]);

  const [userData, setUserData] = useState<User>(); // the data from the user used for the comparison
  useEffect(() => {
    if (!user) {
      return;
    }

    if (!products) fetchAllProducts();

    (async () => {
      const data: User | undefined = await fetchUser(user);
      setUserData(data);
      await CalculateCompatibility(data);
    })();
  }, [user, fetchAllProducts, products]);

  const [calcLoading, setCalcLoading] = useState<boolean>(true);
  const CalculateCompatibility = async (data?: User) => {
    try {
      if (!data || !products) return;

      const { name, preferences } = data;
      if (!preferences) return;
      const preferencesFields = preferences.mapValue;

      await UserLog(data);
      products.map((product, index) => {
        CalculateProduct(preferencesFields, product.data() as Product);
      });
    } catch (e) {
      console.log(e);
    } finally {
      // when all is completed
      setCalcLoading(false);
    }
  };

  const UserLog = async (data: User) => {
    console.log(
      `User ${data.name.stringValue}:
          Skintone: ${data.preferences?.mapValue.fields.skintone.stringValue}
          Skincolor: ${data.preferences?.mapValue.fields.skincolor.stringValue}
          Undertone: ${data.preferences?.mapValue.fields.undertone.stringValue}
          Skintype: ${data.preferences?.mapValue.fields.skintype.stringValue}
        `
    );
  };

  interface Product {
    brand: string;
    price: string;
    color: string;
    code: string;
    type: string;
  }

  // calculating user w product
  const CalculateProduct = async (preference: {}, product: Product) => {
    console.log(`Product: ${product.brand}-${product.type}-${product.code}`);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8] min-h-screen flex flex-col">
        <div className="text-white p-4 flex justify-start items-center">
          <div className="container">
            <h1 className="font-playwrite text-5xl lg:text-7xl font-bold">
              Recommended Products
            </h1>
            <p className="text-lg lg:text-xl mt-2">
              Experience Beauty with Confidence
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8]">
          <button onClick={fetchAllProducts}>Get All Products</button>
          {user != null || undefined ? (
            // if the user exist
            <>
              {calcLoading ? (
                // if calculation still loading
                <>
                  <h1>loading...</h1>
                </>
              ) : (
                // if done calculation
                <>
                  <h1>
                    {products ? <>hi: {products[0].data().brand}</> : <></>}
                  </h1>
                </>
              )}
            </>
          ) : (
            // If the user doesn't exist
            <>
              <h1> Error user not found!</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RecommendedProducts;
