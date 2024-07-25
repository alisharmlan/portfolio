import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface HeaderData {
  user?: string
}


const Header = (props: HeaderData) => {
  const router = useRouter();
  const [productName, setProductName] = useState<string>("none");
  const handleSearch = () => {
    if (!productName) {
      return;
    }
    //do search

  };

  
  useEffect(() => {
    console.log(`${props.user}`);
    
  },[])
  
  return (
    <div className="text-white p-10 flex justify-start items-center h-[10vh]">
      <form onSubmit={handleSearch}>
        <label>
          <input
            type="text"
            id="product"
            className="p-4 w-[32vw] rounded-full"
            placeholder={"Search product.."}
          />
        </label>
      </form>
      <div className="w-full h-full px-2 ml-10 flex items-center text-xl ">
        <div className="w-[10vw] h-full">
          <button
            onClick={(e) => {
              console.log("About Us");
            }}
            className="hover:scale-105 transition duration-200 ease-in-out"
          >
            About us
          </button>
        </div>
        <div className="w-[10vw] h-full">
          <button
            onClick={(e) => {
              console.log("Products");
              router.push("/")
            }}
            className="hover:scale-105 transition duration-200 ease-in-out"
          >
            Products
          </button>
        </div>
        <div className="w-[10vw] h-full">
          <button
            onClick={(e) => {
              console.log("Profile");
              router.push(`/ProfilePage?user=${props.user}`);
            }}
            className="hover:scale-105 transition duration-200 ease-in-out"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
