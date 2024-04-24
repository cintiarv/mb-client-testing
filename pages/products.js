import React from "react";
import { products } from "../app/products";
import "tailwindcss/tailwind.css";

function Products() {
  const handlePay = async (product) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await res.json();
    window.location = session.url;
  };
  return (
    <div className="px-44">
      <h1 className="text-3xl font-bold text-center my-10">Productos</h1>
      <div className="grid grid-cols-2 gap-10 mt-10">
        {products?.map((product, i) => (
          <div className="text-center p-4 rounded-mg" key={i}>
            <h2 className="font-bold text-sm">{product.name}</h2>
            <p>${product.price / 100}</p>
            <img className="w-full" src={product.image} alt="image" />
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md mt-4 w-full"
              onClick={() => handlePay(product)}
            >
              Pagar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
