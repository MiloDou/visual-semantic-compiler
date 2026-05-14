# CYBER_DRIVE — Algorithmic Visual IDE

Entorno de desarrollo visual para programación algorítmica.
Stack: React 18 + Vite + ReactFlow + Monaco Editor.

---

## Requisitos

- **Node.js** versión 18 o superior
  → Descarga: https://nodejs.org (elige "LTS")
- **npm** (viene incluido con Node.js)

Verifica que los tienes instalados abriendo una terminal y corriendo:
```
node -v
npm -v
```

---

## Instalación y ejecución

### 1. Descomprime el proyecto
Extrae la carpeta `cyber-ide` en el lugar que prefieras, por ejemplo tu escritorio.

### 2. Abre la terminal en esa carpeta
- **Windows:** Haz clic derecho dentro de la carpeta → "Abrir en Terminal" (o PowerShell)
- **Mac/Linux:** Clic derecho → "Abrir Terminal aquí"

### 3. Instala las dependencias (solo la primera vez)
```
npm install
```
Esto descarga React, ReactFlow, Monaco Editor y todas las librerías.
Tarda ~1-2 minutos dependiendo de tu internet.

### 4. Inicia el servidor de desarrollo
```
npm run dev
```
Verás algo como:
```
  VITE v5.x  ready in 800ms

  ➜  Local:   http://localhost:5173/
```

### 5. Abre el IDE en tu navegador
Ve a: **http://localhost:5173**

Para detener el servidor: presiona `Ctrl + C` en la terminal.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Genera la versión de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción |

---

## Estructura del proyecto

```
cyber-ide/
├── index.html                  # Punto de entrada HTML
├── vite.config.js              # Configuración de Vite
├── package.json                # Dependencias
└── src/
    ├── main.jsx                # Bootstrap de React
    ├── App.jsx                 # Layout raíz + estado global
    ├── App.css                 # Layout principal (100vw × 100vh)
    ├── index.css               # Variables CSS y reset global
    ├── components/
    │   ├── TopNavBar.jsx       # Barra superior (menús, filename, compile)
    │   ├── TopNavBar.css
    │   ├── SidebarToolbox.jsx  # Panel izquierdo (nav + nodos arrastrables)
    │   ├── SidebarToolbox.css
    │   ├── MainCanvas.jsx      # Lienzo ReactFlow (drag & drop, pan, zoom)
    │   ├── MainCanvas.css
    │   ├── FlowNode.jsx        # Nodo personalizado (oval, rect, diamond...)
    │   ├── FlowNode.css
    │   ├── RightSplitPanel.jsx # Panel derecho (Monaco C++ + ASM + terminal)
    │   └── RightSplitPanel.css
    └── data/
        ├── flowData.js         # Nodos y edges iniciales de ReactFlow
        └── codeSnippets.js     # Código C++ y ASM inicial + logs de consola
```

---

## Funcionalidades

### Canvas (zona central)
- **Pan:** Arrastra el fondo para mover el lienzo
- **Zoom:** Rueda del mouse o botones de control (esquina inferior izquierda)
- **Seleccionar nodos:** Click sobre cualquier nodo
- **Mover nodos:** Arrastra cualquier nodo
- **Conectar nodos:** Arrastra desde el handle (punto amarillo) de un nodo al otro
- **Eliminar:** Selecciona y presiona `Delete`
- **Agregar nodo desde sidebar:** Arrastra una forma del sidebar izquierdo al canvas

### TopNavBar
- **Nombre del archivo:** Editable directamente en el input
- **COMPILE_RUN:** Ejecuta la animación de compilación y actualiza la terminal
- **FILE / EDIT / VIEW / DEBUG:** Menús de utilidades

### Panel derecho
- **C++:** Editor Monaco en modo lectura (readOnly)
- **ASSEMBLER:** Editor Monaco con sintaxis ASM
- **ECHO_TERMINAL:** Terminal con log de compilación en tiempo real

---

## Personalización rápida

### Cambiar el código inicial
Edita `src/data/codeSnippets.js` → modifica `INITIAL_CPP` o `INITIAL_ASM`.

### Cambiar el flowchart inicial
Edita `src/data/flowData.js` → modifica `INITIAL_NODES` e `INITIAL_EDGES`.

### Cambiar colores
Edita las variables en `src/index.css` dentro de `:root { ... }`.
Las principales son:
- `--acc`  → amarillo dorado (acentos)
- `--sel`  → azul de selección (sidebar activo)
- `--bg`   → fondo principal

---

## Solución de problemas

**Error: `node` no reconocido**
→ Instala Node.js desde https://nodejs.org y reinicia la terminal.

**Puerto 5173 ocupado**
→ Vite elegirá el siguiente puerto disponible automáticamente (5174, etc.).

**Módulos no encontrados tras clonar**
→ Corre `npm install` de nuevo.

**Monaco Editor no carga**
→ Necesita conexión a internet la primera vez para cargar los workers.
   Tras la primera carga, funciona offline.
