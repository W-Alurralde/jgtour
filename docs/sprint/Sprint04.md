# Sprint 04

## Estado

🟡 En progreso

---

## Objetivo

Comenzar las integraciones reales del ecosistema turístico de JGTravel y consolidar la capa de servicios, estándares de desarrollo y sistema visual de la plataforma.

---

## Historias

### Integraciones externas

* [x] JGT-018 – Integrar OpenWeather API real
* [x] JGT-019 – Integrar OpenStreetMap + Leaflet
* [x] JGT-020 – Implementar API Gateway base (`apiClient`)
* [ ] JGT-021 – Configurar Amadeus Sandbox (**pendiente; reemplazado temporalmente por TravelPayouts para el MVP**)
* [x] JGT-022 – Crear servicios desacoplados para vuelos y hoteles

### Módulo de vuelos (MVP)

* [x] JGT-023 – Crear módulo `features/flights`
* [x] JGT-024 – Implementar `FlightSearchForm`
* [x] JGT-025 – Integrar React Hook Form + Zod en vuelos
* [x] JGT-026 – Crear `useFlightSearch` con React Query
* [x] JGT-027 – Renderizar `FlightResults` y `FlightCard`
* [x] JGT-028 – Integrar enlaces reales de TravelPayouts para vuelos

### Módulo de hoteles (MVP)

* [x] JGT-029 – Crear módulo `features/hotels`
* [x] JGT-030 – Implementar `HotelSearchForm`
* [x] JGT-031 – Integrar React Hook Form + Zod en hoteles
* [x] JGT-032 – Crear `useHotelSearch` con React Query
* [x] JGT-033 – Renderizar `HotelResults` y `HotelCard`
* [x] JGT-034 – Integrar enlaces de hoteles (TravelPayouts MVP)

### Arquitectura y calidad

* [ ] JGT-035 – Completar configuración base del proyecto
* [ ] JGT-036 – Finalizar Design System visual
* [ ] JGT-037 – Definir Coding Standards del proyecto
* [x] JGT-038 – Configurar aliases TypeScript (`@/`)
* [ ] JGT-039 – Configurar ESLint + reglas de arquitectura

### UX y componentes

* [x] JGT-040 – Mejorar Navbar responsive
* [x] JGT-041 – Crear layout base de páginas
* [x] JGT-042 – Crear componentes UI reutilizables (`Button`, `Card`, `Badge`)

---

## Entregables

* Consumo real de OpenWeather
* Mapa interactivo con Leaflet
* API client centralizado
* Integración inicial TravelPayouts (MVP)
* Módulo de búsqueda de vuelos funcional
* Módulo de búsqueda de hoteles funcional
* Formularios validados con Zod
* React Query integrado en búsquedas
* Arquitectura desacoplada `features + services + hooks`
* Base responsive para desktop y mobile

---

## Dependencias

* Sprint 03 finalizado
* Firebase Authentication operativo
* React Query configurado
* Arquitectura `services + hooks + providers` establecida

---

## Observaciones

El acceso al sandbox de Amadeus quedó bloqueado por cambios en el portal Enterprise de Amadeus Developers. Para no detener el desarrollo del MVP se adoptó **TravelPayouts** como proveedor temporal de enlaces comerciales para vuelos y hoteles, manteniendo la arquitectura desacoplada para permitir el reemplazo futuro por Amadeus, Hotelbeds u otros mayoristas turísticos sin modificar la interfaz de usuario.
