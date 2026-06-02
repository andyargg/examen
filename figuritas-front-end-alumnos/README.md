# Figuritas Mundial 2026 — Primer Parcial Programación III

**UTN Avellaneda — Tecnicatura Universitaria en Programación**
**Docente:** Lic. Ricardo Gastón Plazas
**Año:** 2026

---

## 📁 Estructura del proyecto

```
📂 apellido_nombre/
├── 📄 index.html          → Página principal (NO MODIFICAR estructura de archivos)
├── 📁 css/
│   └── 📄 styles.css      → Estilos complementarios a Bootstrap
├── 📁 js/
│   ├── 📄 constantes.js   → Configuración global (URL API, constantes)
│   └── 📄 manejadora.js   → Lógica de la aplicación (A COMPLETAR)
└── 📁 img/
    ├── 📄 utnLogo.png     → Logo UTN
    ├── 📄 copa.jpg        → Imagen por defecto
    └── 📄 rainbow-spinner-loading.gif → Spinner de carga
```

---

## 🚀 Cómo ejecutar el proyecto

1. Descomprimir el archivo en una carpeta
2. Renombrar la carpeta con **apellido y nombre** (ej: `plazas_ricardo`)
3. Abrir `index.html` en un navegador moderno (Chrome, Firefox, Edge)
4. No se requiere servidor local para el frontend

---

## 📝 Consignas del parcial (resumen)

| Parte | Descripción | Puntos |
|---|---|---|
| **1** | Listado inicial (GET) + Alta (POST con FormData) | 15 |
| **2** | Selección, Modificación (PUT) y Eliminación (DELETE) | 20 |
| **3** | Validaciones Bootstrap + JS (campos, precio, imagen) | 15 |
| **4** | Spinner, Filtros, Promedio y Paginación | 15 |
| **5** | UX/UI: Responsive, Navbar, Tabs, Tipografía | 15 |
| **6** | Estadísticas, Exportar CSV, Modo oscuro/claro | 15 |
| **Bonus** | Accesibilidad (aria-*) + README.md | 5 |
| | **TOTAL** | **100** |

---

## 🔧 API del backend

**URL base:** `https://figuritas-api.onrender.com/api/figuritas`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/figuritas` | Listar todas (query: `?pais=Argentina&nombre=Messi`) |
| GET | `/api/figuritas/:id` | Obtener una por ID |
| POST | `/api/figuritas` | Crear nueva (form-data: nombre, pais, precio, imagen) |
| PUT | `/api/figuritas/:id` | Modificar (form-data: nombre, pais, precio, imagen) |
| DELETE | `/api/figuritas/:id` | Eliminar |

---

## ✅ Checklist de entrega

- [ ] Todas las partes implementadas y funcionando
- [ ] Código limpio, indentado y comentado
- [ ] Sin errores en la consola del navegador
- [ ] Diseño responsive (probar en mobile y desktop)
- [ ] Archivo README.md completo
- [ ] Sin archivos ni carpetas no utilizados
- [ ] Carpeta renombrada con apellido y nombre

---

## 💡 Tips

- Implementar las partes **en orden** (1 → 2 → 3 → 4 → 5 → 6)
- La corrección es **secuencial**: si una parte falla, las siguientes no se evalúan
- Usar `console.log()` para debuggear durante el desarrollo
- Probar cada funcionalidad antes de pasar a la siguiente
- Usar la colección Postman provista en el aula virtual para probar la API

---

## 📚 Recursos útiles

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [MDN Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN FormData](https://developer.mozilla.org/es/docs/Web/API/FormData)
