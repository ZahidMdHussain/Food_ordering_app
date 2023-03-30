import React from "react";
import { useParams } from "react-router-dom";
import { img_cdn_path } from "../confiq";
import { ResturantShimmer } from "./Shimmer";
import useResturant from "../utils/useResturant";
import { additem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import ResturantInfo from "./ResturantInfo";
import DishMenu from "./DishMenu";

const SelectResturant = () => {
  const { id } = useParams();
  const seeResturant = useResturant(id);
  const dispatch = useDispatch();
  let recom = 5;

  const addtoCart = (item) => {
    dispatch(additem(item));
  };
  seeResturant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(
    (i, index) => {
      if (i.card.card.title == "Recommended") {
        recom = index;
      }
    }
  );
  const cardTiles =
    seeResturant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[recom]
      ?.card?.card?.itemCards;
  const restaurantInfo = seeResturant?.cards[0]?.card?.card?.info;

  return !cardTiles ? (
    <ResturantShimmer />
  ) : (
    <>
      <div className="p-8">
        <div className="bg-white px-6 py-4 mt-4 font-fsans shadow-lg shadow-slate-400 min-h-[500px] rounded-lg">
          <ResturantInfo info={restaurantInfo} />

          <h1 className="mt-10 border-b text-2xl font-bold text-gray-700">
            All menu items
          </h1>
          <div
            data-testid="menu"
            className="flex justify-center lg:justify-start items-center flex-wrap mt-4"
          >
            {Object.values(cardTiles).map((item) => {
              return item?.card?.info?.imageId && <DishMenu item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectResturant;
