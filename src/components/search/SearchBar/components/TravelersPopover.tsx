import type {
  AssistanceType,
  CabinClass,
} from "@/features/flights/types/flightSearch.types";

interface TravelersData {
  adults: number;
  children: number;
  infants: number;
  pets: number;

  cabinClass: CabinClass;

  needsAssistance: boolean;
  assistanceType: AssistanceType | "";
}

interface Props extends TravelersData {
  onChange: (data: TravelersData) => void;
  onApply: () => void;
}

export default function TravelersPopover(props: Props) {
  // =========================================
  // ACTUALIZAR CONTADORES
  // =========================================

  const updateCounter = (
    key: "adults" | "children" | "infants" | "pets",
    value: number,
  ) => {
    let finalValue = Math.max(0, value);

    // Debe existir al menos un adulto
    if (key === "adults") {
      finalValue = Math.max(1, finalValue);
    }

    props.onChange({
      adults: props.adults,
      children: props.children,
      infants: props.infants,
      pets: props.pets,

      cabinClass: props.cabinClass,

      needsAssistance: props.needsAssistance,
      assistanceType: props.assistanceType,

      [key]: finalValue,
    });
  };

  // =========================================
  // ACTUALIZAR CLASE
  // =========================================

  const updateCabinClass = (cabinClass: CabinClass) => {
    props.onChange({
      adults: props.adults,
      children: props.children,
      infants: props.infants,
      pets: props.pets,

      cabinClass,

      needsAssistance: props.needsAssistance,
      assistanceType: props.assistanceType,
    });
  };

  // =========================================
  // ACTUALIZAR ASISTENCIA
  // =========================================

  const updateAssistance = (checked: boolean) => {
    props.onChange({
      adults: props.adults,
      children: props.children,
      infants: props.infants,
      pets: props.pets,

      cabinClass: props.cabinClass,

      needsAssistance: checked,

      assistanceType: checked ? props.assistanceType : "",
    });
  };

  // =========================================
  // ACTUALIZAR TIPO DE ASISTENCIA
  // =========================================

  const updateAssistanceType = (assistanceType: AssistanceType | "") => {
    props.onChange({
      adults: props.adults,
      children: props.children,
      infants: props.infants,
      pets: props.pets,

      cabinClass: props.cabinClass,

      needsAssistance: props.needsAssistance,
      assistanceType,
    });
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="travelers-popover">
      <h3>Viajeros y clase</h3>

      {/* =====================================
          ADULTOS
      ====================================== */}

      <div className="popover-row">
        <div>
          <strong>Adultos</strong>

          <small>&gt; 12 años</small>
        </div>

        <div className="counter">
          <button
            type="button"
            onClick={() => updateCounter("adults", props.adults - 1)}
          >
            −
          </button>

          <strong>{props.adults}</strong>

          <button
            type="button"
            onClick={() => updateCounter("adults", props.adults + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* =====================================
          NIÑOS
      ====================================== */}

      <div className="popover-row">
        <div>
          <strong>Niños</strong>

          <small>2 a 12 años</small>
        </div>

        <div className="counter">
          <button
            type="button"
            onClick={() => updateCounter("children", props.children - 1)}
          >
            −
          </button>

          <strong>{props.children}</strong>

          <button
            type="button"
            onClick={() => updateCounter("children", props.children + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* =====================================
          BEBÉS
      ====================================== */}

      <div className="popover-row">
        <div>
          <strong>Bebés</strong>

          <small>&lt; 2 años</small>
        </div>

        <div className="counter">
          <button
            type="button"
            onClick={() => updateCounter("infants", props.infants - 1)}
          >
            −
          </button>

          <strong>{props.infants}</strong>

          <button
            type="button"
            onClick={() => updateCounter("infants", props.infants + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* =====================================
          MASCOTAS
      ====================================== */}

      <div className="popover-row">
        <div>
          <strong>Mascotas</strong>

          <small>Sujeto a condiciones de la aerolínea</small>
        </div>

        <div className="counter">
          <button
            type="button"
            onClick={() => updateCounter("pets", props.pets - 1)}
          >
            −
          </button>

          <strong>{props.pets}</strong>

          <button
            type="button"
            onClick={() => updateCounter("pets", props.pets + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* =====================================
          CLASE
      ====================================== */}

      <div className="popover-class">
        <label htmlFor="cabin-class">Clase</label>

        <select
          id="cabin-class"
          value={props.cabinClass}
          onChange={(event) => {
            updateCabinClass(event.target.value as CabinClass);
          }}
        >
          <option value="economy">Económica</option>

          <option value="premium-economy">Premium Economy</option>

          <option value="business">Ejecutiva / Business</option>

          <option value="first">Primera clase</option>
        </select>
      </div>

      {/* =====================================
    ASISTENCIA ESPECIAL
====================================== */}

      <div className="assistance-section">
        <div className="assistance-row">
          <label className="assistance-checkbox">
            <input
              type="checkbox"
              checked={props.needsAssistance}
              onChange={(event) => {
                updateAssistance(event.target.checked);
              }}
            />

            <span>Necesita asistencia</span>

            <span
              className="assistance-info"
              title="Indique si algún pasajero necesita asistencia especial durante el embarque, conexión o desembarque. Por ejemplo: silla de ruedas, muletas o asistencia por movilidad reducida."
            >
              ⓘ
            </span>
          </label>

          {props.needsAssistance && (
            <select
              className="assistance-select"
              value={props.assistanceType}
              aria-label="Tipo de asistencia"
              onChange={(event) => {
                updateAssistanceType(event.target.value as AssistanceType | "");
              }}
            >
              <option value="">Seleccionar asistencia</option>

              <option value="wheelchair">Silla de ruedas</option>

              <option value="reduced-mobility">Movilidad reducida</option>

              <option value="crutches">Uso de muletas</option>

              <option value="boarding-assistance">
                Embarque / desembarque
              </option>

              <option value="visual-assistance">Asistencia visual</option>

              <option value="hearing-assistance">Asistencia auditiva</option>

              <option value="other">Otra</option>
            </select>
          )}
        </div>
      </div>

      {/* =====================================
          APLICAR
      ====================================== */}

      <button className="apply-btn" type="button" onClick={props.onApply}>
        Aplicar
      </button>
    </div>
  );
}
