import { NextResponse } from "next/server";
import { z } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { getServerFirestore } from "@/ai/server-firestore";

const bookingSchema = z
  .object({
    state: z.string().min(1),
    villageName: z.string().min(1),
    city: z.string().min(1),
    bestVisitingSeason: z.string().min(1),
    coordinatorName: z.string().min(1),
    coordinatorPhone: z.string().min(8),
    coordinatorEmail: z.string().email(),
    guestName: z.string().min(2),
    guestPhone: z.string().min(8),
    guestEmail: z.string().email(),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guests: z.number().int().min(1).max(10),
    notes: z.string().max(1000).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.checkOut < value.checkIn) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Check-out date must be after check-in date.",
        path: ["checkOut"],
      });
    }
  });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bookingSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid booking payload",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const firestore = getServerFirestore();
    const payload = parsed.data;

    const bookingRef = await addDoc(collection(firestore, "staycation_bookings"), {
      ...payload,
      status: "pending",
      source: "plan-your-visit",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await addDoc(collection(firestore, "coordinator_notifications"), {
      bookingId: bookingRef.id,
      type: "staycation_request",
      coordinatorName: payload.coordinatorName,
      coordinatorPhone: payload.coordinatorPhone,
      coordinatorEmail: payload.coordinatorEmail,
      villageName: payload.villageName,
      state: payload.state,
      city: payload.city,
      guestName: payload.guestName,
      guestPhone: payload.guestPhone,
      guestEmail: payload.guestEmail,
      createdAt: serverTimestamp(),
      status: "queued",
    });

    return NextResponse.json({
      ok: true,
      bookingId: bookingRef.id,
      message: "Staycation request submitted.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to submit staycation request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/staycation-bookings",
    method: "POST",
  });
}

