import CartSection from "../components/CartSection";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <CartSection />
      </div>
    </div>
  );
}
