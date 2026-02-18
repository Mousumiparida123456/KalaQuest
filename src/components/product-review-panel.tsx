"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
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

type ProductReviewPanelProps = {
  productId: string;
  productName: string;
};

type BuyerReview = {
  id: string;
  name: string;
  comment: string;
  craftsmanship: number;
  delivery: number;
  authenticity: number;
  createdAt: string;
};

export function ProductReviewPanel({ productId, productName }: ProductReviewPanelProps) {
  const storageKey = useMemo(() => `kalaquest:buyer-reviews:${productId}`, [productId]);

  const [open, setOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [craftsmanship, setCraftsmanship] = useState("5");
  const [delivery, setDelivery] = useState("4");
  const [authenticity, setAuthenticity] = useState("5");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      setReviewCount(0);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as BuyerReview[];
      setReviewCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setReviewCount(0);
    }
  }, [storageKey]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextReview: BuyerReview = {
      id: crypto.randomUUID(),
      name: name.trim(),
      comment: comment.trim(),
      craftsmanship: Number(craftsmanship),
      delivery: Number(delivery),
      authenticity: Number(authenticity),
      createdAt: new Date().toISOString(),
    };

    let existing: BuyerReview[] = [];
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as BuyerReview[];
          existing = Array.isArray(parsed) ? parsed : [];
        } catch {
          existing = [];
        }
      }

      const next = [nextReview, ...existing];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setReviewCount(next.length);
    }

    setName("");
    setCraftsmanship("5");
    setDelivery("4");
    setAuthenticity("5");
    setComment("");
    setOpen(false);
    setJustSubmitted(true);
  };

  return (
    <div className="mt-4 rounded-lg border border-border/70 bg-background/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">
          {reviewCount} buyer review{reviewCount === 1 ? "" : "s"} submitted
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]">Submit Buyer Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Buyer Review</DialogTitle>
              <DialogDescription>Share your feedback for {productName}.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`buyer-name-${productId}`}>Name</Label>
                <Input
                  id={`buyer-name-${productId}`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`buyer-craftsmanship-${productId}`}>Craftsmanship</Label>
                  <select
                    id={`buyer-craftsmanship-${productId}`}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={craftsmanship}
                    onChange={(event) => setCraftsmanship(event.target.value)}
                  >
                    <option value="5">5/5</option>
                    <option value="4">4/5</option>
                    <option value="3">3/5</option>
                    <option value="2">2/5</option>
                    <option value="1">1/5</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`buyer-delivery-${productId}`}>Delivery</Label>
                  <select
                    id={`buyer-delivery-${productId}`}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={delivery}
                    onChange={(event) => setDelivery(event.target.value)}
                  >
                    <option value="5">5/5</option>
                    <option value="4">4/5</option>
                    <option value="3">3/5</option>
                    <option value="2">2/5</option>
                    <option value="1">1/5</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`buyer-authenticity-${productId}`}>Authenticity</Label>
                  <select
                    id={`buyer-authenticity-${productId}`}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={authenticity}
                    onChange={(event) => setAuthenticity(event.target.value)}
                  >
                    <option value="5">5/5</option>
                    <option value="4">4/5</option>
                    <option value="3">3/5</option>
                    <option value="2">2/5</option>
                    <option value="1">1/5</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`buyer-comment-${productId}`}>Comment</Label>
                <Textarea
                  id={`buyer-comment-${productId}`}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Write your review"
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {justSubmitted ? (
        <p className="mt-2 text-[11px] text-primary">
          Thank you. Your review has been submitted.
        </p>
      ) : null}
    </div>
  );
}


