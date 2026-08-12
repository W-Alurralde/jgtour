import { featuredExperiences } from "../data/featuredExperiences";
import "./FeaturedExperiences.css";

export default function FeaturedExperiences() {
  return (
    <section className="experiences-section">
      <div className="section-header">
        <h2>Experiencias destacadas</h2>
        <p>
          Selección curada de aventuras, escapadas y actividades premium de
          JGTravel.
        </p>
      </div>

      <div className="experiences-grid">
        {featuredExperiences.map((experience) => (
          <article key={experience.id} className="experience-card">
            <img src={experience.image} alt={experience.title} />

            <div className="experience-content">
              <span>{experience.location}</span>
              <h3>{experience.title}</h3>

              <div className="experience-footer">
                <strong>Desde {experience.price}</strong>
                <button>Ver más</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}