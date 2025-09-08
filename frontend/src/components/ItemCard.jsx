import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-stone-800 mb-1">{item.name}</h3>
          <p className="text-stone-600 mb-3">{item.description}</p>
          <p className={` mb-3 p-1 text-xs rounded-xl ${item.is_avaliable ? "bg-green-600" : "bg-red-300"}`}>{item.is_avaliable ? "Available" : "Not Available"}</p>
        </div>
        <div className="text-lg font-bold text-amber-700 ml-4 whitespace-nowrap">{item.price} BIRR</div>
      </div>

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


