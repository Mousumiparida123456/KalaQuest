"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Check, ShoppingCart } from 'lucide-react';
import { ProductReviewPanel } from '@/components/product-review-panel';
import { useUser } from '@/firebase/auth/use-user';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find((p) => p.imageUrl === product.image);
  const { addToCart, removeFromCart, cart } = useCart();
  const { user } = useUser();
  const isInCart = cart.some((item) => item.product.id === product.id);

  return (
    <Card className="flex flex-col overflow-hidden parchment transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-video w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          data-ai-hint={productImage?.imageHint || 'handicraft'}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl h-14">{product.name}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">
          Rs {product.price.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/80 line-clamp-2">{product.description}</p>
        <ProductReviewPanel productId={product.id} productName={product.name} />
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full transition-all ${isInCart ? 'bg-primary text-primary-foreground ring-2 ring-primary/40 hover:bg-primary/90' : ''}`}
          variant={isInCart ? 'default' : 'secondary'}
          onClick={() => (isInCart ? removeFromCart(product.id) : addToCart(product))}
          disabled={!user}
        >
          {isInCart ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
          {!user ? 'Login to Add' : isInCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}

