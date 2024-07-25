import "@/app/globals.css";
import React from "react";
import Header from "@/app/components/Header";

function Home() {
  return (
    <div className="bg-[#FCB9B2] min-h-screen flex flex-col">
      <Header user=""/>
      <div className="h-[85vh] p-3">
        <div className="h-[15vh] px-10 py-5">
            <h1 className="text-6xl font-bold">
                Welcome To The Make Up Recommender
            </h1>
            <h1 className="text-4xl">
                Learn More About Your Preferences.
            </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
