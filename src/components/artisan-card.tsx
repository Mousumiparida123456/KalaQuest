import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Artisan } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

type ArtisanCardProps = {
  artisan: Artisan;
};

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden parchment transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-square w-full">
        <Image
          src={artisan.image}
          alt={`Portrait of ${artisan.name}`}
          fill
          className="object-cover"
          data-ai-hint="indian artisan"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{artisan.name}</CardTitle>
        <CardDescription className="text-primary font-semibold">{artisan.craft}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3">{artisan.bio}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
          <Link href={`/marketplace?artisanId=${artisan.id}`}>
            View Crafts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
