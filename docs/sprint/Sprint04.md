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
* [ ] JGT-021 – Configurar Amadeus Sandbox
* [ ] JGT-022 – Crear servicios desacoplados para vuelos y hoteles

### Arquitectura y calidad

* [ ] JGT-023 – Completar configuración base del proyecto
* [ ] JGT-024 – Finalizar Design System visual
* [ ] JGT-025 – Definir Coding Standards del proyecto
* [ ] JGT-026 – Configurar aliases TypeScript (`@/`)
* [ ] JGT-027 – Configurar ESLint + reglas de arquitectura

### UX y componentes

* [ ] JGT-028 – Mejorar Navbar responsive
* [ ] JGT-029 – Crear layout base de páginas
* [ ] JGT-030 – Crear componentes UI reutilizables (Button, Card, Badge)

---

## Entregables

* Consumo real de OpenWeather
* Mapa interactivo con Leaflet
* API client centralizado
* Integración Amadeus Sandbox inicial
* Design System operativo
* Coding Standards documentados
* Componentes UI reutilizables
* Base responsive para desktop y mobile

---

## Dependencias

* Sprint 03 finalizado
* Firebase Authentication operativo
* React Query configurado
* Arquitectura `services + hooks + providers` establecida

---

## Observaciones

Este sprint marca el inicio de las integraciones de negocio reales de JGTravel. El foco principal deja de ser la infraestructura y pasa a ser el consumo de APIs turísticas externas, la experiencia visual de usuario y la consolidación de estándares técnicos para soportar futuras funcionalidades como reservas, pagos, favoritos y backoffice.
