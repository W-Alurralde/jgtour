import "./WhatsAppFloatingButton.css";

interface Props {
  userName?: string;
}

export default function WhatsAppFloatingButton({ userName }: Props) {
  const phone = "5493874847300";

  const greeting = userName?.trim()
    ? `Hola, mi nombre es ${userName.trim()}.`
    : "Hola, estoy visitando JGTravel.";

  const message =
    `${greeting} Quisiera recibir asesoramiento ` +
    "sobre viajes, escapadas y experiencias turísticas. " +
    "¿Podrían ayudarme?";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-button"
      aria-label="Consultar por WhatsApp"
      title="Consultanos por WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
    </a>
  );
}
