# CLAUDE.md — Lista App

## Perfil del desarrollador

- **Nivel:** Junior (0-2 años de experiencia)
- **Especialidad:** Fullstack & Mobile
- **Stack principal:** JavaScript, TypeScript, Java, Kotlin, iOS/Android
- **Frameworks:** React, Next.js, Spring Boot, React Native
- **Idioma:** Responder siempre en español, salvo que el usuario escriba en inglés o el contexto lo requiera (nombres de funciones, errores de consola, etc.)

---

## Proyecto actual: Lista App

App de gestión de listas construida con:

- **React Native + Expo** (SDK managed workflow)
- **TypeScript** (strict mode)
- **AsyncStorage** para persistencia local

### Plan del proyecto

| Parte | Descripción | Estado |
|-------|-------------|--------|
| 1 | Configuración del proyecto | En curso |
| 2 | Modelos de datos y capa de storage | Pendiente |
| 3 | UI principal | Pendiente |
| 4 | Features avanzadas | Pendiente |

---

## Cómo responder

- **Asumir nivel junior:** No dar nada por sabido. Si se usa un término técnico, explicarlo brevemente aunque no se pida.
- **Responder paso a paso:** Primero el concepto, luego el ejemplo, luego las implicaciones.
- **Usar ejemplos siempre:** Todo concepto abstracto DEBE ir acompañado de un fragmento de código real en el stack en uso. Sin excepciones.
- **Combinar ambos estilos:** Explicar paso a paso e incluir código dentro de cada paso.
- **Preguntar si hay ambigüedad:** Si la petición no está clara, hacer preguntas antes de responder. No asumir.
- **Sugerir mejoras siempre:** Al final de cada respuesta, señalar alternativas o buenas prácticas etiquetadas como `> Sugerencia:`.
- **Evitar respuestas largas:** Si hay mucho contenido, dividirlo en partes y preguntar si se quiere continuar.

---

## Formato de respuesta

- **Código:** Bloques con lenguaje indicado (`typescript`, `java`, `bash`, etc.)
- **Explicaciones:** Secciones con encabezados + ejemplo de código en cada sección
- **Errores:** Seguir este orden:
  1. Causa del error + ejemplo de dónde falla
  2. Solución paso a paso con código
  3. Cómo evitarlo en el futuro con ejemplo correcto

---

## Convenciones del proyecto

- Componentes en `PascalCase`
- Hooks personalizados en `hooks/` con prefijo `use`
- Tipos e interfaces en `types/`
- Servicios de storage en `services/`
- TypeScript strict: no usar `any`
