# Sprint 03
## Objetivo
Comenzar el desarrollo de la plataforma sobre la arquitectura definida. Objetivo

Construir la infraestructura base del proyecto para que cualquier funcionalidad futura (vuelos, hoteles, reservas, pagos, etc.) se agregue sin tener que modificar la arquitectura.

## Historia
- [x] JGT-012 – Instalación del stack base
- [x] JGT-013 Configurar .env
- [x] JGT-014 Configurar Firebase
- [x] JGT-015 Providers	- AuthContext
- [x] JGT-016 React Query - Funcional	
- [X] JGT-017 Login Google


## Entregables
* Variables de entorno tipadas
* Configuración centralizada (config/)
* Firebase Authentication integrado
* Login Google operativo
* Context API para autenticación
* React Query configurado globalmente
* Hook useAuth() reutilizable
* Hook useWeather() de ejemplo
* Integración de sesión en Navbar

## Estado
🟢 Finalizado
## Resultado

La plataforma quedó con autenticación Google real mediante Firebase Authentication, gestión global de sesión con Context API y soporte de cache y consultas asíncronas mediante TanStack React Query.

La arquitectura base quedó preparada para integrar APIs turísticas externas y funcionalidades de negocio en los siguientes sprints.