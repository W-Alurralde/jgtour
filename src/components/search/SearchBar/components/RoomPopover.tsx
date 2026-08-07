import { useState } from "react";
import type { RoomOccupancy } from "@/features/hotels/types/hotelSearch.types";

interface Props {
  initialRooms?: RoomOccupancy[];
  onApply: (rooms: RoomOccupancy[]) => void;
}

export default function RoomPopover({ initialRooms, onApply }: Props) {
  const [rooms, setRooms] = useState<RoomOccupancy[]>(
    initialRooms ?? [
      { id: 1, adults: 2, children: 0 },
    ]
  );

  const updateRoom = (
    roomId: number,
    field: "adults" | "children",
    value: number
  ) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              [field]: Math.max(0, value),
            }
          : room
      )
    );
  };

  const addRoom = () => {
    if (rooms.length >= 3) return;

    setRooms((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        adults: 1,
        children: 0,
      },
    ]);
  };

  const removeRoom = (roomId: number) => {
    if (rooms.length === 1) return;

    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  return (
    <div className="travelers-popover">
      <h3>Habitaciones</h3>

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "1rem",
            display: "grid",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Habitación {room.id}</strong>

            {rooms.length > 1 && (
              <button
                type="button"
                onClick={() => removeRoom(room.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#dc2626",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="popover-row">
            <span>Adultos</span>

            <div className="counter">
              <button
                type="button"
                onClick={() =>
                  updateRoom(room.id, "adults", room.adults - 1)
                }
              >
                −
              </button>

              <strong>{room.adults}</strong>

              <button
                type="button"
                onClick={() =>
                  updateRoom(room.id, "adults", room.adults + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="popover-row">
            <span>Menores</span>

            <div className="counter">
              <button
                type="button"
                onClick={() =>
                  updateRoom(room.id, "children", room.children - 1)
                }
              >
                −
              </button>

              <strong>{room.children}</strong>

              <button
                type="button"
                onClick={() =>
                  updateRoom(room.id, "children", room.children + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRoom}
        disabled={rooms.length >= 3}
        style={{
          border: "1px dashed #94a3b8",
          background: "transparent",
          borderRadius: 14,
          padding: "0.85rem 1rem",
          fontWeight: 600,
          cursor: rooms.length >= 3 ? "not-allowed" : "pointer",
        }}
      >
        + Añadir habitación
      </button>

      <button
        className="apply-btn"
        type="button"
        onClick={() => onApply(rooms)}
      >
        Aplicar
      </button>
    </div>
  );
}