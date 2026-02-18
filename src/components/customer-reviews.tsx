"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type CustomerReviewsProps = {
  productId: string;
  productName: string;
  showAddReviewButton?: boolean;
};

const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Ananya S.",
    rating: 5,
    comment: "Beautiful craftsmanship and the finish is excellent. Worth every rupee.",
    createdAt: "2026-02-10",
  },
  {
    id: "r2",
    name: "Rohit M.",
    rating: 4,
    comment: "Packaging was secure and delivery was smooth. Product matches the photos.",
    createdAt: "2026-02-12",
  },
  {
    id: "r3",
    name: "Sneha K.",
    rating: 5,
    comment: "Loved the hand-crafted details. I will order again for gifting.",
    createdAt: "2026-02-14",
  },
];

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;
        return (
          <Star
            key={`${rating}-${index}`}
            className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
          />
        );
      })}
    </div>
  );
}

export function CustomerReviews({
  productId,
  productName,
  showAddReviewButton = true,
}: CustomerReviewsProps) {
  const storageKey = useMemo(() => `kalaquest:reviews:${productId}`, [productId]);

  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Review[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setReviews(parsed);
      } else {
        setReviews(defaultReviews);
      }
    } catch {
      setReviews(defaultReviews);
    }
  }, [storageKey]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextReview: Review = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextReviews = [nextReview, ...reviews];
    setReviews(nextReviews);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(nextReviews));
    }

    setName("");
    setRating("5");
    setComment("");
    setDialogOpen(false);
  };

  return (
    <section className="w-full" aria-label="Customer reviews">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          
          <p className="mt-2 text-sm text-muted-foreground">
            Reviews for {productName}  {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </p>
        </div>

        {showAddReviewButton ? (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Review</DialogTitle>
                <DialogDescription>Share your experience for this craft product.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="review-name">Name</Label>
                  <Input
                    id="review-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-rating">Rating</Label>
                  <select
                    id="review-rating"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-comment">Comment</Label>
                  <Textarea
                    id="review-comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write a short review"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Review
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="border-border/80 bg-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-base font-semibold">{review.name}</CardTitle>
                {renderStars(review.rating)}
              </div>
              <CardDescription>{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/85">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


