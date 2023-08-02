# Notes App

The Notes App is a simple web application that allows users to manage their notes efficiently. Users can create, read, update, and delete notes, making it a convenient tool for organizing their thoughts and information.

## <b>Website </b>

You can access the web application by clicking [here.](https://notes-app-ecru-phi.vercel.app/)

## <b>Tech Stack</b>

- Node.js
- Express.js with Typescript
- React.js
- MongoDB

## <b> Features </b>

- Create, Read, Update, and Delete (CRUD) operations on notes
- User account creation and authentication
- Personalized accounts to save and organize notes
- Session and cookie-based authentication with Passport.js local strategy

## Getting started

To run the application locally, follow these steps:

1.  Clone the repository.
2.  Navigate to the project directory in your terminal.
3.  Install the required dependencies using the package manager of your choice (npm or yarn).

For the backend:

    cd backend
    npm install   # or yarn install
    npm start     # or yarn start

For the frontend:

    cd frontend
    npm install   # or yarn install
    npm start     # or yarn start

### <b>Authentication and Authorization</b>

The application implements authentication and authorization using Passport.js with a local strategy, which is session and cookie-based for improved security.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
