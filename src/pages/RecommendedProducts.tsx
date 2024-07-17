import React, {useState} from 'react'
import getDocuments from "../firebase/firestore/getData";
import { QueryDocumentSnapshot } from 'firebase/firestore';

function RecommendedProducts() {
    const [products, setProducts] = useState<QueryDocumentSnapshot[]>();
    const GetAllProduct = async () => {
        const {result, error} = await getDocuments("products")
        if(result == null) return;
        setProducts(result.docs)
        console.log("All products fetched!");
    }

    


    return (
        <div>
            <button onClick={GetAllProduct}>
                Get All Products
            </button>
        </div>
    )
}

export default RecommendedProducts