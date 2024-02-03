// Import the useRouteError hook from 'react-router-dom' to access the error object from the router.
import { useRouteError } from 'react-router-dom';

// Define the ErrorPage component.
export default function ErrorPage() {
  const error = useRouteError(); // Use the useRouteError hook to get the current routing error.
  console.error(error); // Log the error object to the console for debugging purposes.

  // Return a simple error UI.
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
