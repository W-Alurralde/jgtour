## Organizacion de Integraciones 

04-Integrations.md

1. Transporte
   - Amadeus
   - Busbud
   - CarTrawler

2. Hospedaje
   - Amadeus
   - HotelBeds (futuro)

3. Gastronomía
   - Google Places
   - Foursquare

4. Clima
   - OpenWeather

5. Mapas
   - OpenStreetMap
   - Leaflet

6. Pagos
   - Mercado Pago

7. Autenticación
   - Firebase

8. Imágenes
   - Pexels
   - Unsplash

9. Seguros
   - Cover Genius
   - Allianz Partners
   - AXA Partners

10. Backoffice
   - Dolibarr



## 4\. APIS PREVISTAS (INTEGRACIÓN DEL ECOSISTEMA)

Para consolidar a ****JGTravel**** como una plataforma transaccional e inmersiva \[Roadmap\], el backend y frontend se conectarán con servicios globales líderes en el sector __TravelTech__ \[Roadmap\]. Todas estas integraciones se concentran y unifican durante el ****Sprint 4**** \[Roadmap\]:

### ✈️ 1. Amadeus API

-   ****Propósito Técnico:**** Conector principal con el GDS (Sistema de Distribución Global).
-   ****Funcionalidad en la Plataforma:**** Permite la búsqueda, comparación de tarifas, consulta de disponibilidad en tiempo real y la simulación de reserva de ****vuelos y hoteles**** a lo largo de toda Latinoamérica \[Roadmap\]. Es el motor que impulsa la escalabilidad internacional del proyecto \[Roadmap\].

### 🗺️ 2. OpenStreetMap + Leaflet (API de Mapas)

-   ****Propósito Técnico:**** Motor de renderizado cartográfico de código abierto y cliente de mapas interactivo.
-   ****Funcionalidad en la Plataforma:**** Es la base de nuestras ****herramientas inmersivas****. Permitirá al usuario visualizar geolocalizadamente las rutas del vino en Salta, la ubicación exacta de hoteles, puntos de encuentro para turismo educativo y trazas de transporte \[Roadmap\]. Se prefiere sobre soluciones pagas por su rendimiento, nulo costo de escalabilidad y flexibilidad de personalización visual.

### ☀️ 3. OpenWeather API

-   ****Propósito Técnico:**** Servicio meteorológico global en tiempo real y predictivo.
-   ****Funcionalidad en la Plataforma:**** Crucial para la planificación de experiencias al aire libre (enoturismo en los valles, excursiones locales y viajes educativos) \[Roadmap\]. Muestra al usuario las condiciones climáticas actuales de su destino y alertas meteorológicas antes de confirmar una reserva.

### 📍 4. Foursquare / Google Places API

-   ****Propósito Técnico:**** Proveedor de datos de geolocalización de puntos de interés (POI).
-   ****Funcionalidad en la Plataforma:**** Alimenta la sección de ****gastronomía, experiencias turísticas y comercios locales**** \[Roadmap\]. Extrae de forma dinámica información crítica como nombres de restaurantes, reseñas, fotografías, horarios de apertura y direcciones para enriquecer las guías de viaje autogestionadas.

### 📸 5. Pexels API

-   ****Propósito Técnico:**** Repositorio dinámico de imágenes y video de stock de alta calidad.
-   ****Funcionalidad en la Plataforma:**** Automatiza el contenido visual de la aplicación. Cuando un usuario busque un destino o experiencia que no cuente con material propio cargado en el ERP (Dolibarr), la plataforma consumirá imágenes en alta resolución de forma dinámica para mantener una interfaz atractiva, inmersiva y moderna sin sobrecargar el almacenamiento del servidor \[Roadmap\].
