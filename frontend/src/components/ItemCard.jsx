import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-stone-800 mb-1 capitalize">{item.name}</h3>
        </div>
        <div className="text-lg font-bold text-amber-700 ml-4 whitespace-nowrap">{item.price} BIRR</div>
      </div>
          <p className="text-stone-600 my-3 ">{item.description}</p>
          <span className={`ml-0 sm:ml-2 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap"> ${item.is_available ? " bg-green-100 text-green-800" : " bg-red-100 text-red-800"}`}>{item.is_available ? "Avaliable": "Not Avaliable"}</span>

      {item.image_url && (
        <div className="mt-4 mb-2">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ItemCard;


