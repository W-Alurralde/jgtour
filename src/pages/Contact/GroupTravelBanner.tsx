
import { useState, type FormEvent } from "react";
import "./GroupTravelBanner.css";

type GroupType = "Estudio" | "Turismo" | "Negocios";

export default function GroupTravelBanner() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passengers, setPassengers] = useState(11);
  const [type, setType] = useState<GroupType>("Turismo");
  const [organization, setOrganization] = useState("");
  const [observations, setObservations] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passengers < 11) return;

    const subject = `CONSULTA WEB - VIAJE GRUPAL - ${type}`;

    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Cantidad de pasajeros: ${passengers}`,
      `Motivo del viaje: ${type}`,
      `Institución o empresa: ${organization || "No indicada"}`,
      "",
      "Observaciones:",
      observations || "Sin observaciones",
    ].join("\n");

    window.location.href =
      `mailto:jgtravel.sla@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <section className="group-banner">
        <div className="group-banner__content">
          <span>JGTRAVEL · VIAJES GRUPALES</span>
          <h2>Viajar juntos es vivir más</h2>
          <p>
            Organizamos viajes de estudio, turismo y negocios
            para grupos de más de 10 personas.
            Experiencias personalizadas y asesoramiento.
          </p>

          <button type="button" onClick={() => setOpen(true)}>
            Consultar viaje grupal
          </button>
        </div>
      </section>

      {open && (
        <div
          className="group-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <section
            className="group-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-modal-title"
          >
            <div className="group-modal__header">
              <h2 id="group-modal-title">
                Cotizá tu viaje grupal
              </h2>
              <button
                type="button"
                aria-label="Cerrar formulario"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <p>
              Completá los datos de tu grupo.
              Nuestro equipo te ayudará a organizar el viaje.
            </p>

            <form onSubmit={submit}>
              <label htmlFor="group-name">
                Nombre del responsable
              </label>
              <input
                id="group-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre y apellido"
              />

              <label htmlFor="group-email">
                Correo electrónico
              </label>
              <input
                id="group-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.com"
              />

              <label htmlFor="group-passengers">
                Cantidad de pasajeros
              </label>
              <input
                id="group-passengers"
                type="number"
                min={11}
                required
                value={passengers}
                onChange={(e) =>
                  setPassengers(Number(e.target.value))
                }
              />

              <label htmlFor="group-type">
                Motivo del viaje
              </label>
              <select
                id="group-type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as GroupType)
                }
              >
                <option value="Estudio">Estudio</option>
                <option value="Turismo">Turismo</option>
                <option value="Negocios">Negocios</option>
              </select>

              <label htmlFor="group-organization">
                Institución o empresa
              </label>
              <input
                id="group-organization"
                value={organization}
                onChange={(e) =>
                  setOrganization(e.target.value)
                }
                placeholder="Nombre de institución o empresa"
              />

              <label htmlFor="group-observations">
                Observaciones
              </label>
              <textarea
                id="group-observations"
                rows={4}
                value={observations}
                onChange={(e) =>
                  setObservations(e.target.value)
                }
                placeholder="Destino, fechas estimadas, necesidades especiales..."
              />

              <button className="group-modal__submit" type="submit">
                Preparar consulta grupal
              </button>
              <small>
                Se abrirá tu aplicación de correo para enviar
                la solicitud. Todavía no es un envío automático.
              </small>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
