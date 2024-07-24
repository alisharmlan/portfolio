/* eslint-disable react-hooks/exhaustive-deps */
import "@/app/globals.css";
import React, { useCallback, useEffect, useState } from "react";
import getDocuments from "@/firebase/firestore/getData";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import fetchUser, { User } from "./GetUser";
import { useSearchParams } from "next/navigation";
import CardRecommender from "@/app/components/CardRecommender";

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
  


  const GetAllergies = async (ingredients: string) => {
    if(!ingredients) return "none";

    ingredients = ingredients.replaceAll(" ", "").toLowerCase();
    return ingredients;
  };
  const GetUndertones = async (undertones: string) => {
    if(!undertones) return "none";

    undertones = undertones.replaceAll(" ", "").toLowerCase();
    return undertones;
  };

  const UserLog = async (data: User) => {
    console.log(
      `User ${data.name.stringValue}:
          Skintone: ${data.preferences?.mapValue.fields.skintone.stringValue}
          Skincolor: ${data.preferences?.mapValue.fields.skincolor.stringValue}
          Undertone: ${data.preferences?.mapValue.fields.undertone.stringValue}
          Skintype: ${data.preferences?.mapValue.fields.skintype.stringValue}
          Allergy: ${data.preferences?.mapValue.fields.allergy.stringValue}
        `
    );
  };

  // calculating user w product
  const CalculateProduct = async (preference: Preferences, product: Product) => {
    let score = 5;
    let reject: string[] = [];

    let allergies = await GetAllergies(product.ingredients);
    let undertones = await GetUndertones(product.undertone);
    let preferenceFields = preference.mapValue.fields;

    // console.log(
    //   `Product: ${product.brand}-${product.type}-${product.code}-${product.undertone}`
    // );

    if (allergies?.match(preferenceFields.allergy.stringValue.toLowerCase())) {
      console.log(
        `user ${preferenceFields.allergy.stringValue.toLowerCase()} can't use because this product contains [${allergies?.match(
          preferenceFields.allergy.stringValue.toLowerCase()
        )}]`
      );

      score = 0;
      reject.push(
        `user ${preferenceFields.allergy.stringValue.toLowerCase()} can't use because this product contains [${allergies?.match(
          preferenceFields.allergy.stringValue.toLowerCase()
        )}]`
      );

      return {
        score, reject
      };
    }

    if (!product.color.includes(preferenceFields.skincolor.stringValue.toLowerCase())) {
      console.log(
        // `user ${preferenceFields.skincolor.stringValue} doesn't have a ${product.color} skincolor`
      );
      score = score - 2;
      reject.push(
        `user ${preferenceFields.skincolor.stringValue} doesn't have a ${product.color} skincolor`
      );
    }

    if (
      !undertones?.match(preferenceFields.undertone.stringValue.toLowerCase())
    ) {
      console.log(
        // `user ${preferenceFields.undertone.stringValue} doesn't match ${undertones} undertones`
      );
      score--;
      reject.push(
        `user ${preferenceFields.undertone.stringValue} doesn't match ${undertones} undertones`
      );
    }

    if (!product.tone.includes(preferenceFields.skintone.stringValue.toLowerCase())) {
      console.log(
        // `user ${preferenceFields.skintone.stringValue} doesn't have a ${product.tone} skintone`
      );
      score--;
      reject.push(`user ${preferenceFields.skintone.stringValue} doesn't have a ${product.tone} skintone`);
    }

    let price = +product.price;
    if (price > +preferenceFields.price.stringValue) {
      // console.log(`user doesn't want to spend more than ${price} skintone`);
      score--;
      reject.push(`user doesn't want to spend more than ${price} skintone`);
    }

    console.log(
      // `Product: ${product.brand}-${product.type}-${product.code}-${allergies}
      // Score: ${score}`
    );

    return {score, reject};
  };
  
  interface Preferences {
    mapValue: {
      fields: {
        allergy: {
          stringValue: string;
        };
        price: {
          stringValue: string;
        };
        skincolor: {
          stringValue: string;
        };
        skintone: {
          stringValue: string
        };
        undertone: {
          stringValue: string
        }
      }
    }
  }

  interface Listing {
    product: Product;
    score: number,
    reject: []
  }
  const [calcLoading, setCalcLoading] = useState<boolean>(true);
  const [productsListing, setProductsListing] = useState<Listing[]>([]);
  const CalculateCompatibility = async (data?: User) => {
    try {
      if (!data || !products) return;

      const { name, preferences } = data;
      if (!preferences) return;
      const preferencesFields: Preferences = preferences;

      await UserLog(data);

      const listing = await Promise.all(
        products.map(async (product) => {
          let {score, reject} = await CalculateProduct(
            preferencesFields,
            product.data() as Product
          );
          return { product: product.data() as Product, score: score, reject: reject};
        })
      );

      setProductsListing([...listing].sort(
        (a, b) => b.score - a.score
      ) as Listing[]);

    } catch (e) {
      console.log(e);
    } finally {
      // when all is completed
      console.log(await productsListing.length);
      
      setCalcLoading(false);
    }
  };

  

  interface Product {
    tone: string;
    brand: string;
    price: string;
    color: string;
    code: string;
    type: string;
    ingredients: string;
    undertone: string;
  }

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
  }, [
    user,
    fetchAllProducts,
    products,
  ]);

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
        <div className="flex flex-col flex-grow justify-center items-center h-full w-full bg-gradient-to-br from-[#fc8f83] to-[#f7ccc8]">
          {/* <button onClick={fetchAllProducts}>Get All Products</button> */}
          <div className="flex items-center justify-center mt-14 border-b-4 border-red-100 py-5">
            <h2 className="font-bold text-4xl">Recommended Products</h2>
          </div>
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
                  <div className="justify-center items-center content-center flex">
                    {products ? (
                      <div className="grid grid-cols-3 border-white p-5 gap-2">
                        {/* Probably update this to show the stuffs */}
                        {productsListing.map((value, index) => (
                          <>
                            {/* {`${value.product.brand.toString()} - ${value.score.toString()}`} */}
                            <CardRecommender
                              key={index}
                              user={user}
                              product={value.product}
                              score={value.score}
                              reject={value.reject}
                            />
                          </>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
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
