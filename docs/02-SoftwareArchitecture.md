# JGTravel Platform — Especificación Técnica y Arquitectura de Software

---

## 1. Visión General y Mercado Tecnológico
La plataforma **JGTravel** se concibe bajo una filosofía **Mobile-First** y funciona como un **agregador inteligente de datos**. En lugar de almacenar toda la información en servidores propios, consume e integra múltiples APIs externas en tiempo real para maximizar la velocidad, la escalabilidad y la conversión.

* **Velocidad de carga orientada a la conversión:** Un retraso de un segundo en la carga puede reducir la conversión de reservas hoteleras y turísticas hasta en un 20%. Se priorizan arquitecturas ultra-ligeras.
* **Experiencia Mobile-First y Reactiva:** Diseñada para usuarios que reservan en ruta desde dispositivos móviles, ofreciendo el rendimiento y la fluidez de una aplicación nativa.
* **Centralización vía APIs:** Consumo en tiempo real de datos de vuelos, hoteles, clima, mapas y servicios locales, presentados en una interfaz unificada.

---

## 2. Stack Tecnológico y Justificación Técnica

### ⚛️ Frontend: React + Vite + TypeScript (Sprint 1)
* **Vite:** Reemplaza los entornos legados (como Create React App). Su servidor de desarrollo basado en módulos ESM nativos ofrece compilación casi instantánea y despliegues optimizados.
* **TypeScript:** Incorpora tipado estático estricto. En un entorno que gestiona precios, reservas e integraciones financieras (Amadeus, Mercado Pago), previene errores en producción garantizando que identificadores y montos no sufran incongruencias de datos.
* **React + React Router:** Estándar para Single Page Applications (SPA). Permite navegar de forma fluida entre mapas, hoteles y servicios sin recargas completas de página.

### 🌐 Internacionalización: i18next (Sprint 1)
* **i18next:** Gestión multiidioma con **Lazy Loading** (carga perezosa de traducciones divididas por namespaces como `common.json`, `auth.json`, `booking.json`). Solo se descarga el paquete del idioma seleccionado para no consumir datos móviles innecesariamente.
* **Reglas de Implementación:**
  1. *Detección Automática:* Basada en preferencias del navegador o cookies de sesión.
  2. *Monedas y Formatos Locales:* Trabajo conjunto con la lógica de negocio para adaptar símbolos monetarios, formatos numéricos y fechas por región.

### 🔥 Backend y Autenticación: Firebase (Sprint 3)
* **Firebase Authentication:** Gestión de sesiones y login social (Google) bajo estándares bancarios de seguridad, reduciendo tiempos de desarrollo y auditorías.

### 🗺️ Mapas y Entorno: OpenStreetMap + Leaflet (Sprint 4)
* **Leaflet + OpenStreetMap:** Alternativa de código abierto a Google Maps. Elimina costos elevados de licenciamiento comercial al escalar usuarios y permite renderizar capas interactivas de destinos (Salta, Latinoamérica) con total libertad gráfica.

### 💳 Simulación de Negocio y ERP: Dolibarr + Mercado Pago (Sprint 5)
* **Dolibarr ERP + Mercado Pago Sandbox:** Conexión con facturación, gestión operativa y procesamiento seguro de cobros en entornos de prueba.

---

## 3. Dominios del Negocio e Integraciones de Proveedores

### Dominios Nucleares del Core
* Usuarios
* Autenticación
* Perfil del Viajero
* Destinos
* Experiencias
* Paquetes Turísticos
* Vuelos
* Hoteles
* Rent a Car
* Bus Trips
* Restaurantes
* Seguros de Viaje
* Reservas
* Pagos
* Favoritos
* Notificaciones
* Administración
* Backoffice
* Integraciones

### Matriz de Integración de Proveedores (100% Reemplazables)

| Dominio | Proveedor Inicial | Reemplazable |
| :--- | :--- | :---: |
| **Vuelos** | Amadeus | ✅ |
| **Hoteles** | Amadeus | ✅ |
| **Mapas** | OpenStreetMap / Leaflet | ✅ |
| **Clima** | OpenWeather | ✅ |
| **Gastronomía** | Google Places / Foursquare | ✅ |
| **Rent a Car** | CarTrawler | ✅ |
| **Bus** | Busbud | ✅ |
| **Seguros** | Cover Genius / Allianz / AXA | ✅ |
| **Pagos** | Mercado Pago | ✅ |
| **Imágenes** | Pexels / Unsplash | ✅ |
| **ERP / Backoffice** | Dolibarr | ✅ |

---

## 4. Arquitectura de Software

### 4.1 Patrón de Diseño Frontend: Feature-Sliced Design (FSD)
En lugar de agrupar archivos por tipo técnico (todos los componentes o hooks juntos), la estructura se organiza por **módulos de negocio (Features)** independientes y autosuficientes. 

