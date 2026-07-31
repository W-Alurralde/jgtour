import type { HotelResult } from "../types/hotel";

export const mockHotels: HotelResult[] = [
  {
    id: "h1",
    name: "Alejandro I Hotel",
    city: "Salta",
    rating: 5,
    pricePerNight: 145000,
    currency: "ARS",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    deepLink: "https://www.travelpayouts.com/hotels",
  },
  {
    id: "h2",
    name: "Hotel Salta",
    city: "Salta",
    rating: 4,
    pricePerNight: 92000,
    currency: "ARS",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    deepLink: "https://www.travelpayouts.com/hotels",
  },
];