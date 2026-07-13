# ****JGTravel****

# ****Plataforma Web de Turismo****

## ****Objetivo****

Diseñar y desarrollar JGTravel, una plataforma web moderna de turismo para Latinoamérica que centralice la búsqueda y gestión de vuelos, alojamientos, transporte, gastronomía y experiencias turísticas mediante la integración de APIs especializadas, ofreciendo una experiencia multilenguaje, responsive y escalable.

  

## Alcance

El presente documento define el alcance funcional y técnico del proyecto JGTravel durante el desarrollo del Producto Mínimo Viable (MVP).

Incluye:

• Plataforma Web
• Autenticación
• APIs de turismo
• Sistema de reservas
• Internacionalización
• Dashboard administrativo
• Simulación ERP mediante Dolibarr

# Resumen Ejecutivo – JGTravel

## ¿Qué es JGTravel?

JGTravel es una plataforma web de turismo orientada al mercado latinoamericano que centraliza la planificación, búsqueda y gestión integral de viajes en un único entorno digital. Su objetivo es ofrecer a los usuarios una experiencia moderna, intuitiva y multilenguaje, permitiéndoles acceder desde una sola aplicación a información y servicios relacionados con vuelos, alojamientos, transporte, gastronomía, experiencias turísticas y otros recursos necesarios para organizar un viaje.

La plataforma está concebida bajo una arquitectura web escalable y responsive, integrando APIs especializadas del sector turístico para proporcionar información actualizada en tiempo real y facilitar el proceso de reserva y planificación de itinerarios. Inicialmente se desarrolla como un Producto Mínimo Viable (MVP), con capacidad de crecimiento hacia nuevas funcionalidades y mercados.

## Problema

La planificación de viajes en Latinoamérica suele requerir consultar múltiples plataformas independientes para reservar vuelos, hoteles, transporte terrestre, actividades turísticas, restaurantes y obtener información complementaria como mapas o condiciones climáticas. Esta fragmentación obliga a los viajeros a utilizar diferentes aplicaciones, comparar información manualmente y repetir procesos de búsqueda y reserva, generando pérdida de tiempo, mayor complejidad y una experiencia poco integrada.

Además, muchos destinos turísticos regionales carecen de plataformas digitales que unifiquen la oferta de servicios locales y ofrezcan soporte multilenguaje para visitantes internacionales, limitando su visibilidad y competitividad.

## Solución

JGTravel propone una solución integral que concentra los principales servicios turísticos dentro de una única plataforma web. Mediante la integración de APIs especializadas, la aplicación permitirá consultar disponibilidad de vuelos, alojamientos, transporte, gastronomía y experiencias turísticas desde una interfaz unificada, optimizando la planificación del viaje y mejorando la experiencia del usuario.

El sistema incorpora autenticación de usuarios, gestión de reservas, panel administrativo, internacionalización en español, inglés y portugués, diseño responsive y una arquitectura preparada para futuras integraciones con sistemas ERP y nuevos proveedores turísticos. De esta manera, JGTravel busca convertirse en una plataforma tecnológica escalable que facilite la transformación digital del turismo regional y contribuya a conectar viajeros con la oferta turística de Latinoamérica de forma eficiente, accesible y centralizada.



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




## Equipo

Desarrollador Principal
Walter Gustavo Alurralde

Arquitectura de Software
Diseño y planificación técnica asistida mediante herramientas de inteligencia artificial.

Control de versiones
Git + GitHu


## ESTADO ACTUAL

Sprint 2

Estado

En desarrollo

Arquitectura

80%

Frontend

35%

Backend

0%

Integraciones

0%