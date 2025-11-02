# 🚀 Stack Tecnológico - Portfolio Personal

## ✅ Dependencias Instaladas

### 📦 Core Dependencies

#### React & Ecosystem
- **React** (ya instalado) - Framework principal
- **TypeScript** (ya instalado) - Type safety
- **Vite** (ya instalado) - Build tool ultra-rápido

#### Styling & UI
- **TailwindCSS** v3 - Framework CSS utility-first
- **@tailwindcss/typography** - Plugin para contenido tipográfico
- **@tailwindcss/forms** - Estilos mejorados para formularios
- **PostCSS** - Procesador CSS
- **Autoprefixer** - Prefijos CSS automáticos

#### Animation & Interaction
- **Framer Motion** - Animaciones fluidas y transiciones
- **Three.js** - Librería 3D para efectos impresionantes
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers y abstracciones útiles para R3F

#### Routing & Navigation
- **React Router DOM** - Navegación SPA

#### Icons & Assets
- **Lucide React** - Iconos modernos y consistentes

#### Utilities
- **clsx** - Utilidad para combinar class names
- **tailwind-merge** - Merge inteligente de clases Tailwind

### 🛠️ Dev Dependencies

- **Prettier** - Code formatter
- **prettier-plugin-tailwindcss** - Auto-ordenar clases de Tailwind

---

## 📁 Estructura de Carpetas Creada

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables (Button, Card, etc.)
│   ├── sections/        # Secciones del portfolio (Hero, About, Projects, etc.)
│   └── three/           # Componentes 3D con Three.js
├── hooks/               # Custom React hooks
│   ├── useTheme.ts      # Hook para dark/light mode
│   └── useScrollPosition.ts  # Hook para scroll tracking
├── lib/                 # Utilidades y helpers
│   └── utils.ts         # Función cn() para merge de clases
├── types/               # TypeScript interfaces
│   └── index.ts         # Tipos para Project, Skill, Experience, etc.
├── data/                # Data estática (proyectos, skills, etc.)
├── assets/              # Imágenes, SVGs, etc.
├── App.tsx
├── main.tsx
└── index.css            # Configuración de Tailwind
```

---

## 🎨 Configuración Personalizada

### Tailwind Config

✅ **Dark mode** configurado con clase 'dark'
✅ **Colores personalizados:**
- Primary: Blue (50-950)
- Secondary: Purple (50-950)

✅ **Animaciones custom:**
- `fade-in` - Fade in suave
- `slide-up` - Deslizamiento hacia arriba
- `slide-down` - Deslizamiento hacia abajo
- `float` - Efecto flotante infinito

✅ **Fuentes:**
- Sans: Inter (principal)
- Mono: Fira Code

✅ **Utilidades custom:**
- `.glass-effect` - Efecto glassmorphism
- `.gradient-text` - Texto con gradiente

### PostCSS Config

✅ Configurado con TailwindCSS y Autoprefixer

### Prettier Config

✅ Configurado para auto-formatear código
✅ Plugin de Tailwind para ordenar clases automáticamente

---

## 🎯 Características Disponibles

### ✨ Theme System
- Dark/Light mode con persistencia en localStorage
- Hook `useTheme()` para control global

### 📜 Scroll Tracking
- Hook `useScrollPosition()` para animaciones basadas en scroll
- Detección de dirección de scroll

### 🎨 Utilities
- Función `cn()` para combinar clases de Tailwind eficientemente
- Merge inteligente que evita conflictos

### 🎭 3D Ready
- Three.js configurado y listo
- React Three Fiber para componentes 3D declarativos
- Drei con helpers útiles (OrbitControls, Environment, etc.)

---

## 🚀 Próximos Pasos

El stack está 100% configurado y listo. Ahora puedes:

1. ✅ Empezar a crear componentes UI
2. ✅ Implementar las secciones del portfolio
3. ✅ Agregar efectos 3D con Three.js
4. ✅ Crear animaciones con Framer Motion
5. ✅ Agregar tu contenido (proyectos, skills, etc.)

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Format código con Prettier
npx prettier --write .
```

---

## 🌐 Servidor de Desarrollo

El servidor está corriendo en: **http://localhost:5173/**

---

**Stack Status:** ✅ 100% Configurado y Listo para Desarrollo
