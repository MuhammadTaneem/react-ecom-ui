import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Address, PaymentMethod } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

const paymentSchema = z.object({
  method: z.enum(['cash', 'mobile', 'card'] as const),
  mobile_number: z.string().optional(),
  transaction_id: z.string().optional(),
  card_number: z.string().optional(),
  expiry_date: z.string().optional(),
  cvv: z.string().optional(),
}).refine(data => {
  if (data.method === 'mobile') {
    return !!data.mobile_number && !!data.transaction_id;
  }
  if (data.method === 'card') {
    return !!data.card_number && !!data.expiry_date && !!data.cvv;
  }
  return true;
}, {
  message: "Please fill in all required fields for the selected payment method",
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('cash');

  // Simulated addresses - in a real app, this would come from the user's profile
  const addresses: Address[] = [
    {
      id: 1,
      name: 'Home',
      address_line1: '123 Main Street',
      address_line2: 'Apt 4B',
      city: 'Dhaka',
      area: 'Uttara',
      phone_number: '+8801234567890',
      is_default: true,
    },
    {
      id: 2,
      name: 'Office',
      address_line1: '456 Business Avenue',
      city: 'Dhaka',
      area: 'Banani',
      phone_number: '+8801987654321',
      is_default: false,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: 'cash',
    },
  });

  const currentPaymentMethod = watch('method');

  // Set default address if none selected
  useState(() => {
    const defaultAddress = addresses.find(addr => addr.is_default);
    if (defaultAddress && !selectedAddress) {
      setSelectedAddress(defaultAddress.id);
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const onSubmit = async (data: PaymentFormData) => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    // Simulate order placement
    console.log('Order placed:', {
      items,
      address: addresses.find(addr => addr.id === selectedAddress),
      payment: data,
      totalAmount: totalPrice,
    });

    // Navigate to success page (you'll need to create this)
    navigate('/order-success');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    selectedAddress === address.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 hover:border-primary-500 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.is_default && (
                      <span className="text-xs text-primary-600 dark:text-primary-400">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {address.address_line1}
                    {address.address_line2 && <>, {address.address_line2}</>}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {address.area}, {address.city}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {address.phone_number}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div
                  className={`cursor-pointer rounded-lg border p-4 text-center ${
                    currentPaymentMethod === 'cash'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 hover:border-primary-500 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedPaymentMethod('cash')}
                >
                  <Wallet className="mx-auto h-6 w-6" />
                  <div className="mt-2 font-medium">Cash on Delivery</div>
                </div>

                <div
                  className={`cursor-pointer rounded-lg border p-4 text-center ${
                    currentPaymentMethod === 'mobile'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 hover:border-primary-500 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedPaymentMethod('mobile')}
                >
                  <Smartphone className="mx-auto h-6 w-6" />
                  <div className="mt-2 font-medium">Mobile Banking</div>
                </div>

                <div
                  className={`cursor-pointer rounded-lg border p-4 text-center ${
                    currentPaymentMethod === 'card'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 hover:border-primary-500 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  <CreditCard className="mx-auto h-6 w-6" />
                  <div className="mt-2 font-medium">Card Payment</div>
                </div>
              </div>

              <input
                type="hidden"
                {...register('method')}
                value={selectedPaymentMethod}
              />

              {selectedPaymentMethod === 'mobile' && (
                <div className="space-y-4">
                  <Input
                    label="Mobile Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                  />
                  <Input
                    label="Transaction ID"
                    {...register('transaction_id')}
                    error={errors.transaction_id?.message}
                  />
                </div>
              )}

              {selectedPaymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    {...register('card_number')}
                    error={errors.card_number?.message}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      {...register('expiry_date')}
                      error={errors.expiry_date?.message}
                    />
                    <Input
                      label="CVV"
                      type="password"
                      maxLength={3}
                      {...register('cvv')}
                      error={errors.cvv?.message}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="text-sm font-medium">{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                  <p className="text-sm font-medium">Free</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tax</p>
                  <p className="text-sm font-medium">{formatPrice(totalPrice * 0.1)}</p>
                </div>
                <div className="flex justify-between mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-base font-medium">Total</p>
                  <p className="text-base font-bold">
                    {formatPrice(totalPrice + (totalPrice * 0.1))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;