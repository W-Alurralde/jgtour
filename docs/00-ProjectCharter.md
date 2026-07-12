# ****JGTravel****

# ****Plataforma Web de Turismo****

## ****Objetivo****

__Establecer la estructura organizacional, funciones específicas y líneas de autoridad de la empresa, consolidando nuestra trayectoria familiar en la Provincia de Salta como referentes en la gestión del turismo. El manual busca estandarizar la creación de experiencias innovadoras en turismo local, enoturismo, educativo y empresarial, integrando herramientas tecnológicas inmersivas para garantizar la excelencia operativa y la máxima satisfacción del cliente.__

  

## ****Alcance****

__Las disposiciones de este documento son de aplicación obligatoria para todo el personal de la organización, abarcando los niveles directivos, administrativos y operativos. Su cumplimiento guía el diseño, comercialización y ejecución de todas nuestras líneas de negocio (enoturismo, turismo corporativo, programas educativos y turismo local), así como la implementación y gestión de las herramientas tecnológicas aplicadas a la experiencia del viajero.__

  

## Tecnologías principales

### ****El Mercado Tecnológico Actual en el Sector Turismo****

-   ****Velocidad de carga es conversión:**** Un retraso de un segundo en la carga web puede reducir las conversiones hoteleras y de reservas hasta en un 20%. Las páginas pesadas ya no son una opción.
-   ****Mobile-First y Reactividad:**** Los viajeros reservan cada vez más desde dispositivos móviles mientras están en viaje, exigiendo interfaces fluidas que se sientan como una app nativa.
-   ****Centralización de Datos (APIs):**** Las plataformas modernas ya no guardan toda la información en servidores propios; actúan como "agregadores inteligentes" que consumen datos en tiempo real (vuelos, clima, mapas) y los muestran de forma unificada.

### ****Justificación Técnica de las Elecciones del Roadmap****

-   ****⚛️ Frontend**** ****React + Vite + TypeScript (Sprint 1)****

****Vite:**** Reemplazó por completo a los viejos entornos como Create React App. Su servidor de desarrollo basado en módulos ESM nativos ofrece una velocidad de compilación casi instantánea. Para JGTravel, esto se traduce en tiempos de despliegue mínimos en producción y un rendimiento óptimo de cara al usuario.

****TypeScript:**** En una plataforma que manejará pasarelas de pago (Mercado Pago), reservas de vuelos (Amadeus) y estructuras de datos complejas de hoteles, el tipado estático de TypeScript evita errores en producción. Garantiza que un dato de tipo Precio o ID\_Reserva nunca se rompa ni se confunda en el código.

****React + React Router:**** Sigue siendo el estándar de la industria para crear Single Page Applications (SPA). Permite que el usuario navegue entre la búsqueda de hoteles, el clima y los mapas sin que la página tenga que recargarse por completo, emulando una experiencia inmersiva.

-   ****🌐 Internacionalización: i18next (Sprint 1)****

****i18next:**** Es la librería líder del mercado para React. Se eligió porque maneja la carga perezosa (lazy loading) de las traducciones. Esto significa que si un usuario entra en Español (ES), el navegador no gastará datos en cargar los archivos de Inglés (EN) o Portugués (PT) hasta que sea necesario, manteniendo la aplicación ligera.

-   ****🔥 Backend y Gestión: Firebase (Sprint 3)****

****Firebase Authentication:**** Desarrollar un sistema de usuarios seguro desde cero requiere meses de trabajo y auditorías. Se eligió Firebase porque resuelve el Login con Google y la gestión de sesiones en cuestión de horas con estándares bancarios de seguridad, permitiendo al equipo concentrarse en la lógica del negocio turístico.

-   ****🗺️ Mapas y Entorno: OpenStreetMap + Leaflet (Sprint 4)****

****Leaflet:**** A diferencia de la API de Google Maps tradicional, que puede volverse extremadamente costosa al escalar en volumen de usuarios, la combinación de OpenStreetMap y Leaflet es de código abierto, altamente personalizable y gratuita. Esto permite renderizar mapas de Salta y Latinoamérica de forma interactiva y fluida sin comprometer el presupuesto del proyecto.

-   ****💳 Simulación e Integración: Dolibarr + Mercado Pago (Sprint 5)****

****Dolibarr:**** Al ser una empresa de gran trayectoria familiar, integrar un ERP de código abierto como Dolibarr permite simular y conectar la gestión del negocio real (facturación, stock de servicios, clientes) con la plataforma web de manera directa.Mercado Pago Sandbox: Es el estándar absoluto de pagos en Latinoamérica. Su entorno de pruebas (Sandbox) permite validar todo el flujo de cobros de reservas de forma segura antes de pasar a producción.

## Público objetivo

### 1\. Segmentos de Clientes (Líneas de Negocio)

