# AiEcoShop

A full-stack web application built with React, Vite, and Express.

## Prerequisites

- Node.js (v20 or newer recommended)
- npm

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm run dev
```
The server will start on `http://localhost:5001` (or the port specified in your environment variables). This command runs both the Vite frontend and the Express backend concurrently.

## Available Scripts

- `npm run dev`: Starts the development server with hot-module replacement.
- `npm run build`: Builds the client and server for production.
- `npm start`: Runs the production build.
- `npm run check`: Runs TypeScript type checking.

## Project Structure

- `client/`: Contains the frontend React application powered by Vite.
  - `src/components/`: Reusable React components.
  - `src/pages/`: Application pages.
  - `src/hooks/`: Custom React hooks.
  - `src/lib/`: Utility functions and service integrations.
- `server/`: Contains the Express backend application.
  - `controllers/`: HTTP request/response handlers.
  - `services/`: Core business logic and data manipulation.
  - `routes/`: API endpoint definitions.
- `shared/`: Contains shared TypeScript interfaces and database schemas used by both frontend and backend.
- `attached_assets/`: Static assets such as images.

## Environment Variables

To configure the application, you can create a `.env` file in the root directory.

- `PORT`: The port on which the server will listen (defaults to 5001).
