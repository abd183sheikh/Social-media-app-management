"use client";

import Image from "next/image";
import { CartItem as CartItemType, useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
          unoptimized
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
