import React, { useState } from "react";

export default function Home() {
  const itemName = "img";
  let itemPrice = 500;
  const [quantity, setquantity] = useState(1);
  const [finalamount, setfinalamount] = useState(itemPrice);
  const decrement = () => {
    if (quantity <= 1) {
      setquantity(1);
      setfinalamount(itemPrice);
    } else if (quantity > 1) {
      setquantity(quantity - 1);
      setfinalamount(finalamount - itemPrice);
    }
  };

  const increment = () => {
    setquantity(quantity + 1);
    setfinalamount(finalamount + itemPrice);
  };

  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
            items:[
                {
                    id:1,
                    quantity:quantity,
                    price:itemPrice,
                    name:itemName
                }
            ]
        })
      })
      const data = await res.json()
      window.location= data.url
    } catch (error) {
        console.log("🚀 ~ checkout ~ error:", error)
        
    }
  };
  return (<div>

  </div>)
}
