import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

// Define the action function for the destroy route.
export async function action({ params }) {
  throw new Error('oh dang!');
  await deleteContact(params.contactId);
  return redirect('/');
}