-   ****🍷 Turista del Vino y Alta Gama (Enoturismo):****

****Perfil:**** Amantes del vino, parejas, grupos de amigos y sibaritas nacionales e internacionales (principalmente de Brasil, EE.UU. y Europa).

****Interés:**** Buscan recorrer las rutas del vino (como Cafayate y los valles calchaquíes), bodegas boutique, catas exclusivas y experiencias inmersivas que combinen paisajes y tecnología.

-   ****🏢 Corporativo y Empresarial (MICE):****

****Perfil:**** Empresas locales, nacionales y multinacionales, ejecutivos y organizadores de eventos.

****Interés:**** Coordinación de viajes de incentivo, convenciones, retiros de integración de equipos (__teambuilding__) y logística de transporte/alojamiento de alta fiabilidad.

-   ****🎓 Instituciones Educativas (Turismo Educativo):****

****Perfil:**** Colegios, universidades e institutos de toda la región y provincias vecinas.

****Interés:**** Viajes de estudio, salidas didácticas y excursiones con valor pedagógico e histórico, buscando plataformas donde la coordinación de itinerarios, reservas grupales y seguridad sea transparente.

-   ****🌍 Turista Local y Regional (Ocio y Aventura):****

****Perfil:**** Familias y viajeros independientes de Argentina y Latinoamérica que buscan explorar Salta y el continente de una forma moderna y autogestionada.

### ****2\. Perfil Tecnográfico**** (¿Cómo interactúan con la plataforma?)

-   ****Nativos y Adoptantes Digitales:**** Usuarios que prefieren resolver todo su itinerario desde el smartphone o la laptop sin intermediarios analógicos.
-   ****Buscadores de Experiencias Inmersivas:**** Viajeros que exigen "ver antes de comprar". Valoran el uso de mapas interactivos, datos del clima en tiempo real y componentes visuales avanzados para tomar sus decisiones de viaje.
-   ****Viajeros Multilenguaje:**** Clientes que configuran sus dispositivos en Español (ES), Inglés (EN) o Portugués (PT) y esperan una experiencia de reserva fluida y natural en su propio idioma.

## Idiomas soportados (ES, EN, PT)

### 3\. IDIOMAS SOPORTADOS

La plataforma está diseñada desde su núcleo (__core__) con arquitectura ****i18n (Internacionalización)**** \[Roadmap\], lo que permite un soporte nativo, dinámico y escalable para tres idiomas estratégicos \[Roadmap\]. La traducción abarca interfaces de usuario, componentes inmersivos, notificaciones de reservas y flujos de pago:

🇦🇷 Español (ES) – Idioma Nativo y de Operación Base

