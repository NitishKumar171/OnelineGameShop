import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Trash2, CreditCard, IndianRupee } from 'lucide-react';
import UPIPayment from '../components/UPIPayment';

export default function Cart() {
  const { cart, games, removeFromCart, clearCart } = useStore();
  const [showUPIPayment, setShowUPIPayment] = useState(false);

  const cartItems = cart.map(item => ({
    ...item,
    game: games.find(g => g.id === item.gameId)!
  }));

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.game.discountedPrice || item.game.price) * item.quantity, 0
  );
  
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePaymentSuccess = () => {
    clearCart();
    setShowUPIPayment(false);
    // In a real app, you would also save the order to your backend
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.gameId} className="bg-gray-800 rounded-lg p-4 flex items-center">
                    <img
                      src={item.game.coverImage}
                      alt={item.game.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-bold text-white">{item.game.title}</h3>
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-white">
                          ${(item.game.discountedPrice || item.game.price) * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.gameId)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {!showUPIPayment ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowUPIPayment(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-colors"
                  disabled={cartItems.length === 0}
                >
                  <IndianRupee className="w-5 h-5" />
                  <span>Pay with UPI</span>
                </button>
                <button
                  className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
                  disabled={cartItems.length === 0}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Pay with Card</span>
                </button>
              </div>
            ) : (
              <UPIPayment
                amount={total}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowUPIPayment(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}