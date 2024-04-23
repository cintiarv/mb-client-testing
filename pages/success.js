import React from "react";
import 'tailwindcss/tailwind.css'

const Success = () => {
  return (
    <div className="text-3xl font-bold text-center py-10 h-screen flex-items-center justify-center">
      <h1>Gracias por tu compra</h1>
      <a className="text-blue-500 block mt-4" href="/">Volver a la tienda</a>
    </div>
  );
};

export default Success;
