# Sprint 02

## Estado

🟢 Finalizado

---

## Objetivo

Definir la arquitectura funcional y técnica de JGTravel, estableciendo las bases del proyecto antes de comenzar el desarrollo de funcionalidades e integraciones.

---

# Historias completadas

- [x] Refactor de la estructura del proyecto
- [x] Organización de la documentación técnica
- [x] Reorganización del Project Charter
- [x] Roadmap del proyecto
- [x] Software Architecture
- [x] Integrations
- [x] Database (Modelo de Dominio)
- [x] MVP
- [x] Riesgos del proyecto
- [x] Decisions Pending
- [x] Arquitectural Decision Records (ADR)
- [x] Diagrama General de Arquitectura
- [x] Diagrama del Modelo de Dominio
- [x] Definición de dominios del negocio
- [x] Selección de proveedores tecnológicos
- [x] Definición de estrategia Backend + APIs
- [x] Definición de estrategia Dolibarr + Backend
- [x] Preparación del repositorio para Sprint 3

---

# Entregables

- 00-ProjectCharter.md
- 01-Roadmap.md
- 02-SoftwareArchitecture.md
- 04-Integrations.md
- 07-Database.md
- 08-MVP.md
- 09-Risks.md
- 10-DecisionsPending.md
- ADR-001 ... ADR-006
- architecture-v1.drawio
- architecture-v1.png
- domain-model-v1.drawio
- domain-model-v1.png

---

# Resultado

Se definió completamente la arquitectura de JGTravel, permitiendo comenzar el desarrollo sin incertidumbre sobre la estructura del sistema.

---

## Observaciones

Durante este Sprint se tomaron decisiones arquitectónicas importantes:

- React no consumirá APIs externas directamente.
- Se desacoplan los proveedores mediante una capa Backend.
- Dolibarr funcionará únicamente como Backoffice.
- Se adopta PostgreSQL como base de datos principal.
- La arquitectura queda preparada para reemplazar proveedores sin modificar el Frontend.