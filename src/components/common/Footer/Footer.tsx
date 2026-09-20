import { Camera, Compass, Heart } from "lucide-react";

import NewsletterForm from "./NewsletterForm";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="jg-footer">
      <div className="jg-footer-container">
        {/* ================================
            NEWSLETTER / HERO
        ================================= */}

        <section className="footer-newsletter">
          <img
            src="/playa_fo.png"
            alt=""
            className="footer-beach"
            aria-hidden="true"
          />

          <img
            src="/tarjeta.png"
            alt="JGTravel"
            className="footer-card-image"
          />

          <NewsletterForm />

          <img
            src="/slogan_fo.png"
            alt="Tu próxima aventura comienza aquí"
            className="footer-slogan"
          />
        </section>

        {/* ================================
            CONTENIDO PRINCIPAL
        ================================= */}

        <div className="footer-main">
          {/* JGTRAVEL */}

          <section className="footer-brand">
            <img src="/logo_fo.png" alt="JGTravel" className="footer-logo" />

            <p className="footer-description">
              Somos una agencia de viajes y experiencias que conecta personas
              con destinos, culturas y momentos únicos en todo el mundo.
            </p>

            <div className="footer-values">
              <div>
                <Compass aria-hidden="true" />
                <span>Explorá</span>
              </div>

              <div>
                <Heart aria-hidden="true" />
                <span>Viví</span>
              </div>

              <div>
                <Camera aria-hidden="true" />
                <span>Compartí</span>
              </div>
            </div>
          </section>

          {/* SERVICIOS */}

          <nav className="footer-column" aria-label="Servicios">
            <h3>Servicios</h3>

            <a href="/vuelos">Vuelos</a>
            <a href="/hoteles">Hoteles</a>
            <a href="/autos">Autos</a>
            <a href="/experiencias">Experiencias</a>
            <a href="/paquetes">Paquetes</a>
            <a href="/asistencia">Asistencia al viajero</a>
          </nav>

          {/* EMPRESA */}

          <nav className="footer-column" aria-label="Empresa">
            <h3>Empresa</h3>

            <a href="/nosotros">Nosotros</a>
            <a href="/trabaja-con-nosotros">Trabajá con nosotros</a>
            <a href="/prensa">Prensa</a>
            <a href="/novedades">Novedades</a>
            <a href="/contacto">Contacto</a>
          </nav>

          {/* RECURSOS */}

          <nav className="footer-column" aria-label="Recursos">
            <h3>Recursos</h3>

            <a href="/blog">Blog</a>
            <a href="/guias">Guías de viaje</a>
            <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
            <a href="/ayuda">Centro de ayuda</a>
            <a href="/consejos">Consejos de viaje</a>
          </nav>

          {/* LEGAL */}

          <nav className="footer-column" aria-label="Legal">
            <h3>Legal</h3>

            <a href="/terminos">Términos y condiciones</a>

            <a href="/privacidad">Política de privacidad</a>

            <a href="/cookies">Política de cookies</a>

            <a href="/licencias">Licencias</a>

            <a href="/configuracion">Configuración</a>

            <a href="/contacto-legal">Contacto legal</a>
          </nav>
        </div>

        {/* ================================
            INFORMACIÓN FISCAL
        ================================= */}

        <section className="footer-fiscal">
          <div className="footer-arca">
            <img src="/arca.png" alt="Información fiscal ARCA" />
          </div>

          <div className="footer-fiscal-data">
            <h3>Información fiscal</h3>

            <p>Agencia de Recaudación y Control Aduanero (ARCA)</p>

            <p>
              <strong>CUIT:</strong> 20-28886912-0
            </p>

            <p>
              <strong>Habilitación Agencia de Viajes:</strong> Leg. N° 123456
            </p>

            <p>Consultá nuestros datos fiscales en el QR.</p>
          </div>

          {/* REDES */}

          <div
            className="footer-social"
            aria-label="Redes sociales de JGTravel"
          >
            <a href="#" aria-label="X" title="X">
              <i className="fa-brands fa-x-twitter" />
            </a>

            <a href="#" aria-label="LinkedIn" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>

            <a href="#" aria-label="Facebook" title="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>

            <a href="#" aria-label="TikTok" title="TikTok">
              <i className="fa-brands fa-tiktok" />
            </a>

            <a href="#" aria-label="Instagram" title="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>

          <div className="footer-together">
            <span>Viajemos juntos</span>
            <Heart size={18} />
          </div>
        </section>

        {/* ================================
            BARRA INFERIOR
        ================================= */}

        <div className="footer-bottom">
          <p>© {currentYear} JGTravel. Todos los derechos reservados.</p>

          <p>Diseñando hoy los viajes de mañana.</p>
        </div>
      </div>
    </footer>
  );
}
