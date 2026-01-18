#Gestión Asistentes IA

Este proyecto es una aplicación frontend desarrollada como prueba técnica, cuyo objetivo es gestionar asistentes de IA: crearlos, editarlos, entrenarlos y simular conversaciones, priorizando una buena experiencia de usuario, manejo correcto del estado y una arquitectura clara.

## 🛠️ Instrucciones para correr el proyecto

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
2. Instalar dependencias:

```bash
npm install
o
yarn install
```
3. Ejecutar en modo desarrollo:

```bash
npm run dev
o
yarn dev
```
3. Abrir en el navegador:
(http://localhost:3000)

## 🧠 Decisiones técnicas que tomé y por qué

Hice una separación de responsabilidades de React Query y Zustand

Opté por no manejar todo el estado en un solo lugar, sino dividir responsabilidades:

React Query para el Estado de datos

- Lo utilicé para manejar el listado de asistentes y operaciones CRUD.
- Simula de forma realista el comportamiento de una API (loading, error, success).
- Permite actualizar la UI de forma inmediata tras crear, editar o eliminar un asistente.

Zustand para manejar el Estado de UI

- Usado para el manejo del modal, paso actual del formulario y asistente seleccionado.
-Elegí Zustand por su simplicidad y porque evita el boilerplate de soluciones más complejas.
-Facilita compartir estado entre páginas (ej. asistente activo en entrenamiento).

Esta separación evita mezclar lógica de UI con lógica de datos.

--------------------------------------------------------------------------------------------------------

Los wireframes fueron tomados como guías estructurales, no diseños finales.
Tomé decisiones propias para lograr una interfaz más usable:

- Paleta de colores en tonos violeta y verde azulado para transmitir tecnología y confianza.
-Uso de sombras, espacios en blanco y jerarquía visual clara.
-Validaciones visibles y feedback inmediato.
-Tooltips informativos para evitar saturar la interfaz.
-Estados hover, focus y disabled para una experiencia responsiva.

El objetivo fue que la aplicación se sienta como un producto real, no solo una prueba técnica.

---------------------------------------------------------------------------------------------------------

## 🏆 Características Implementadas
1. Página principal – Listado de asistentes
2. Modal de creación / edición (2 pasos)
3. Página de entrenamiento del asistente y chat simulado
4. Eliminación de asistentes

## ⚠️ Funcionalidades no implementadas completamente

Por razones de priorización y tiempo, algunas funcionalidades quedaron parcialmente implementadas:

- Confirmación visual y feedback completo (toast de éxito/error) en la eliminación de asistentes.
- Manejo exhaustivo de todos los escenarios de error simulados en operaciones CRUD.

Estas decisiones se tomaron para priorizar:
- La arquitectura general del proyecto.
- El manejo correcto del estado con React Query y Zustand.
- La experiencia de usuario en los flujos principales (creación, edición y entrenamiento).

La estructura del código permite agregar estas mejoras sin refactorizaciones significativas.

## ⏱ Tiempo aproximado de dedicación

| Tarea                          | Tiempo |
| ------------------------------ | ------ |
| Estructura inicial y setup     | ~1 h   |
| Estado global (Zustand)        | ~1 h   |
| CRUD + React Query             | ~2 h   |
| Modal 2 pasos + validaciones   | ~2 h   |
| UX/UI listado y cards          | ~1.5 h |
| Página de entrenamiento + chat | ~2 h   |
| Ajustes UX, estados y feedback | ~1 h   |

Total aproximado: 10-12 horas
