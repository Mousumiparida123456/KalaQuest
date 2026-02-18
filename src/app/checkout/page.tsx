'use client';

import { useCart } from '@/hooks/use-cart';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase/auth/use-user';

export default function CheckoutPage() {
  const { cart, subtotal, cartCount } = useCart();
  const { user, isLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('9876543210');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (cartCount === 0 && !orderPlaced) {
      router.replace('/');
    }
  }, [cartCount, isMounted, isLoading, orderPlaced, router, user]);

  if (!isMounted || isLoading || !user || (cartCount === 0 && !orderPlaced)) {
    return null;
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    toast({
      title: 'Order placed',
      description: 'Test order confirmation shown successfully.',
    });
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <Card className="w-full max-w-2xl parchment text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl">Your Order Is Placed</CardTitle>
            <CardDescription className="text-base md:text-lg">
              Please stay connected with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p>Thank you.</p>
            <p>You will be contacted soon on your number: {customerPhone}.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Checkout</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Almost there! Just a few more details to complete your order.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="parchment">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Shipping & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-headline text-xl">Shipping Address</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your Name" defaultValue="Test Customer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" defaultValue="test.customer@example.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="9876543210"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Heritage Lane" defaultValue="123 Heritage Lane" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Jaipur" defaultValue="Jaipur" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Rajasthan" defaultValue="Rajasthan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">PIN Code</Label>
                    <Input id="zip" placeholder="302001" defaultValue="302001" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-headline text-xl">Payment Method</h3>
                <RadioGroup defaultValue="online" className="space-y-4">
                  <Label htmlFor="payment-online" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary">
                    <RadioGroupItem value="online" id="payment-online" />
                    <CreditCard className="h-6 w-6" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Pay Online</span>
                      <span className="text-sm text-muted-foreground">Use credit/debit card, UPI, or net banking.</span>
                    </div>
                  </Label>
                  <Label htmlFor="payment-cod" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary">
                    <RadioGroupItem value="cod" id="payment-cod" />
                    <Truck className="h-6 w-6" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Cash on Delivery</span>
                      <span className="text-sm text-muted-foreground">Pay when your order arrives.</span>
                    </div>
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                Place Order (Rs {subtotal.toFixed(2)})
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="parchment sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              <CardDescription>{cartCount} item(s)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">Rs {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
