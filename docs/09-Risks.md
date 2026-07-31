| Riesgo                                          | Impacto | Mitigación                                            |
| ----------------------------------------------- | ------- | ----------------------------------------------------- |
| API de Amadeus cambia                           | Alto    | Adaptador interno para desacoplar el proveedor        |
| Límite del plan gratuito de una API             | Medio   | Cache y sincronización periódica con la base de datos |
| Caída de un proveedor externo                   | Alto    | Mostrar datos almacenados y un mensaje al usuario     |
| Cambios en el alcance del trabajo universitario | Medio   | Mantener un MVP claramente definido                   |


## Riesgo: Acceso a Amadeus Self-Service

### Descripción

El portal histórico **Amadeus for Developers Self-Service** fue descontinuado y actualmente el acceso público redirige al **Enterprise API Portal**, lo que impide generar credenciales sandbox de forma inmediata para desarrolladores externos.

### Impacto

* Retrasa la integración real de vuelos y hoteles.
* Impide validar búsquedas reales contra el sandbox de Amadeus.

### Mitigación

* Mantener preparada la infraestructura de servicios (`services/amadeus`).
* Utilizar **mocks tipados** para el desarrollo de UI y flujos de reserva.
* Evaluar proveedores alternativos para pruebas académicas o MVP (AviationStack, TravelPayouts, Skyscanner RapidAPI, etc.).

### Estado

🟡 Pendiente de disponibilidad del portal externo.
