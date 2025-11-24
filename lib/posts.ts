/* interface Post {
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
 */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  readTime: string;
  date: string;
  published: boolean;
}

export const posts: Post[] = [
  {
    id: "1",
    slug: "introduccion-react-hooks",
    title: "Introducción a React Hooks: useState y useEffect",
    excerpt: "Aprende los fundamentos de los Hooks más importantes de React y cómo transformarán tu forma de escribir componentes.",
    content: `# Introducción a React Hooks

Los Hooks son una característica de React que nos permite usar estado y otras características de React sin escribir una clase. En este artículo exploraremos los dos hooks más importantes: **useState** y **useEffect**.

## ¿Qué es useState?

\`useState\` es un hook que nos permite agregar estado a componentes funcionales. Veamos un ejemplo básico:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Has hecho click {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Haz click aquí
      </button>
    </div>
  );
}
\`\`\`

## ¿Qué es useEffect?

\`useEffect\` nos permite realizar efectos secundarios en componentes funcionales. Es similar a \`componentDidMount\`, \`componentDidUpdate\` y \`componentWillUnmount\` en componentes de clase.

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Este efecto se ejecuta después de cada renderizado
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    }

    fetchUser();
  }, [userId]); // Solo se re-ejecuta si userId cambia

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## Combinando ambos Hooks

Aquí tienes un ejemplo más complejo que combina ambos hooks:

\`\`\`jsx
import { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Cargar todos del localStorage al montar el componente
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Guardar en localStorage cuando los todos cambien
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={addTodo}>Agregar</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Conclusión

Los Hooks han revolucionado la forma en que escribimos componentes en React. \`useState\` y \`useEffect\` son solo el comienzo - hay muchos más hooks por explorar!`,
    category: "React",
    author: "Carlos García",
    tags: ["react", "hooks", "javascript", "frontend"],
    readTime: "8 min",
    date: "2024-01-15",
    published: true
  },
  {
    id: "2",
    slug: "typescript-tips-desarrollo",
    title: "TypeScript Tips para un Desarrollo Más Robusto",
    excerpt: "Descubre cómo TypeScript puede mejorar la calidad de tu código y prevenir errores comunes antes de que lleguen a producción.",
    content: `# TypeScript Tips para un Desarrollo Más Robusto

TypeScript se ha convertido en el estándar para el desarrollo de aplicaciones JavaScript a gran escala. En este artículo veremos tips prácticos para sacarle el máximo provecho.

## Tipado Estricto: Tu Mejor Amigo

Activar el modo estricto en tu \`tsconfig.json\` es el primer paso hacia código más seguro:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## Interfaces vs Types

¿Cuándo usar interfaces y cuándo usar types? Aquí una guía práctica:

\`\`\`typescript
// Usa interfaces para objetos y clases
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Propiedad opcional
}

interface Admin extends User {
  permissions: string[];
}

// Usa types para uniones, tuplas y mapeos
type Status = 'pending' | 'success' | 'error';

type ApiResponse<T> = {
  data: T;
  status: Status;
  timestamp: Date;
};

type UserRole = 'admin' | 'user' | 'guest';

// Función con tipos genéricos
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: 'Juan',
  email: 'juan@example.com'
};

const userName = getProperty(user, 'name'); // Tipo: string
\`\`\`

## Manejo Seguro de Datos Externos

Cuando trabajas con APIs, valida los datos que recibes:

\`\`\`typescript
// Zod para validación en runtime
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().optional()
});

type User = z.infer<typeof UserSchema>;

async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  
  try {
    return UserSchema.parse(data);
  } catch (error) {
    throw new Error('Datos de usuario inválidos');
  }
}

// Type guards personalizados
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  );
}
\`\`\`

## Utilidades Avanzadas de Types

TypeScript ofrece poderosas utilidades para transformar tipos:

\`\`\`typescript
// Utilidades built-in
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Hacer todas las propiedades opcionales
type PartialProduct = Partial<Product>;

// Seleccionar propiedades específicas
type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;

// Omitir propiedades
type ProductWithoutId = Omit<Product, 'id'>;

// Tipos condicionales
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Mapped types para crear utilidades personalizadas
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type ProductGetters = Getters<Product>;
// Equivale a:
// {
//   getId: () => number;
//   getName: () => string;
//   getPrice: () => number;
//   // ...
// }
\`\`\`

## Conclusión

TypeScript no solo agrega tipos, sino que transforma la forma en que diseñamos y pensamos sobre nuestro código. Estos tips te ayudarán a escribir código más mantenible y menos propenso a errores.`,
    category: "TypeScript",
    author: "Ana Martínez",
    tags: ["typescript", "tipado", "javascript", "desarrollo"],
    readTime: "10 min",
    date: "2024-01-12",
    published: true
  },
  {
    id: "3",
    slug: "tailwind-css-componentes-reutilizables",
    title: "Creando Componentes Reutilizables con Tailwind CSS",
    excerpt: "Aprende a construir una biblioteca de componentes consistentes y mantenibles utilizando las mejores prácticas de Tailwind CSS.",
    content: `# Creando Componentes Reutilizables con Tailwind CSS

Tailwind CSS es famoso por su utilidad-first, pero ¿cómo crear componentes mantenibles y reutilizables? En este artículo exploraremos patrones avanzados.

## Patrones de Componentes con Tailwind

### 1. Componente Button Reutilizable

\`\`\`jsx
// components/Button.jsx
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && disabledClasses,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={classes} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
\`\`\`

### 2. Uso del Componente Button

\`\`\`jsx
// Uso en tu aplicación
import Button from './components/Button';

function App() {
  return (
    <div className="p-6 space-y-4">
      <Button variant="primary" size="large">
        Botón Primario
      </Button>
      
      <Button variant="secondary" size="medium">
        Botón Secundario
      </Button>
      
      <Button variant="outline" size="small">
        Botón Outline
      </Button>
      
      <Button variant="danger" disabled>
        Botón Deshabilitado
      </Button>
    </div>
  );
}
\`\`\`

## Card Component con Variantes

\`\`\`jsx
// components/Card.jsx
const Card = ({ 
  children, 
  variant = 'default',
  padding = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-xl shadow-sm border';
  
  const variants = {
    default: 'bg-white border-gray-200',
    elevated: 'bg-white border-gray-200 shadow-lg',
    dark: 'bg-gray-800 border-gray-700 text-white'
  };
  
  const paddings = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };
  
  const classes = [
    baseClasses,
    variants[variant],
    paddings[padding],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={\`border-b border-gray-200 pb-4 mb-4 \${className}\`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={\`border-t border-gray-200 pt-4 mt-4 \${className}\`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
\`\`\`

## Uso del Card Component

\`\`\`jsx
import Card from './components/Card';

function UserProfile() {
  return (
    <Card variant="elevated" padding="large">
      <Card.Header>
        <h2 className="text-xl font-bold">Perfil de Usuario</h2>
      </Card.Header>
      
      <Card.Content>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Nombre</label>
            <p className="font-semibold">María González</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-semibold">maria@ejemplo.com</p>
          </div>
        </div>
      </Card.Content>
      
      <Card.Footer className="flex justify-end space-x-2">
        <Button variant="outline" size="small">
          Editar
        </Button>
        <Button variant="primary" size="small">
          Guardar
        </Button>
      </Card.Footer>
    </Card>
  );
}
\`\`\`

## Configuración de Tailwind para Componentes

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};
\`\`\`

## Conclusión

Crear componentes reutilizables con Tailwind CSS requiere pensar en términos de variantes y composición. Estos patrones te permitirán mantener la consistencia visual mientras aprovechas la flexibilidad de Tailwind.`,
    category: "CSS",
    author: "David López",
    tags: ["tailwind", "css", "componentes", "frontend", "design"],
    readTime: "12 min",
    date: "2024-01-10",
    published: true
  }
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
