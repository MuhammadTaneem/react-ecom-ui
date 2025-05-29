import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCart } from '../hooks/useCart';
import Button from '../components/ui/Button';
import { ArrowLeft, Check } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(
    user?.addresses.find(addr => addr.is_default)?.id || null
  );
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  
  // Redirect to cart if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handlePlaceOrder = () => {
    // Here you would implement the order submission logic
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div>
      <Link 
        to="/cart" 
        className="mb-6 inline-flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Cart
      </Link>
      
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Checkout</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Shipping Address Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
            
            <div className="space-y-4">
              {user?.addresses.map((address) => (
                <div 
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    selectedAddress === address.id 
                      ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{address.name}</h3>
                        {address.is_default && (
                          <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {address.address_line1}
                        {address.address_line2 && <>, {address.address_line2}</>}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {address.city}, {address.area}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Phone: {address.phone_number}
                      </p>
                    </div>
                    
                    {selectedAddress === address.id && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={() => navigate('/profile?tab=addresses&action=add')}
                className="w-full"
              >
                + Add New Address
              </Button>
            </div>
          </div>
          
          {/* Payment Method Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
            
            <div className="space-y-4">
              <div 
                onClick={() => setPaymentMethod('cash')}
                className={`cursor-pointer rounded-lg border p-4 ${
                  paymentMethod === 'cash' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                  
                  {paymentMethod === 'cash' && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                onClick={() => setPaymentMethod('mobile')}
                className={`cursor-pointer rounded-lg border p-4 ${
                  paymentMethod === 'mobile' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Mobile Banking</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay using your mobile banking app
                      </p>
                    </div>
                  </div>
                  
                  {paymentMethod === 'mobile' && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                onClick={() => setPaymentMethod('card')}
                className={`cursor-pointer rounded-lg border p-4 ${
                  paymentMethod === 'card' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-500 dark:bg-purple-900/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Card Payment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay with your credit or debit card
                      </p>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              
              <div className="max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="mb-4 flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">
                          {item.name}
                        </h3>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{formatPrice(5)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>{formatPrice(totalPrice * 0.05)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-bold">
                      {formatPrice(totalPrice + 5 + (totalPrice * 0.05))}
                    </p>
                  </div>
                </div>
                
                <Button 
                  fullWidth
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddress}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 