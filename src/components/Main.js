import React, { useState, useContext, useEffect } from "react";
import Shimmer, { NoRestaurant } from "./Shimmer";
import Card from "./Card";
import { Link } from "react-router-dom";
import { filterSerachCard } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { RESTURANT_API } from "../confiq";

function Main() {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurant] = useState([]);
  const [allRestaurants, setAllRestaurant] = useState([]);

  // intialize useEffect

  useEffect(() => {
    getApiData();
  }, []);

  // api call functions
  async function getApiData() {
    const data = await fetch(RESTURANT_API);
    const json = await data.json();
    setFilteredRestaurant(json?.data?.cards);
    setAllRestaurant(json?.data?.cards);
  }
  const isOnline = useOnline();
  return !isOnline ? (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-4">🚫 No Internet</h1>
      <h2 className="text-lg font-bold m-2" data-testid="checkOnline">
        🔌It seems your internet connection lost...
      </h2>
    </div>
  ) : !allRestaurants ? null : (
    <div className="bg-[#F4F6F7] py-2 sm:p-8 mt-1">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center pb-4 border-b border-[#ccc]">
        <p className="mt-4 md:mt-0 text-2xl  font-fsans md:text-xl font-bold text-[#858282]">
          Top restaurants of day
        </p>
        <div>
          <input
            className="lg:w-[300px] border border-[#85929E] p-2 rounded-lg focus:outline-none"
            data-testid="searchInput"
            type="text"
            placeholder="Search favourite food here.."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              const filteredRestaurants = filterSerachCard(
                e.target.value,
                allRestaurants
              );
              setFilteredRestaurant(filteredRestaurants);
            }}
          />
          {/* <button
            className="p-2 border rounded-lg border-[#85929E] ml-1 font-semibold hover:bg-[#60b246] hover:text-white hover:cursor-pointer hover:shadow-md ease-in-out duration-300"
            data-testid="checkSearch"
            onClick={() => {
              const filteredRestaurants = filterSerachCard(
                searchText,
                allRestaurants
              );
              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button> */}
        </div>
      </div>
      <div className="bg-white mt-4 flex justify-start items-center min-h-[500px] font-bserif shadow-lg rounded-md shadow-slate-400">
        {allRestaurants.length === 0 ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <NoRestaurant />
        ) : (
          <div
            data-testid="resturantLists"
            className="mx-4 w-full my-4 flex justify-center items-center flex-wrap font-bserif"
          >
            {filteredRestaurants.map((each_resturant) => {
              return (
                <Link
                  className=""
                  to={"/restaurants/" + each_resturant?.data?.data?.id}
                  key={each_resturant?.data?.data?.id}
                >
                  <Card {...each_resturant?.data?.data} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