-   ****Enfoque de Mercado:**** Público local de la Provincia de Salta, turismo interno de Argentina y la totalidad de los países hispanohablantes de Latinoamérica \[Roadmap\].
-   ****Aplicación:**** Idioma por defecto (__fallback__). Toda la lógica de negocio, catalogación de experiencias locales, enoturismo, contenido educativo y contratos empresariales se desarrollan inicialmente bajo esta localización. \[[1](https://www.ibm.com/docs/es/masv-and-l/cd?topic=deploy-language-support)\]

🇺🇸 Inglés (EN) – Idioma Global y Corporativo

-   ****Enfoque de Mercado:**** Turistas internacionales procedentes de Norteamérica, Europa y Asia que visitan la región de Salta y Latinoamérica, así como cuentas corporativas multinacionales.
-   ****Aplicación:**** Traducción técnica y comercial de todas las experiencias de alta gama (enoturismo boutique), integración con la API global de Amadeus (vuelos y hoteles) \[Roadmap\], y soporte para viajeros corporativos globales.

🇧🇷 Portugués (PT) – Idioma de Expansión Regional

-   ****Enfoque de Mercado:**** El mercado brasileño, principal emisor de turistas internacionales de alta gama y enoturismo hacia el norte argentino y el resto del continente latinoamericano.
-   ****Aplicación:**** Localización adaptada al portugués de Brasil, optimizando el motor de reservas, mapas interactivos y experiencias inmersivas para captar de forma directa este flujo turístico estratégico de alta conversión.

🛠️ Estrategia de Implementación Técnica (i18next)

Para garantizar un rendimiento óptimo y no penalizar la velocidad de carga de la web en dispositivos móviles (clave para el viajero en ruta) \[Roadmap\], el soporte de estos idiomas se implementa bajo las siguientes reglas técnicas en el ****Sprint 1****:

1.  ****Lazy Loading (Carga Perezosa):**** Los archivos de traducción (`JSON`) se dividen por namespaces (ej. `common.json`, `auth.json`, `booking.json`). Solo se descarga en el navegador el idioma seleccionado por el usuario.
2.  ****Detección Automática de Idioma:**** La plataforma utiliza plugins de i18next para detectar el idioma del navegador del usuario o las cookies de su última sesión, adaptando la experiencia al instante.
3.  ****Soporte de Monedas Localizadas:**** La internacionalización trabaja en conjunto con la simulación de negocio para mostrar formatos numéricos, de fecha y símbolos de moneda adecuados a cada región.

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

## 5\. ARQUITECTURA DE LA PLATAFORMA

Para soportar la escala del Roadmap de ****JGTravel**** (multilenguaje, múltiples APIs y simulación de negocio), se implementará una arquitectura basada en el patrón ****Feature-Driven Development (FDD) / Feature-Sliced Design**** \[Roadmap\]. Este enfoque permite desacoplar los módulos del negocio (como vuelos, enoturismo o pasarela de pagos) para que el proyecto sea mantenible en el tiempo \[Roadmap\].

🗺️ 5.1 Patrón de Diseño Frontend: Feature-Driven

En lugar de agrupar todo por tipos de archivos técnicos (todos los componentes juntos, todos los hooks juntos), el código se organiza por ****módulos de negocio (Features)****. Cada funcionalidad compleja es autosuficiente.

-   ****Ventaja:**** Si necesitamos modificar o auditar la integración de __Mercado Pago__ o el mapa de __Leaflet__, todo su código relacionado (componentes visuales, lógica, tipos e interfaces) se encuentra concentrado en una sola carpeta \[Roadmap\].

📂 5.2 Estructura de Carpetas Propuesta (Sprint 2)

A continuación, se detalla el árbol de directorios que configuraremos en la raíz del proyecto (`/src`) durante el refactor de la estructura \[Roadmap\]:

src/

├── assets/ # Recursos estáticos globales (imágenes, logos de JGTravel)

├── components/ # Componentes UI globales y atómicos (Botones, Inputs del Design System)

├── config/ # Configuraciones globales (firebase.ts, i18n.ts, apiClients.ts)

├── context/ # Contextos globales de React (AuthContext, ThemeContext)

├── features/ # MÓDULOS DE NEGOCIO (Núcleo de la arquitectura)

│ ├── auth/ # Login, Registro, Firebase Auth Hooks \[Sprint 3\]

│ ├── flights-hotels/ # Integración con Amadeus API \[Sprint 4\]

│ ├── maps/ # Mapas interactivos, Leaflet, capas de Salta \[Sprint 4\]

│ ├── experiences/ # Enoturismo, Educativo, Empresarial, API Pexels/Places \[Sprint 4\]

│ └── checkout/ # Reservas, Carrito, Integración Mercado Pago Sandbox \[Sprint 5\]

├── hooks/ # Custom Hooks reutilizables a nivel global (useFetch, useWindowSize)

├── routes/ # Configuración y definición de rutas con React Router

├── types/ # Interfaces y Tipos de TypeScript globales e inmutables

├── utils/ # Funciones utilitarias (formateadores de fechas, monedas, validadores)

├── App.tsx # Componente raíz de la aplicación

└── main.tsx # Punto de entrada de Vite para el renderizado en el DOM

⚙️ 5.3 Pilares Técnicos de la Arquitectura

1.  ****Desacoplamiento de APIs (Capas de Servicio):**** Las llamadas a las APIs externas (Amadeus, OpenWeather, etc.) no se harán directamente dentro de los componentes visuales \[Roadmap\]. Se crearán __servicios__ aislados dentro de cada `feature` para mapear y limpiar las respuestas antes de que lleguen a la interfaz.
2.  ****Estado Predictivo y Contextual:**** El estado de la autenticación de usuarios (Firebase) se manejará mediante un `Context` global de React, asegurando que cualquier pantalla sepa si el usuario es un cliente corporativo, educativo o turista local \[Roadmap\].
3.  ****Tipado Estricto de Datos:**** Cada entidad del negocio (ej: `Vuelo`, `Reserva`, `Bodega`, `Usuario`) tendrá un tipo de TypeScript inmutable definido. Esto garantiza que las simulaciones con el ERP Dolibarr y los esquemas de Mercado Pago no rompan el flujo de datos \[Roadmap\].
4.  ****Enrutamiento Dinámico:**** Controlado por __React Router__, implementando la división de código (__Code Splitting__) a través de `React.lazy`. Las vistas pesadas (como la pantalla de mapas interactivos del Sprint 4) solo se cargarán cuando el usuario navegue hacia ellas \[Roadmap\], optimizando el rendimiento de carga inicial.

  

## Equipo

Desarrollador Principal
Walter Gustavo Alurralde

Arquitectura de Software
Diseño y planificación técnica asistida mediante herramientas de inteligencia artificial.

Control de versiones
Git + GitHub