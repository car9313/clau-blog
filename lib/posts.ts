interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  category: string; // Añadir esta línea
}

const posts: Post[] = [
  {
    slug: "introduccion-react-hooks",
    title: "Guía Completa de React Hooks: useState, useEffect y más",
    excerpt:
      "Aprende a usar los React Hooks más importantes para crear componentes funcionales poderosos y reutilizables.",
    date: "15 Dic 2024",
    author: "María García",
    readTime: "8 min",
    tags: ["React", "JavaScript", "Frontend"],
    content: `
      <h2>¿Qué son los React Hooks?</h2>
      <p>Los React Hooks son funciones especiales que te permiten "enganchar" el estado y otras características de React desde componentes funcionales. Fueron introducidos en React 16.8 y han revolucionado la forma en que escribimos componentes.</p>
      
      <h3>useState: Manejando el Estado</h3>
      <p>El hook <code>useState</code> te permite agregar estado a componentes funcionales:</p>
      <pre><code>import React, { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Has hecho clic {count} veces&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Hacer clic
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h3>useEffect: Efectos Secundarios</h3>
      <p>El hook <code>useEffect</code> te permite realizar efectos secundarios en componentes funcionales. Es equivalente a <code>componentDidMount</code>, <code>componentDidUpdate</code> y <code>componentWillUnmount</code> combinados.</p>
      
      <pre><code>import React, { useState, useEffect } from 'react';

function Ejemplo() {
  const [count, setCount] = useState(0);

  useEffect(() =&gt; {
    document.title = \`Has hecho clic \${count} veces\`;
  });

  return (
    &lt;div&gt;
      &lt;p&gt;Has hecho clic {count} veces&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Hacer clic
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h3>Reglas de los Hooks</h3>
      <ul>
        <li>Solo llama Hooks en el nivel superior de tus funciones React</li>
        <li>Solo llama Hooks desde componentes funcionales de React</li>
        <li>Los nombres de los Hooks personalizados deben comenzar con "use"</li>
      </ul>

      <h3>Conclusión</h3>
      <p>Los React Hooks han simplificado enormemente el desarrollo con React, permitiendo que los componentes funcionales tengan todas las capacidades que antes solo tenían los componentes de clase.</p>
    `,
    category: "Frontend",
  },
  {
    slug: "nextjs-app-router-guia",
    title: "Next.js 14 App Router: La Nueva Era del Desarrollo Web",
    excerpt:
      "Descubre las ventajas del nuevo App Router de Next.js y cómo migrar tus proyectos para aprovechar al máximo sus características.",
    date: "12 Dic 2024",
    author: "Carlos Rodríguez",
    readTime: "12 min",
    tags: ["Next.js", "React", "Full-stack"],
    content: `
      <h2>¿Qué es el App Router?</h2>
      <p>El App Router es la nueva forma de manejar el routing en Next.js 13+. Está construido sobre React Server Components y ofrece un modelo mental más simple y poderoso para crear aplicaciones web.</p>

      <h3>Estructura de Carpetas</h3>
      <p>Con el App Router, la estructura de tu aplicación se basa en carpetas dentro del directorio <code>app/</code>:</p>
      <pre><code>app/
├── page.tsx          # Página principal (/)
├── about/
│   └── page.tsx      # Página about (/about)
├── blog/
│   ├── page.tsx      # Lista de posts (/blog)
│   └── [slug]/
│       └── page.tsx  # Post individual (/blog/[slug])
└── layout.tsx        # Layout raíz</code></pre>

      <h3>Server Components por Defecto</h3>
      <p>Una de las mayores ventajas del App Router es que los componentes son Server Components por defecto. Esto significa:</p>
      <ul>
        <li>Mejor rendimiento inicial</li>
        <li>Menor bundle size en el cliente</li>
        <li>Acceso directo a bases de datos y APIs</li>
        <li>Mejor SEO</li>
      </ul>

      <h3>Layouts Anidados</h3>
      <p>Los layouts se pueden anidar automáticamente:</p>
      <pre><code>// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    &lt;html lang="es"&gt;
      &lt;body&gt;
        &lt;nav&gt;Navegación global&lt;/nav&gt;
        {children}
      &lt;/body&gt;
    &lt;/html&gt;
  )
}</code></pre>

      <h3>Loading y Error States</h3>
      <p>El App Router incluye convenciones especiales para manejar estados de carga y error:</p>
      <ul>
        <li><code>loading.tsx</code> - Mostrado mientras se carga la página</li>
        <li><code>error.tsx</code> - Mostrado cuando ocurre un error</li>
        <li><code>not-found.tsx</code> - Mostrado para rutas 404</li>
      </ul>

      <h3>Migración desde Pages Router</h3>
      <p>La migración puede ser gradual. Puedes mantener ambos sistemas funcionando al mismo tiempo y migrar página por página.</p>

      <h3>Conclusión</h3>
      <p>El App Router representa el futuro de Next.js, ofreciendo mejor rendimiento, DX mejorada y características más poderosas para aplicaciones modernas.</p>
    `,
    category: "Full-stack",
  },
  {
    slug: "css-grid-flexbox-2024",
    title: "CSS Grid vs Flexbox: Cuándo Usar Cada Uno en 2024",
    excerpt:
      "Una guía práctica para decidir entre CSS Grid y Flexbox según el tipo de layout que necesites crear.",
    date: "10 Dic 2024",
    author: "Ana Martínez",
    readTime: "10 min",
    tags: ["CSS", "Layout", "Frontend"],
    content: `
      <h2>La Diferencia Fundamental</h2>
      <p>Aunque tanto CSS Grid como Flexbox son herramientas de layout, tienen propósitos diferentes:</p>
      <ul>
        <li><strong>Flexbox</strong>: Diseñado para layouts unidimensionales (filas o columnas)</li>
        <li><strong>CSS Grid</strong>: Diseñado para layouts bidimensionales (filas y columnas simultáneamente)</li>
      </ul>

      <h3>Cuándo Usar Flexbox</h3>
      <p>Flexbox es ideal para:</p>
      <ul>
        <li>Centrar elementos vertical y horizontalmente</li>
        <li>Distribuir espacio entre elementos</li>
        <li>Crear navegaciones horizontales</li>
        <li>Alinear elementos en una sola dimensión</li>
      </ul>

      <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.item {
  flex: 1; /* Los elementos crecen igualmente */
}</code></pre>

      <h3>Cuándo Usar CSS Grid</h3>
      <p>CSS Grid es perfecto para:</p>
      <ul>
        <li>Layouts de página completos</li>
        <li>Grillas de tarjetas o productos</li>
        <li>Layouts complejos con áreas definidas</li>
        <li>Cuando necesitas control sobre filas y columnas</li>
      </ul>

      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}</code></pre>

      <h3>Combinando Ambos</h3>
      <p>No tienes que elegir uno u otro. Muchas veces la mejor solución es combinar ambos:</p>
      <pre><code>/* Grid para el layout general */
.page {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

/* Flexbox para componentes internos */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}</code></pre>

      <h3>Casos de Uso Comunes</h3>
      <h4>Navbar (Flexbox)</h4>
      <pre><code>.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}</code></pre>

      <h4>Galería de Imágenes (Grid)</h4>
      <pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}</code></pre>

      <h3>Conclusión</h3>
      <p>La clave está en entender que Flexbox y Grid son complementarios. Usa Flexbox para componentes y Grid para layouts. Con la práctica, sabrás instintivamente cuál usar en cada situación.</p>
    `,
    category: "Frontend",
  },
  {
    slug: "javascript-async-await-promesas",
    title: "Dominando JavaScript Asíncrono: Promesas, Async/Await y Más",
    excerpt:
      "Todo lo que necesitas saber sobre programación asíncrona en JavaScript moderno, desde callbacks hasta async/await.",
    date: "8 Dic 2024",
    author: "Diego López",
    readTime: "15 min",
    tags: ["JavaScript", "Async", "Promesas"],
    content: `
      <h2>¿Por Qué JavaScript Asíncrono?</h2>
      <p>JavaScript es un lenguaje de un solo hilo, pero necesitamos realizar operaciones que toman tiempo (llamadas a APIs, lectura de archivos, etc.) sin bloquear la interfaz de usuario.</p>

      <h3>Evolución: De Callbacks a Async/Await</h3>
      
      <h4>1. Callbacks (El Pasado)</h4>
      <pre><code>// Callback Hell 😱
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // ¡Demasiado anidamiento!
    });
  });
});</code></pre>

      <h4>2. Promesas (El Presente)</h4>
      <pre><code>// Mucho más limpio
getData()
  .then(a =&gt; getMoreData(a))
  .then(b =&gt; getEvenMoreData(b))
  .then(c =&gt; {
    // ¡Código limpio!
  })
  .catch(error =&gt; {
    console.error('Error:', error);
  });</code></pre>

      <h4>3. Async/Await (El Futuro)</h4>
      <pre><code>// Como código síncrono
async function fetchData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getEvenMoreData(b);
    return c;
  } catch (error) {
    console.error('Error:', error);
  }
}</code></pre>

      <h3>Creando Promesas</h3>
      <pre><code>function delay(ms) {
  return new Promise(resolve =&gt; {
    setTimeout(resolve, ms);
  });
}

// Uso
delay(1000).then(() =&gt; {
  console.log('¡Un segundo después!');
});</code></pre>

      <h3>Manejo de Múltiples Promesas</h3>
      
      <h4>Promise.all() - Todas o ninguna</h4>
      <pre><code>const promesas = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

try {
  const resultados = await Promise.all(promesas);
  // Todas las promesas se resolvieron
} catch (error) {
  // Si cualquiera falla, se ejecuta este catch
}</code></pre>

      <h4>Promise.allSettled() - Todas, sin importar el resultado</h4>
      <pre><code>const resultados = await Promise.allSettled(promesas);
resultados.forEach((resultado, index) =&gt; {
  if (resultado.status === 'fulfilled') {
    console.log(\`Promesa \${index} exitosa:\`, resultado.value);
  } else {
    console.log(\`Promesa \${index} falló:\`, resultado.reason);
  }
});</code></pre>

      <h3>Patrones Comunes</h3>
      
      <h4>Retry con Exponential Backoff</h4>
      <pre><code>async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i &lt; maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}</code></pre>

      <h4>Timeout para Promesas</h4>
      <pre><code>function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =&gt;
    setTimeout(() =&gt; reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

// Uso
try {
  const data = await withTimeout(fetch('/api/slow'), 5000);
} catch (error) {
  console.log('La petición tardó más de 5 segundos');
}</code></pre>

      <h3>Errores Comunes</h3>
      <ul>
        <li><strong>Olvidar await</strong>: <code>const data = fetchData()</code> devuelve una Promise, no los datos</li>
        <li><strong>No manejar errores</strong>: Siempre usa try/catch con async/await</li>
        <li><strong>Await innecesario</strong>: <code>return await promise</code> es redundante en la mayoría de casos</li>
      </ul>

      <h3>Conclusión</h3>
      <p>El JavaScript asíncrono es fundamental en el desarrollo moderno. Async/await hace que el código asíncrono sea más legible y mantenible, pero es importante entender las promesas que hay debajo.</p>
    `,
    category: "JavaScript",
  },
  {
    slug: "typescript-para-javascript-developers",
    title: "TypeScript para Desarrolladores JavaScript: Guía de Migración",
    excerpt:
      "Aprende cómo migrar gradualmente tus proyectos JavaScript a TypeScript y aprovecha los beneficios del tipado estático.",
    date: "5 Dic 2024",
    author: "Laura Fernández",
    readTime: "11 min",
    tags: ["TypeScript", "JavaScript", "Migración"],
    content: `
      <h2>¿Por Qué TypeScript?</h2>
      <p>TypeScript añade tipado estático a JavaScript, lo que significa:</p>
      <ul>
        <li>Detección de errores en tiempo de desarrollo</li>
        <li>Mejor autocompletado en el IDE</li>
        <li>Refactoring más seguro</li>
        <li>Documentación automática del código</li>
      </ul>

      <h3>Configuración Inicial</h3>
      <pre><code># Instalar TypeScript
npm install -D typescript @types/node

# Crear tsconfig.json
npx tsc --init</code></pre>

      <h4>tsconfig.json básico</h4>
      <pre><code>{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}</code></pre>

      <h3>Tipos Básicos</h3>
      <pre><code>// Primitivos
let nombre: string = "Juan";
let edad: number = 25;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array&lt;string&gt; = ["Ana", "Luis"];

// Objetos
interface Usuario {
  id: number;
  nombre: string;
  email?: string; // Opcional
}

const usuario: Usuario = {
  id: 1,
  nombre: "María"
};</code></pre>

      <h3>Funciones Tipadas</h3>
      <pre><code>// Función con tipos
function saludar(nombre: string): string {
  return \`Hola, \${nombre}!\`;
}

// Arrow function
const multiplicar = (a: number, b: number): number =&gt; a * b;

// Función async
async function obtenerUsuario(id: number): Promise&lt;Usuario&gt; {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}</code></pre>

      <h3>Interfaces vs Types</h3>
      <pre><code>// Interface (extensible)
interface Animal {
  nombre: string;
}

interface Perro extends Animal {
  raza: string;
}

// Type (más flexible)
type Color = "rojo" | "verde" | "azul";
type Coordenada = [number, number];

// Union types
type EstadoRequest = "loading" | "success" | "error";</code></pre>

      <h3>Generics</h3>
      <pre><code>// Función genérica
function identidad&lt;T&gt;(arg: T): T {
  return arg;
}

// Interface genérica
interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
}

// Uso
const respuestaUsuario: ApiResponse&lt;Usuario&gt; = {
  data: { id: 1, nombre: "Pedro" },
  status: 200,
  message: "OK"
};</code></pre>

      <h3>Utility Types</h3>
      <pre><code>interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Partial - Hace todas las propiedades opcionales
type UsuarioActualizar = Partial&lt;Usuario&gt;;

// Pick - Selecciona propiedades específicas
type UsuarioPublico = Pick&lt;Usuario, "id" | "nombre"&gt;;

// Omit - Excluye propiedades específicas
type UsuarioSinPassword = Omit&lt;Usuario, "password"&gt;;</code></pre>

      <h3>Migración Gradual</h3>
      <h4>Paso 1: Renombrar archivos</h4>
      <pre><code># De .js a .ts
mv archivo.js archivo.ts

# Para archivos con JSX
mv componente.jsx componente.tsx</code></pre>

      <h4>Paso 2: Añadir tipos gradualmente</h4>
      <pre><code>// Antes (JavaScript)
function calcularTotal(items) {
  return items.reduce((sum, item) =&gt; sum + item.price, 0);
}

// Después (TypeScript)
interface Item {
  price: number;
  name: string;
}

function calcularTotal(items: Item[]): number {
  return items.reduce((sum, item) =&gt; sum + item.price, 0);
}</code></pre>

      <h3>Consejos para la Migración</h3>
      <ul>
        <li>Empieza con <code>"strict": false</code> y actívalo gradualmente</li>
        <li>Usa <code>any</code> temporalmente para código complejo</li>
        <li>Instala <code>@types/</code> para librerías de terceros</li>
        <li>Configura tu IDE para aprovechar TypeScript al máximo</li>
      </ul>

      <h3>Errores Comunes</h3>
      <ul>
        <li><strong>Sobre-tipar</strong>: No todo necesita tipos explícitos</li>
        <li><strong>Usar any</strong>: Evítalo en código de producción</li>
        <li><strong>Ignorar null/undefined</strong>: Usa optional chaining (?.) y nullish coalescing (??)</li>
      </ul>

      <h3>Conclusión</h3>
      <p>TypeScript mejora significativamente la experiencia de desarrollo y la calidad del código. La migración puede ser gradual, permitiendo adoptar TypeScript a tu propio ritmo.</p>
    `,
    category: "JavaScript",
  },
  {
    slug: "web-performance-optimization-2024",
    title: "Optimización de Performance Web: Técnicas Avanzadas para 2024",
    excerpt:
      "Estrategias modernas para mejorar la velocidad de carga y la experiencia de usuario en aplicaciones web.",
    date: "3 Dic 2024",
    author: "Roberto Silva",
    readTime: "13 min",
    tags: ["Performance", "Web Vitals", "Optimización"],
    content: `
      <h2>Core Web Vitals: Las Métricas que Importan</h2>
      <p>Google ha definido tres métricas clave para medir la experiencia de usuario:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint)</strong>: Tiempo de carga del elemento más grande (&lt; 2.5s)</li>
        <li><strong>FID (First Input Delay)</strong>: Tiempo de respuesta a la primera interacción (&lt; 100ms)</li>
        <li><strong>CLS (Cumulative Layout Shift)</strong>: Estabilidad visual durante la carga (&lt; 0.1)</li>
      </ul>

      <h3>Optimización de Imágenes</h3>
      <h4>Formatos Modernos</h4>
      <pre><code>&lt;picture&gt;
  &lt;source srcset="imagen.avif" type="image/avif"&gt;
  &lt;source srcset="imagen.webp" type="image/webp"&gt;
  &lt;img src="imagen.jpg" alt="Descripción" loading="lazy"&gt;
&lt;/picture&gt;</code></pre>

      <h4>Responsive Images</h4>
      <pre><code>&lt;img 
  src="imagen-800w.jpg"
  srcset="imagen-400w.jpg 400w,
          imagen-800w.jpg 800w,
          imagen-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="Imagen responsive"
  loading="lazy"
&gt;</code></pre>

      <h3>Code Splitting y Lazy Loading</h3>
      <h4>Dynamic Imports</h4>
      <pre><code>// Lazy loading de componentes
const LazyComponent = React.lazy(() =&gt; import('./LazyComponent'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Cargando...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}

// Lazy loading de librerías
async function loadChart() {
  const { Chart } = await import('chart.js');
  return Chart;
}</code></pre>

      <h4>Route-based Code Splitting</h4>
      <pre><code>// Next.js
const HomePage = dynamic(() =&gt; import('../pages/Home'));
const AboutPage = dynamic(() =&gt; import('../pages/About'));

// React Router
const Home = lazy(() =&gt; import('./Home'));
const About = lazy(() =&gt; import('./About'));</code></pre>

      <h3>Optimización de CSS</h3>
      <h4>Critical CSS</h4>
      <pre><code>/* Inline critical CSS */
&lt;style&gt;
  /* Estilos above-the-fold */
  .header { /* ... */ }
  .hero { /* ... */ }
&lt;/style&gt;

&lt;!-- Load non-critical CSS asynchronously --&gt;
&lt;link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'"&gt;</code></pre>

      <h4>CSS Containment</h4>
      <pre><code>.card {
  contain: layout style paint;
  /* Aísla el componente para mejor performance */
}

.list-item {
  contain: layout;
  /* Solo aísla el layout */
}</code></pre>

      <h3>JavaScript Performance</h3>
      <h4>Web Workers</h4>
      <pre><code>// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: largeDataSet });
worker.onmessage = (e) =&gt; {
  console.log('Resultado:', e.data);
};

// worker.js
self.onmessage = function(e) {
  const result = processLargeData(e.data);
  self.postMessage(result);
};</code></pre>

      <h4>Debouncing y Throttling</h4>
      <pre><code>// Debounce para búsquedas
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () =&gt; {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() =&gt; inThrottle = false, limit);
    }
  }
}</code></pre>

      <h3>Caching Strategies</h3>
      <h4>Service Worker</h4>
      <pre><code>// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', (event) =&gt; {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) =&gt; cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) =&gt; {
  event.respondWith(
    caches.match(event.request)
      .then((response) =&gt; response || fetch(event.request))
  );
});</code></pre>

      <h4>HTTP Caching Headers</h4>
      <pre><code># .htaccess
&lt;IfModule mod_expires.c&gt;
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
&lt;/IfModule&gt;</code></pre>

      <h3>Resource Hints</h3>
      <pre><code>&lt;!-- Preload critical resources --&gt;
&lt;link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin&gt;

&lt;!-- Prefetch likely next pages --&gt;
&lt;link rel="prefetch" href="/about"&gt;

&lt;!-- Preconnect to external domains --&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;

&lt;!-- DNS prefetch --&gt;
&lt;link rel="dns-prefetch" href="//example.com"&gt;</code></pre>

      <h3>Herramientas de Medición</h3>
      <ul>
        <li><strong>Lighthouse</strong>: Auditoría completa de performance</li>
        <li><strong>WebPageTest</strong>: Análisis detallado de carga</li>
        <li><strong>Chrome DevTools</strong>: Performance tab para profiling</li>
        <li><strong>Web Vitals Extension</strong>: Monitoreo en tiempo real</li>
      </ul>

      <h3>Checklist de Optimización</h3>
      <ul>
        <li>✅ Comprimir y minificar assets</li>
        <li>✅ Optimizar imágenes (formato, tamaño, lazy loading)</li>
        <li>✅ Implementar code splitting</li>
        <li>✅ Configurar caching apropiado</li>
        <li>✅ Usar CDN para assets estáticos</li>
        <li>✅ Minimizar JavaScript no crítico</li>
        <li>✅ Optimizar Web Fonts</li>
        <li>✅ Implementar Service Worker</li>
      </ul>

      <h3>Conclusión</h3>
      <p>La optimización de performance es un proceso continuo. Mide regularmente, identifica cuellos de botella y aplica las técnicas apropiadas. Recuerda que cada milisegundo cuenta para la experiencia de usuario.</p>
    `,
    category: "Performance",
  },
];

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

// Añadir función para obtener todas las categorías
export function getAllCategories(): string[] {
  const categories = posts.map((post) => post.category);
  return ["Todos", ...Array.from(new Set(categories))];
}

// Añadir función para filtrar posts por categoría
export function getPostsByCategory(category: string): Post[] {
  if (category === "Todos") {
    return getAllPosts();
  }
  return getAllPosts().filter((post) => post.category === category);
}
