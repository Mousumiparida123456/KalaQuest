"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const productImage = placeholderImages.find(p => p.imageUrl === product.image);
    const { addToCart } = useCart();

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
          ₹{product.price.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={"secondary"} onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
