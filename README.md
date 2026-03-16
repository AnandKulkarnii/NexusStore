# NexusStore

NexusStore is a modern, enterprise-ready e-commerce Single Page Application (SPA). It demonstrates a clean separation of concerns by utilizing a React frontend paired with a robust ASP.NET Core REST API backend.

## Architecture Highlights

This project follows an API-first approach, decoupling the presentation layer from the business logic and adhering to industry-standard architectural patterns.

### Frontend (React SPA)
The frontend is built using **React 18** and **Vite** for rapid bundling and hot module replacement. 

Features include:
* **Feature-Sliced Design Approach**: Components are logically grouped into `features`, `components/layout`, `pages`, `hooks`, and `context`.
* **Client-Side State Management**: Uses React Context (`CartContext`, `AuthContext`) for real-time synchronization with `localStorage`.
* **Responsive & Accessible UI**: Implemented with pure vanilla CSS, focusing on modern aesthetics (glassmorphism, subtle animations, cross-device scaling).
* **Robust Routing**: `react-router-dom` handles client-side page transitions globally.
* **API Integration**: Global `axios` interceptors automatically inject JWT tokens into protected API calls.

### Backend (ASP.NET Core REST API)
The backend `PublicApi` exposes a clean set of endpoints to serve the storefront, catalog, and identity capabilities.

Features include:
* **Clean Architecture**: Domain complexities are abstracted inside `ApplicationCore`. Data persistence logic is isolated inside the `Infrastructure` project.
* **Bounded Contexts**: Separation between Identity, Catalog, and Ordering operations.
* **Minimal APIs & Controllers**: Modern .NET 8 routing capabilities to handle incoming requests efficiently.
* **JWT Authentication**: Secure stateless session management implemented end-to-end.
* **Specification Pattern**: Dynamic payload filtering (e.g., catalog brands, pagination) mapped using strongly-typed Specifications.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/en) (v18+)

### 1. Run the Backend API
Navigate to the `PublicApi` project and start the server:

```bash
cd src/PublicApi
dotnet run
```
The server will boot and begin listening for requests (typically on `https://localhost:5099`).

### 2. Run the Frontend React App
Navigate to the `WebUI` directory, install dependencies, and start the Vite dev server:

```bash
cd src/WebUI
npm install
npm run dev
```

The React frontend handles routing to the backend API natively via its Vite proxy configuration.

### 3. Usage
Navigate to the URL provided by Vite (e.g. `http://localhost:5173`). 
* **Guest Users**: Can browse the catalog, filter products, and add items to their cart.
* **Registered Users**: Can securely log in via the mocked identity endpoint and view mocked order histories.

## Testing

The solution includes comprehensive testing architectures.
To execute tests, use the .NET CLI at the solution root:

```bash
dotnet test NexusStore.sln
```

- **Unit Tests**: Isolated logic testing spanning the `ApplicationCore`.
- **Integration Tests**: Data-layer lifecycle verifications.

---
*Developed with a focus on writing maintainable, scalable software.*
