'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { Input } from './ui/input';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase/auth/use-user';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount, subtotal } = useCart();
  const { user } = useUser();

  return (
    <>
      <SheetHeader>
        <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
      </SheetHeader>
      {cartCount > 0 ? (
        <>
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4 py-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-base">{item.product.name}</h3>
                    <p className="text-sm text-primary">Rs {item.product.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                        className="h-8 w-16"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.product.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto flex-col space-y-4 pt-4">
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link href={user ? '/checkout' : '/login'}>
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Your cart is empty.</p>
        </div>
      )}
    </>
  );
}
