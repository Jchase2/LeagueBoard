import axios from "axios";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup
export async function signUp(user: string, pass: string) {
  return (
     axios
      .post(process.env.REACT_APP_BACKEND_URL + '/register' || 'localhost:3000/register', { user, pass })
      .then((res) => res.data)
  );
}


// Post request to login
export async function signIn(user: string, pass: string) {
  return (
    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/login' || 'localhost:3000/login', { user, pass })
      .then((res) => res.data)
  );
}
