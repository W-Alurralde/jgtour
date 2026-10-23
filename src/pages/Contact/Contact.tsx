import { useState, type FormEvent } from "react";
import "./Contact.css";
import GroupTravelBanner from "./GroupTravelBanner";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mailSubject = `CONSULTA WEB - ${subject.trim()}`;
    const mailBody =
      `Correo del visitante: ${email}\n\n` + `Consulta:\n${message}`;

    const mailto =
      `mailto:jgtravel.sla@gmail.com?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailto;
  };

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <span>ESTAMOS PARA AYUDARTE</span>
        <h1>Contactá con JGTravel</h1>
        <p>
          Tu próximo viaje comienza con una buena conversación. Consultanos por
          vuelos, alojamientos, escapadas y experiencias turísticas.
        </p>
      </header>
      <GroupTravelBanner />

      <div className="contact-grid">
        <section className="contact-info">
          <h2>Nuestra agencia</h2>

          <div className="contact-detail">
            <i className="fa-solid fa-location-dot" />
            <div>
              <strong>JG Travel · Salta Capital</strong>
              <p>
                Mz 476A, Casa 16
                <br />
                Barrio El Huaico
                <br />
                Salta, Argentina
              </p>
              <a
                href="https://maps.app.goo.gl/MHCUtXzSxT4JaFdV7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver ubicación en Google Maps
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <i className="fa-solid fa-envelope" />
            <div>
              <strong>Correo electrónico</strong>
              <a href="mailto:jgtravel.sla@gmail.com">jgtravel.sla@gmail.com</a>
            </div>
          </div>

          <div className="contact-detail">
            <i className="fa-brands fa-whatsapp" />
            <div>
              <strong>WhatsApp</strong>
              <a
                href="https://wa.me/5493874847300"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 9 3874 847 300
              </a>
            </div>
          </div>

          <div className="contact-map">
            <h3>Encontranos en Salta</h3>
            <p>Barrio El Huaico, Salta Capital.</p>
            <a
              href="https://maps.app.goo.gl/MHCUtXzSxT4JaFdV7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-map-location-dot" /> Abrir mapa y
              obtener indicaciones
            </a>
          </div>
        </section>

        <section className="contact-form-card">
          <h2>Envianos tu consulta</h2>
          <p>Contanos qué viaje o experiencia estás buscando.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="contact-email">Correo electrónico</label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@correo.com"
              required
            />

            <label htmlFor="contact-subject">Asunto</label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Ej. Excursión a Cafayate"
              maxLength={120}
              required
            />

            <label htmlFor="contact-message">Tu consulta</label>
            <textarea
              id="contact-message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Contanos cómo podemos ayudarte..."
              required
            />

            <button type="submit">
              <i className="fa-solid fa-paper-plane" /> Preparar consulta
            </button>

            <small>
              Se abrirá tu aplicación de correo para revisar y enviar el
              mensaje.
            </small>
          </form>
        </section>
      </div>
    </main>
  );
}