* **Ventaja:** Toda la lógica, interfaz, tipos e integraciones de un módulo (ej. *Mercado Pago* o *Leaflet*) residen en una única carpeta, facilitando auditorías y mantenimiento.

### 4.2 Estructura de Directorios (`/src`)
```text
src/
├── assets/         # Recursos estáticos globales (imágenes, logos)
├── components/     # UI atómica del Design System (Botones, Inputs)
├── config/         # Configuraciones globales (firebase.ts, i18n.ts, apiClients.ts)
├── context/        # Estados globales compartidos (AuthContext, ThemeContext)
├── features/       # MÓDULOS DE NEGOCIO AUTOSUFICIENTES
│   ├── auth/           # Login, Registro, Firebase Auth Hooks [Sprint 3]
│   ├── flights-hotels/ # Integración con API Amadeus [Sprint 4]
│   ├── maps/           # Mapas interactivos, Leaflet, capas de Salta [Sprint 4]
│   ├── experiences/    # Enoturismo, Educativo, APIs Pexels/Places [Sprint 4]
│   └── checkout/       # Reservas, Carrito, Mercado Pago Sandbox [Sprint 5]
├── hooks/          # Custom Hooks globales (useFetch, useWindowSize)
├── routes/         # Enrutamiento SPA con React Router
├── types/          # Tipados e interfaces TypeScript inmutables
├── utils/          # Formateadores utilitarios (fechas, monedas)
├── App.tsx         # Componente raíz
└── main.tsx        # Punto de entrada de Vite al DOM
```

---

## 5. Flujo de Datos y Capas del Sistema

### Regla Arquitectónica Fundamental
> **React nunca habla directamente con un proveedor externo.** Siempre existe una capa intermedia de adaptadores y servicios que desacopla la UI de las APIs de terceros.

### Diagrama del Flujo de Datos (Data Flow)

**Flujo de Solicitud (Ida):**
`Usuario` ➔ `React Components` ➔ `Custom Hooks` ➔ `Services` ➔ `API Adapter` ➔ `Proveedor Externo` *(Amadeus, OpenWeather, Google Places, Dolibarr, PostgreSQL)*

**Flujo de Respuesta (Vuelta):**
`Proveedor` ➔ `Adapter` ➔ `Service` ➔ `React Hook` ➔ `Component` ➔ `Usuario`

### Capas de la Aplicación

| Capa | Responsabilidad |
| :--- | :--- |
| **Presentation** | Componentes e interfaces visuales de React |
| **Application** | Gestión de estado, Custom Hooks y React Context |
| **Services** | Lógica de casos de uso e integración |
| **Infrastructure**| Adaptadores de comunicación con APIs externas |
| **Data** | Persistencia (PostgreSQL / Firebase / Dolibarr) |

---

## 6. Principios Arquitectónicos
* **Separación de Responsabilidades (Separation of Concerns):** Aislamiento claro entre UI, lógica y consumo de datos.
* **Bajo Acoplamiento y Alta Cohesión (Low Coupling / High Cohesion):** Modularidad estricta entre *features*.
* **Sustitución de Proveedores:** Reemplazo transparente de APIs externas mediante el patrón *Adapter*.
* **API-First & Mobile-First:** Desarrollo enfocado en el rendimiento móvil y el consumo eficiente de servicios REST.
* **Internacionalización Nativa (i18n):** Soporte multiidioma y multimoneda integrado desde las bases.
* **Escalabilidad Horizontal:** Preparado para incorporar nuevos dominios turísticos sin afectar la estructura existente.

## 7. Arquitectura General

![Arquitectura General](./diagrams/architecture-v1.png)

La siguiente imagen representa la arquitectura lógica de JGTravel y la interacción entre el cliente, los servicios, las APIs externas y el backoffice.

## 8. Decisiones Arquitectónicas

| Decisión              | Motivo                       |
| --------------------- | ---------------------------- |
| React + Vite          | Alto rendimiento             |
| TypeScript            | Tipado fuerte                |
| Firebase              | Login seguro                 |
| PostgreSQL            | Persistencia                 |
| Adapter Pattern       | Reemplazar proveedores       |
| Feature-Sliced Design | Escalabilidad                |
| i18next               | Internacionalización         |
| Leaflet               | Evitar costos de Google Maps |


## 9. Arquitectura Física

Usuario

↓

React (Vercel)

↓

API Backend

↓

PostgreSQL

↓

Dolibarr ERP

↓

APIs Externas


## 10. Evolución de la Arquitectura

MVP
React
Firebase
PostgreSQL
APIs
# Producción
CDN
Cache Redis
Docker
Kubernetes
Microservicios
Observabilidad