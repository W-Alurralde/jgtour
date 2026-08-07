export interface RoomOccupancy {
  id: number;
  adults: number;
  children: number;
}

export interface HotelSearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: RoomOccupancy[];
  voucher?: string;
}