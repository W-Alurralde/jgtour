export interface TravelPackage {
  id: string;
  name: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  nights: number;
  hotel: string;
  hotelCategory: number;
  experience: string;
  price: number;
  currency: string;
  image: string;
  flightSearch: string;
  hotelSearch: string;
  active: boolean;
  updatedAt: string;
}

export interface PackagesResponse {
  success: boolean;
  packages: TravelPackage[];
  error?: string;
}