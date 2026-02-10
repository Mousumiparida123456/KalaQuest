import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Quiz } from "@/components/quiz";
import { ArrowRight, Compass, Music, Palette, PenSquare, Puzzle } from "lucide-react";
import { PlayCard } from "@/components/play-card";

export default function Home() {
  const heroImage = placeholderImages.find((p) => p.id === "hero-background");
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="relative z-10 flex flex-col items-center p-4"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-wider">
            Kala Quest
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-body">
            Unravel the stories woven into India's crafts. Your adventure
            begins now.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary/90 hover:bg-primary border border-primary-foreground/20 text-primary-foreground"
          >
            <Link href="/artisans">Discover the Artisans</Link>
          </Button>
        </div>
      </section>

      <section id="featured-crafts" className="w-full bg-muted/40 py-16">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-headline tracking-wide mb-4">Featured Crafts</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 mb-12">
                A curated collection of authentic, handcrafted treasures. Each piece tells a story.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Button asChild>
                <Link href="/marketplace">
                    Go to Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>

      <section id="current-mystery" className="w-full max-w-5xl p-4 md:p-8 my-12">
         <h2 className="text-4xl md:text-5xl font-headline tracking-wide mb-12 text-center">Your Current Quest</h2>
        <Quiz />
      </section>

      <section id="play" className="w-full max-w-7xl p-4 md:p-8 my-12">
        <h2 className="text-4xl md:text-5xl font-headline tracking-wide mb-4 text-center">Play with Heritage</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 mb-12 text-center">
            Engage with culture in a new way through games and activities.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <PlayCard icon={Music} title="Music" href="/music" />
            <PlayCard icon={Puzzle} title="Puzzle" href="/puzzle" />
            <PlayCard icon={PenSquare} title="Crossword" href="/crossword" />
            <PlayCard icon={Palette} title="Coloring" href="/coloring" />
            <PlayCard icon={Compass} title="Adventure" href="/adventure" />
        </div>
      </section>
    </div>
  );
}
