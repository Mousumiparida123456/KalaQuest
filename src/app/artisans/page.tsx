import { artisans } from '@/lib/data';
import { ArtisanCard } from '@/components/artisan-card';

export default function ArtisansPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Meet the Artisans</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          The heart and soul of our heritage. Discover the stories, passion, and skill woven into every creation.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {artisans.map(artisan => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
}
