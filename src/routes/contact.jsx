// Import hooks and components from react-router-dom and utility functions from contacts module.
import { Form, useFetcher, useLoaderData } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

// Action function for handling form submissions related to contact updates.
export async function action({ request, params }) {
  let formData = await request.formData(); // Extracts form data from the request.
  // Updates the contact's 'favorite' status based on form data and returns the update operation's result.
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

// Loader function to fetch and return contact data before the component mounts.
export async function loader({ params }) {
  const contact = await getContact(params.contactId); // Retrieves contact data using the contact ID.
  // Throws a 404 error if the contact is not found.
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { contact }; // Returns the contact data for use in the component.
}

// Component for displaying a contact's details.
export default function Contact() {
  const { contact } = useLoaderData(); // Retrieves data loaded by the loader function.

  // Renders the contact's information, including avatar, name, Twitter link, notes, and edit/delete buttons.
  return (
    <div id="contact">
      <div>
        {/* Displays the contact's avatar. */}
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          alt="Contact Avatar"
        />
      </div>

      <div>
        {/* Displays the contact's name or a placeholder if not available. */}
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          {/* Integrates the Favorite button component. */}
          <Favorite contact={contact} />
        </h1>

        {/* Conditionally renders the contact's Twitter link. */}
        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noopener noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {/* Displays any notes associated with the contact. */}
        {contact.notes && <p>{contact.notes}</p>}

        {/* Provides buttons to edit or delete the contact. */}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              // Confirm before submitting the form to delete the contact.
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Component for toggling a contact's favorite status.
function Favorite({ contact }) {
  const fetcher = useFetcher(); // Use useFetcher hook for optimistic UI updates.
  let favorite = contact.favorite;
  // Determines the favorite status based on fetcher's form data or initial contact data.
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  // Renders a button to toggle the favorite status, using the fetcher.Form for optimistic UI.
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
