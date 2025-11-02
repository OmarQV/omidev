# 🎨 Guía de Personalización - Portfolio OMIDEV

## ✅ Estado del Proyecto

**Tu portfolio está 100% funcional y listo para personalizar!**

Servidor corriendo en: **http://localhost:5173/**

---

## 📝 Cómo Personalizar Tu Portfolio

### 1. **Información Personal** 📋

Edita: `src/data/personal.ts`

```typescript
export const personalInfo = {
  name: 'Tu Nombre Aquí',  // ⬅️ Cambia esto
  role: 'Tu Título',       // ⬅️ Ej: "Frontend Developer", "UI/UX Designer"
  email: 'tuemail@example.com',  // ⬅️ Tu email real
  location: 'Tu Ciudad, País',
  // ... actualiza toda la información
}
```

**También personaliza:**
- Links sociales (GitHub, LinkedIn, Twitter)
- Estadísticas (años de experiencia, proyectos completados)
- Bio y descripción larga

---

### 2. **Tus Proyectos** 🚀

Edita: `src/data/projects.ts`

**Para cada proyecto, actualiza:**
- `title`: Nombre del proyecto
- `description`: Descripción corta
- `technologies`: Array de tecnologías usadas
- `liveUrl`: Link al sitio en vivo
- `githubUrl`: Link al repositorio
- `featured`: true/false (proyectos destacados)
- `image`: Ruta a la imagen del proyecto

**Agregar imágenes:**
1. Coloca las imágenes en `public/projects/`
2. Usa la ruta: `/projects/nombre-imagen.jpg`

---

### 3. **Tus Skills** 💻

Edita: `src/data/skills.ts`

**Para cada skill:**
- `name`: Nombre de la tecnología
- `level`: 1-100 (porcentaje de dominio)
- `category`: 'frontend' | 'backend' | 'tools' | 'design'

**Agregar íconos de skills:**
1. Descarga íconos SVG de [Devicon](https://devicon.dev/) o [Simple Icons](https://simpleicons.org/)
2. Guárdalos en `public/icons/`
3. Actualiza la propiedad `icon` con la ruta

---

### 4. **Colores y Tema** 🎨

#### **Cambiar colores principales:**

Edita: `tailwind.config.js`

```javascript
colors: {
  primary: {
    500: '#3b82f6',  // ⬅️ Tu color principal
    // ... otros tonos
  },
  secondary: {
    500: '#a855f7',  // ⬅️ Tu color secundario
    // ... otros tonos
  }
}
```

#### **Generar paleta de colores:**
Usa [Tailwind Color Generator](https://uicolors.app/create)

---

### 5. **Textos y Contenido** ✍️

**Hero Section:**
- Edita `src/data/personal.ts` → `personalInfo`
- Cambia: nombre, rol, tagline, bio

**About Section:**
- Actualiza `personalInfo.longBio`
- Modifica las estadísticas en `stats`

**Skills Section:**
- Ya personalizable desde `src/data/skills.ts`

**Projects Section:**
- Ya personalizable desde `src/data/projects.ts`

**Contact Section:**
- Actualiza email y ubicación en `src/data/personal.ts`

---

### 6. **Logo y Branding** 🏷️

**Cambiar logo "OMIDEV":**

Edita: `src/components/ui/Navbar.tsx` línea ~47

```tsx
<motion.a href="#home" className="text-2xl font-bold gradient-text">
  TU LOGO AQUÍ  {/* ⬅️ Cambia esto */}
</motion.a>
```

**Agregar logo como imagen:**
```tsx
<img src="/logo.svg" alt="Logo" className="h-8" />
```

---

### 7. **Favicon y Meta Tags** 🌐

Edita: `index.html`

1. **Favicon:**
   - Coloca tu favicon en `public/`
   - Actualiza: `<link rel="icon" href="/tu-favicon.svg" />`

2. **Meta Tags:**
   ```html
   <title>Tu Nombre - Tu Título | Portfolio</title>
   <meta name="description" content="Tu descripción" />
   <meta property="og:title" content="Tu título" />
   ```

---

### 8. **Foto/Avatar** 📸

**Opción 1: Usar imagen real**

1. Coloca tu foto en `public/images/avatar.jpg`
2. Edita `src/components/sections/About.tsx` línea ~110
3. Reemplaza el emoji con:
   ```tsx
   <img src="/images/avatar.jpg" alt="Tu Nombre" className="rounded-full" />
   ```

**Opción 2: Usar avatar generado**
- [Avataaars Generator](https://avataaars.com/)
- [Notion-style avatars](https://notion-avatar.vercel.app/)

---

### 9. **Formulario de Contacto (Funcional)** 📧

Actualmente el formulario es un demo. Para hacerlo funcional:

**Opción A: EmailJS (Gratis)**
```bash
npm install @emailjs/browser
```

**Opción B: Formspree**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Opción C: Web3Forms**
Visita: https://web3forms.com/

---

### 10. **Animaciones y Efectos** ✨

**Ajustar velocidad del fondo 3D:**

Edita: `src/components/three/AnimatedBackground.tsx`

```tsx
<OrbitControls
  autoRotateSpeed={0.5}  // ⬅️ Cambia la velocidad (0.1 - 2.0)
/>
```

**Desactivar fondo 3D:**
En `src/components/sections/Hero.tsx`, comenta:
```tsx
{/* <AnimatedBackground /> */}
```

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Formatear código
npm run format
```

---

## 📤 Despliegue

### **Vercel (Recomendado)**
1. Push tu código a GitHub
2. Visita [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. ¡Listo! Auto-deploy en cada push

### **Netlify**
1. `npm run build`
2. Arrastra carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop)

### **GitHub Pages**
1. Instala: `npm install -D gh-pages`
2. Agrega al `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Ejecuta: `npm run deploy`

---

## 🎯 Checklist de Personalización

- [ ] Cambiar nombre y datos personales
- [ ] Actualizar email y links sociales
- [ ] Agregar tus proyectos reales
- [ ] Actualizar skills y niveles
- [ ] Cambiar colores/logo si lo deseas
- [ ] Agregar imágenes de proyectos
- [ ] Actualizar favicon y meta tags
- [ ] Probar formulario de contacto
- [ ] Revisar responsive en móvil
- [ ] Deploy a producción

---

## 🆘 Problemas Comunes

**El fondo 3D no se ve:**
- Verifica que Three.js esté instalado: `npm list three`
- Revisa la consola del navegador (F12)

**Las imágenes no cargan:**
- Asegúrate de colocarlas en `public/`
- Usa rutas absolutas: `/images/foto.jpg`

**Errores de TypeScript:**
- Ejecuta: `npm run build` para ver errores reales
- Los warnings de CSS son normales y no afectan

---

## 💡 Mejoras Futuras

- [ ] Agregar sección de Blog
- [ ] Implementar filtros en Projects
- [ ] Agregar página de proyecto individual
- [ ] Integrar analytics (Google Analytics/Plausible)
- [ ] Agregar testimonios reales
- [ ] Modo offline con Service Worker
- [ ] Animaciones más complejas con GSAP

---

## 📚 Recursos Útiles

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Journey](https://threejs-journey.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

**¡Tu portfolio está listo! Ahora personalizalo y hazlo tuyo.** 🎨✨

¿Necesitas ayuda con algo específico? ¡Pregúntame! 🚀
