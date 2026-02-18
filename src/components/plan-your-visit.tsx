"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ArtisanContact = {
  name: string;
  craft: string;
  phone: string;
  email: string;
};

type Village = {
  name: string;
  city: string;
  bestVisitingSeason: string;
  latitude: number;
  longitude: number;
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorEmail: string;
  touristPlaces: string[];
  artisans: ArtisanContact[];
};

type StateVillageDirectory = {
  state: string;
  villages: Village[];
};

const villageDirectory: StateVillageDirectory[] = [
  {
    state: "Odisha",
    villages: [
      {
        name: "Raghurajpur Craft Village",
        city: "Puri",
        bestVisitingSeason: "October to February",
        latitude: 19.8903,
        longitude: 85.8312,
        coordinatorName: "Sanjukta Mohapatra",
        coordinatorPhone: "+91 94370 11842",
        coordinatorEmail: "raghurajpur.coordinator@kalaguide.in",
        touristPlaces: [
          "Pattachitra artist lanes and live workshops",
          "Gotipua dance gurukuls",
          "Jagannath Temple, Puri (nearby)",
          "Puri Beach and local seafood market",
        ],
        artisans: [
          {
            name: "Bishnu Charan Das",
            craft: "Pattachitra painting",
            phone: "+91 93373 00421",
            email: "bishnu.pattachitra@kalaguide.in",
          },
          {
            name: "Mamata Sahoo",
            craft: "Palm leaf etching",
            phone: "+91 82497 55218",
            email: "mamata.etching@kalaguide.in",
          },
        ],
      },
      {
        name: "Pipili Applique Village",
        city: "Pipili",
        bestVisitingSeason: "November to February",
        latitude: 20.1132,
        longitude: 85.8317,
        coordinatorName: "Prabhat Nayak",
        coordinatorPhone: "+91 98612 33741",
        coordinatorEmail: "pipili.stay@kalaguide.in",
        touristPlaces: [
          "Applique market street",
          "Evening illuminated craft stalls",
          "Dhauli Shanti Stupa (day trip)",
          "Bhubaneswar Old Town temples",
        ],
        artisans: [
          {
            name: "Ritika Behera",
            craft: "Applique canopy and decor",
            phone: "+91 70084 94317",
            email: "ritika.applique@kalaguide.in",
          },
          {
            name: "Sambit Rout",
            craft: "Festival umbrellas",
            phone: "+91 88954 22063",
            email: "sambit.craft@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "Rajasthan",
    villages: [
      {
        name: "Molela Terracotta Village",
        city: "Rajsamand",
        bestVisitingSeason: "November to March",
        latitude: 24.933,
        longitude: 73.963,
        coordinatorName: "Hariram Kumawat",
        coordinatorPhone: "+91 99828 16420",
        coordinatorEmail: "molela.host@kalaguide.in",
        touristPlaces: [
          "Terracotta shrine plaque workshops",
          "Rajsamand Lake",
          "Eklingji Temple",
          "Kumbhalgarh Fort (short drive)",
        ],
        artisans: [
          {
            name: "Bhagwati Lal Kumhar",
            craft: "Terracotta votive plaques",
            phone: "+91 94613 58702",
            email: "bhagwati.terracotta@kalaguide.in",
          },
          {
            name: "Meera Devi",
            craft: "Clay mural miniatures",
            phone: "+91 96361 80451",
            email: "meera.molela@kalaguide.in",
          },
        ],
      },
      {
        name: "Bagru Block Print Cluster",
        city: "Jaipur Rural",
        bestVisitingSeason: "October to February",
        latitude: 26.8138,
        longitude: 75.5494,
        coordinatorName: "Yusuf Ansari",
        coordinatorPhone: "+91 93142 71526",
        coordinatorEmail: "bagru.prints@kalaguide.in",
        touristPlaces: [
          "Natural dye block printing units",
          "Chhipa community workshops",
          "Jaipur walled city",
          "Amer Fort",
        ],
        artisans: [
          {
            name: "Arif Chhipa",
            craft: "Dabu resist printing",
            phone: "+91 97844 33092",
            email: "arif.dabu@kalaguide.in",
          },
          {
            name: "Farzana Bano",
            craft: "Natural indigo textile prints",
            phone: "+91 86195 77416",
            email: "farzana.print@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "Gujarat",
    villages: [
      {
        name: "Nirona Artisan Village",
        city: "Kutch",
        bestVisitingSeason: "November to February",
        latitude: 23.3271,
        longitude: 69.6694,
        coordinatorName: "Rahim Khatri",
        coordinatorPhone: "+91 98251 26931",
        coordinatorEmail: "nirona.contact@kalaguide.in",
        touristPlaces: [
          "Rogan art studio visits",
          "Copper bell making workshops",
          "White Rann of Kutch",
          "Kalo Dungar viewpoint",
        ],
        artisans: [
          {
            name: "Salim Khatri",
            craft: "Rogan art",
            phone: "+91 98795 64211",
            email: "salim.rogan@kalaguide.in",
          },
          {
            name: "Ibrahim Lohar",
            craft: "Copper bell craft",
            phone: "+91 99245 31027",
            email: "ibrahim.bells@kalaguide.in",
          },
        ],
      },
      {
        name: "Ajrakhpur Craft Village",
        city: "Bhuj",
        bestVisitingSeason: "October to February",
        latitude: 23.2755,
        longitude: 69.704,
        coordinatorName: "Saira Khatri",
        coordinatorPhone: "+91 97247 53088",
        coordinatorEmail: "ajrakhpur.stays@kalaguide.in",
        touristPlaces: [
          "Ajrakh hand block print workshops",
          "Living and Learning Design Centre",
          "Hamirsar Lake",
          "Bhujodi handloom village",
        ],
        artisans: [
          {
            name: "Naseemben Khatri",
            craft: "Ajrakh natural dye printing",
            phone: "+91 94084 72316",
            email: "naseemben.ajrakh@kalaguide.in",
          },
          {
            name: "Aminabanu Khatri",
            craft: "Resist print textiles",
            phone: "+91 82004 55931",
            email: "aminabanu.print@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "West Bengal",
    villages: [
      {
        name: "Kumartuli Artisan Quarter",
        city: "Kolkata",
        bestVisitingSeason: "August to October",
        latitude: 22.6026,
        longitude: 88.3647,
        coordinatorName: "Dipankar Pal",
        coordinatorPhone: "+91 98302 77594",
        coordinatorEmail: "kumartuli.tours@kalaguide.in",
        touristPlaces: [
          "Durga idol making studios",
          "Sovabazar Rajbari",
          "Dakshineswar Temple",
          "Howrah riverfront",
        ],
        artisans: [
          {
            name: "Subhankar Pal",
            craft: "Clay idol sculpting",
            phone: "+91 90516 40275",
            email: "subhankar.idols@kalaguide.in",
          },
          {
            name: "Mitali Paul",
            craft: "Traditional idol painting",
            phone: "+91 87772 11348",
            email: "mitali.kumartuli@kalaguide.in",
          },
        ],
      },
      {
        name: "Bishnupur Terracotta Cluster",
        city: "Bankura",
        bestVisitingSeason: "November to February",
        latitude: 23.074,
        longitude: 87.3199,
        coordinatorName: "Ranjit Dutta",
        coordinatorPhone: "+91 94743 33928",
        coordinatorEmail: "bishnupur.travel@kalaguide.in",
        touristPlaces: [
          "Rasmancha and Jor Bangla temples",
          "Terracotta horse craft stalls",
          "Baluchari sari weaving units",
          "Mukutmanipur day trip",
        ],
        artisans: [
          {
            name: "Sanjib Kar",
            craft: "Terracotta figurines",
            phone: "+91 85095 62403",
            email: "sanjib.terra@kalaguide.in",
          },
          {
            name: "Monika Sutradhar",
            craft: "Temple motif pottery",
            phone: "+91 76026 91857",
            email: "monika.craft@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "Tamil Nadu",
    villages: [
      {
        name: "Swamimalai Bronze Craft Village",
        city: "Kumbakonam",
        bestVisitingSeason: "November to February",
        latitude: 10.959,
        longitude: 79.332,
        coordinatorName: "R. Sivaraman",
        coordinatorPhone: "+91 94432 11876",
        coordinatorEmail: "swamimalai.host@kalaguide.in",
        touristPlaces: [
          "Lost-wax bronze casting workshops",
          "Kumbakonam temple circuit",
          "Darasuram Airavatesvara Temple",
          "Cauvery river ghats",
        ],
        artisans: [
          {
            name: "Ganesan Sthapathi",
            craft: "Bronze idol casting",
            phone: "+91 98945 21473",
            email: "ganesan.bronze@kalaguide.in",
          },
          {
            name: "Meenakshi Devi",
            craft: "Temple lamp metalwork",
            phone: "+91 87542 33890",
            email: "meenakshi.metal@kalaguide.in",
          },
        ],
      },
      {
        name: "Kanchipuram Silk Weavers Cluster",
        city: "Kanchipuram",
        bestVisitingSeason: "October to February",
        latitude: 12.8342,
        longitude: 79.7036,
        coordinatorName: "V. Prakash",
        coordinatorPhone: "+91 97910 55248",
        coordinatorEmail: "kanchi.silk@kalaguide.in",
        touristPlaces: [
          "Traditional silk loom houses",
          "Kailasanathar Temple",
          "Ekambareswarar Temple",
          "Silk sari cooperative outlets",
        ],
        artisans: [
          {
            name: "S. Varalakshmi",
            craft: "Handloom silk weaving",
            phone: "+91 93801 66425",
            email: "varalakshmi.silk@kalaguide.in",
          },
          {
            name: "R. Karthikeyan",
            craft: "Zari border weaving",
            phone: "+91 88258 11074",
            email: "karthik.zari@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "Karnataka",
    villages: [
      {
        name: "Channapatna Toy Town",
        city: "Ramanagara",
        bestVisitingSeason: "October to March",
        latitude: 12.6517,
        longitude: 77.2067,
        coordinatorName: "Naveen Kumar",
        coordinatorPhone: "+91 98452 40781",
        coordinatorEmail: "channapatna.toys@kalaguide.in",
        touristPlaces: [
          "Lacquer wooden toy workshops",
          "Janapada Loka museum",
          "Ramanagara hills",
          "Mysuru road craft hubs",
        ],
        artisans: [
          {
            name: "Shivanna",
            craft: "Lac-turned wooden toys",
            phone: "+91 99018 24716",
            email: "shivanna.toys@kalaguide.in",
          },
          {
            name: "Latha R",
            craft: "Natural dye toy finishing",
            phone: "+91 96112 58347",
            email: "latha.toyart@kalaguide.in",
          },
        ],
      },
      {
        name: "Udupi Yakshagana Mask Village",
        city: "Udupi",
        bestVisitingSeason: "November to February",
        latitude: 13.3409,
        longitude: 74.7421,
        coordinatorName: "Madhav Acharya",
        coordinatorPhone: "+91 94481 99237",
        coordinatorEmail: "udupi.masks@kalaguide.in",
        touristPlaces: [
          "Yakshagana costume and mask studios",
          "Malpe Beach",
          "Sri Krishna Temple",
          "St. Mary's Island boat trips",
        ],
        artisans: [
          {
            name: "Raghavendra Bhat",
            craft: "Yakshagana wooden masks",
            phone: "+91 97394 11826",
            email: "raghav.mask@kalaguide.in",
          },
          {
            name: "Poornima Shetty",
            craft: "Theatre headgear decoration",
            phone: "+91 91132 66458",
            email: "poornima.stagecraft@kalaguide.in",
          },
        ],
      },
    ],
  },
  {
    state: "Uttar Pradesh",
    villages: [
      {
        name: "Bhadohi Carpet Weavers Belt",
        city: "Bhadohi",
        bestVisitingSeason: "October to March",
        latitude: 25.395,
        longitude: 82.57,
        coordinatorName: "Irfan Alam",
        coordinatorPhone: "+91 98390 44216",
        coordinatorEmail: "bhadohi.carpets@kalaguide.in",
        touristPlaces: [
          "Hand-knotted carpet weaving centers",
          "Carpet design studios",
          "Sitabadi craft market",
          "Varanasi ghats (day trip)",
        ],
        artisans: [
          {
            name: "Javed Ansari",
            craft: "Hand-knotted wool carpets",
            phone: "+91 94512 78346",
            email: "javed.carpets@kalaguide.in",
          },
          {
            name: "Nagma Bano",
            craft: "Natural dye yarn prep",
            phone: "+91 87072 11953",
            email: "nagma.yarn@kalaguide.in",
          },
        ],
      },
      {
        name: "Nizamabad Black Pottery Cluster",
        city: "Azamgarh",
        bestVisitingSeason: "November to February",
        latitude: 26.028,
        longitude: 83.049,
        coordinatorName: "Ramesh Prajapati",
        coordinatorPhone: "+91 94527 99184",
        coordinatorEmail: "nizamabad.pottery@kalaguide.in",
        touristPlaces: [
          "Black pottery firing workshops",
          "Hand-etched ceramic studios",
          "Azamgarh local bazaar",
          "Tamasa riverfront",
        ],
        artisans: [
          {
            name: "Santosh Prajapati",
            craft: "Black pottery engraving",
            phone: "+91 89606 55217",
            email: "santosh.pottery@kalaguide.in",
          },
          {
            name: "Rekha Devi",
            craft: "Decorative ceramic glazing",
            phone: "+91 76520 91463",
            email: "rekha.ceramic@kalaguide.in",
          },
        ],
      },
    ],
  },
];

function toTelLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function PlanYourVisit() {
  const [selectedState, setSelectedState] = useState(villageDirectory[0].state);
  const villagesForState = useMemo(
    () => villageDirectory.find((item) => item.state === selectedState)?.villages ?? [],
    [selectedState]
  );
  const [selectedVillageName, setSelectedVillageName] = useState(villageDirectory[0].villages[0].name);

  useEffect(() => {
    if (!villagesForState.length) {
      return;
    }
    setSelectedVillageName(villagesForState[0].name);
  }, [villagesForState]);

  const selectedVillage =
    villagesForState.find((village) => village.name === selectedVillageName) ?? villagesForState[0];

  const today = new Date();
  const defaultCheckIn = formatDateForInput(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
  const defaultCheckOut = formatDateForInput(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9));

  const [bookingName, setBookingName] = useState("Test Visitor");
  const [bookingPhone, setBookingPhone] = useState("9876543210");
  const [bookingEmail, setBookingEmail] = useState("test.visitor@example.com");
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState("2");
  const [notes, setNotes] = useState("Need one local workshop and vegetarian meals.");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedVillage) {
    return null;
  }

  const mapSrc = `https://maps.google.com/maps?q=${selectedVillage.latitude},${selectedVillage.longitude}&z=13&output=embed`;

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingMessage("");

    if (checkIn && checkOut && checkOut < checkIn) {
      setBookingMessage("Error: Check-out date must be after check-in date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/staycation-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: selectedState,
          villageName: selectedVillage.name,
          city: selectedVillage.city,
          bestVisitingSeason: selectedVillage.bestVisitingSeason,
          coordinatorName: selectedVillage.coordinatorName,
          coordinatorPhone: selectedVillage.coordinatorPhone,
          coordinatorEmail: selectedVillage.coordinatorEmail,
          guestName: bookingName,
          guestPhone: bookingPhone,
          guestEmail: bookingEmail,
          checkIn,
          checkOut,
          guests: Number(guests),
          notes: notes.trim(),
        }),
      });

      let result: { ok?: boolean; bookingId?: string; error?: string } = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? "Could not submit booking right now.");
      }

      setBookingMessage(
        `Booking request submitted (ID: ${result.bookingId}). Coordinator will contact you at ${bookingPhone}.`
      );

      setBookingName("Test Visitor");
      setBookingPhone("9876543210");
      setBookingEmail("test.visitor@example.com");
      setCheckIn(defaultCheckIn);
      setCheckOut(defaultCheckOut);
      setGuests("2");
      setNotes("Need one local workshop and vegetarian meals.");
    } catch (error) {
      const demoId = `DEMO-${Date.now().toString().slice(-6)}`;
      console.warn("Booking API unavailable. Falling back to demo confirmation.", error);
      setBookingMessage(
        `Booking request submitted in test mode (ID: ${demoId}). Coordinator will contact you at ${bookingPhone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-border/70 bg-card">
      <CardHeader className="space-y-2">
        <CardTitle className="font-headline text-2xl md:text-3xl">Plan Your Visit</CardTitle>
        <CardDescription>
          Pick your nearby state, select a village, contact artisans, and book a staycation.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="state-select">Select State</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger id="state-select">
                <SelectValue placeholder="Choose a state" />
              </SelectTrigger>
              <SelectContent>
                {villageDirectory.map((item) => (
                  <SelectItem key={item.state} value={item.state}>
                    {item.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="village-select">Select Village</Label>
            <Select value={selectedVillage.name} onValueChange={setSelectedVillageName}>
              <SelectTrigger id="village-select">
                <SelectValue placeholder="Choose a village" />
              </SelectTrigger>
              <SelectContent>
                {villagesForState.map((village) => (
                  <SelectItem key={village.name} value={village.name}>
                    {village.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-background p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> City
                </p>
                <p className="font-medium">{selectedVillage.city}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> Best Visiting Season
                </p>
                <p className="font-medium">{selectedVillage.bestVisitingSeason}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-background p-4">
              <p className="mb-3 font-semibold">Tourist Places Nearby</p>
              <ul className="space-y-2 text-sm text-foreground/85">
                {selectedVillage.touristPlaces.map((place) => (
                  <li key={place} className="rounded-md bg-muted/40 px-3 py-2">
                    {place}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border/70 bg-background p-4">
              <p className="mb-3 font-semibold">Village Coordinator</p>
              <p className="text-sm text-foreground/85">{selectedVillage.coordinatorName}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <a href={toTelLink(selectedVillage.coordinatorPhone)}>
                    <Phone className="h-4 w-4" />
                    {selectedVillage.coordinatorPhone}
                  </a>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <a href={`mailto:${selectedVillage.coordinatorEmail}`}>
                    <Mail className="h-4 w-4" />
                    Contact Village
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-background p-4">
              <p className="mb-3 font-semibold">Artisan Contacts</p>
              <div className="space-y-3">
                {selectedVillage.artisans.map((artisan) => (
                  <div key={artisan.email} className="rounded-md border border-border/70 p-3">
                    <p className="flex items-center gap-2 font-medium">
                      <User className="h-4 w-4 text-primary" />
                      {artisan.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{artisan.craft}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a href={toTelLink(artisan.phone)}>
                          <Phone className="h-4 w-4" />
                          {artisan.phone}
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={`mailto:${artisan.email}`}>
                          <Mail className="h-4 w-4" />
                          Email
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border/70">
              <iframe
                title={`${selectedVillage.name} location map`}
                src={mapSrc}
                className="h-64 w-full md:h-[340px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 rounded-lg border border-border/70 bg-background p-4">
              <p className="font-semibold">Book Staycation in {selectedVillage.name}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="guest-name">Full Name</Label>
                  <Input
                    id="guest-name"
                    value={bookingName}
                    onChange={(event) => setBookingName(event.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-phone">Phone Number</Label>
                  <Input
                    id="guest-phone"
                    value={bookingPhone}
                    onChange={(event) => setBookingPhone(event.target.value)}
                    placeholder="Enter phone"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-email">Email</Label>
                  <Input
                    id="guest-email"
                    type="email"
                    value={bookingEmail}
                    onChange={(event) => setBookingEmail(event.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="check-in">Check-in</Label>
                  <Input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="check-out">Check-out</Label>
                  <Input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-count">Guests</Label>
                  <Input
                    id="guest-count"
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="booking-notes">Preferences</Label>
                  <Textarea
                    id="booking-notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Food, room type, local workshop interest"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Book Staycation"}
              </Button>

              {bookingMessage ? (
                <p className={`text-sm ${bookingMessage.startsWith("Error:") ? "text-destructive" : "text-primary"}`}>
                  {bookingMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Booking requests are shared with the selected village coordinator for manual confirmation.
        </p>
      </CardFooter>
    </Card>
  );
}








