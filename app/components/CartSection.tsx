"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function CartSection() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
        <Link
          href="/products"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <div className="flex justify-between text-lg mb-2">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex justify-between text-xl mb-4">
          <span>Total Price:</span>
          <span className="font-bold text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
