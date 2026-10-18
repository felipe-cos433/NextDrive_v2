# 🏎️ NextDrive - Concesionario Digital & Plataforma E-Commerce

**NextDrive** es una aplicación web e-commerce de última generación diseñada para la exploración, comparación, financiación y reserva simulada de vehículos de alta gama. Cuenta con un diseño inmersivo, gestión avanzada de estado global mediante Context API, un panel de administración completo y exportación automatizada de reportes comerciales en Excel (`.xlsx`).

---

## ✨ Características Principales

* **🚗 Catálogo Dinámico:** Filtrado avanzado por marcas, categorías (Deportivo, SUV, Sedán, Eléctrico) y rangos de precio personalizados.
* **🔍 Detalle e Interacción de Vehículos:** Vistas individuales con especificaciones técnicas detalladas, galería de imágenes y simulador de financiación integrado.
* **🛒 Carrito de Compras (`CartDrawer`):** Drawer lateral flotante para gestión de ítems seleccionados con cálculo de totales en tiempo real.
* **📋 Checkout Modal con Captura de Datos:** Formulario interactivo para registrar los datos del cliente (Nombre, Cédula/ID, Ciudad y Teléfono) con confirmación de compra y descarga automática de comprobante en formato `.xlsx`.
* **📊 Panel de Administración (`AdminDashboard`):**
  * **Gestión de Inventario:** Altura, edición y eliminación de vehículos activos en tiempo real.
  * **Historial Global de Ventas:** Registro detallado de todas las órdenes procesadas por los clientes mediante `localStorage`.
  * **Exportación Masiva:** Botón exclusivo para descargar el reporte consolidado de ventas en Excel.
* **🛡️ Autenticación y Rutas Protegidas (`ProtectedRoute`):** Control de acceso por roles (Administrador vs. Usuario estándar) y gestión de sesiones mediante `AuthContext`.
* **🎨 UI/UX Inmersiva:** Estilos optimizados con Tailwind CSS, fondos de video dinámicos en alta definición (`mixkit`) y efectos de gradiente.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React (Vite)
* **Estilos:** Tailwind CSS
* **Enrutamiento:** React Router DOM (v6 con soporte de banderas futuras)
* **Gestión de Estado (Context API):** 
  * `AuthContext` (Sesión y roles de usuario)
  * `CarContext` (Catálogo e inventario global)
  * `CartContext` (Gestión de carrito de compras)
  * `FavoritesContext` (Vehículos guardados como favoritos)
  * `AppointmentContext` (Gestión de citas y test drives)
* **Librerías de Terceros:** `xlsx` (SheetJS para la generación y descarga de reportes en Excel)
* **Persistencia de Datos:** `localStorage`

---

## 📂 Estructura del Proyecto

```text
NextDrive_v2/
├── public/                  # Recursos estáticos y multimedia
├── src/
│   ├── components/          # Componentes reutilizables de UI
│   │   ├── common/          # Elementos genéricos y compartidos
│   │   ├── Navbar.jsx       # Barra de navegación principal y estado de sesión
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── CartDrawer.jsx   # Drawer lateral del carrito
│   │   ├── CheckoutModal.jsx# Modal de pago, captura de datos y exportación
│   │   └── ProtectedRoute.jsx# Control de rutas seguras por rol
│   ├── context/             # Proveedores de estado global (Auth, Car, Cart, etc.)
│   ├── pages/               # Vistas principales de la aplicación
│   │   ├── Home.jsx         # Página de inicio
│   │   ├── Catalog.jsx      # Catálogo de vehículos
│   │   ├── CarDetail.jsx    # Vista detallada por vehículo
│   │   ├── Compare.jsx      # Comparador de modelos
│   │   ├── Financing.jsx    # Simulador de créditos vehiculares
│   │   ├── Contact.jsx      # Formulario de contacto y soporte
│   │   ├── Login.jsx        # Acceso de usuarios
│   │   ├── Register.jsx     # Registro de nuevos clientes
│   │   └── AdminDashboard.jsx# Panel de control e historial de ventas
│   ├── utils/               # Funciones de apoyo (ej. exportToExcel.js)
│   ├── App.jsx              # Configuración principal de rutas y anidación de providers
│   ├── main.jsx             # Punto de montaje de React
│   └── index.css            # Estilos globales y configuración de Tailwind
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación oficial del repositorio