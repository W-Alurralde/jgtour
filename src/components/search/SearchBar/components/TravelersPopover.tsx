import type { CabinClass } from "@/features/flights/types/flightSearch.types";

interface Props {
  adults: number;
  children: number;
  pets: number;
  cabinClass: "economy";
  onChange: (data: {
    adults: number;
    children: number;
    pets: number;
    cabinClass: "economy";
  }) => void;
  onApply: () => void;
}

export default function TravelersPopover(props: Props) {
  const update = (key: "adults" | "children" | "pets", value: number) => {
    props.onChange({
      ...props,
      [key]: Math.max(0, value),
    });
  };

  return (
    <div className="travelers-popover">
      <h3>Viajeros y clase</h3>

      <div className="popover-row">
        <span>Adultos</span>
        <div className="counter">
          <button type="button" onClick={() => update("adults", props.adults - 1)}>−</button>
          <strong>{props.adults}</strong>
          <button type="button" onClick={() => update("adults", props.adults + 1)}>+</button>
        </div>
      </div>

      <div className="popover-row">
        <span>Niños</span>
        <div className="counter">
          <button type="button" onClick={() => update("children", props.children - 1)}>−</button>
          <strong>{props.children}</strong>
          <button type="button" onClick={() => update("children", props.children + 1)}>+</button>
        </div>
      </div>

      <div className="popover-row">
        <span>Mascotas</span>
        <div className="counter">
          <button type="button" onClick={() => update("pets", props.pets - 1)}>−</button>
          <strong>{props.pets}</strong>
          <button type="button" onClick={() => update("pets", props.pets + 1)}>+</button>
        </div>
      </div>

      <div className="popover-class">
        <label>Clase</label>
        <select defaultValue="economy">
          <option value="economy">Económica</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Ejecutiva / Business</option>
          <option value="first">Primera clase</option>
        </select>
      </div>

      <button className="apply-btn" type="button" onClick={props.onApply}>
        Aplicar
      </button>
    </div>
  );
}