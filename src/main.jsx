// Import React libraries for building the user interface.
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
// Import routing functionalities from React Router v6.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import CSS for styling the application.
import './index.css';
// Import components and their loaders/actions for routing.
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';

// Define the router with a structure specifying paths, components, loaders, and actions.
const router = createBrowserRouter([
  {
    path: '/', // Root path of the application.
    element: <Root />, // The main component that renders at the root path.
    errorElement: <ErrorPage />, // Component displayed in case of an error.
    loader: rootLoader, // Function to load data before rendering the Root component.
    action: rootAction, // Function for handling side effects at the root route.
    children: [
      // Define nested routes.
      { index: true, element: <Index /> }, // Index route for the root path.
      // Nested routes for handling contacts.
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
      },
    ],
  },
]);

// Render the application using ReactDOM.createRoot, enabling React 18's concurrent features.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> // Use the RouterProvider to make the
    router available throughout the application.
  </React.StrictMode>
);
