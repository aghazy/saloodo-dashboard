import Landing from './screens/Landing/Landing';
import Login from './screens/Login/Login';

import { useCallback, useEffect, useState } from "react";
import Dashboard from "./screens/Dashboard/Dashboard";
import currentAuthenticatedUser from "./utils/currentAuthenticatedUser";
import { Router } from '@reach/router';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';

export const SENDER = 'SENDER';
export const BIKER = 'BIKER';

const App = () => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Getting the current logged in user if exists
  const fetchUser = useCallback(async () => {
    setLoader(true);
    try {
      const model = await currentAuthenticatedUser();
      setUser(model);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, [setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Signing out the user and marking the user state as null
  const signOut = useCallback(async () => {
    Auth.signOut();
    setUser(null);
    navigate('/');
  }, [setUser]);

  // Logging in the user and setting the state of the user
  const login = useCallback(async (email, password) => {
    try {
      setLoginLoading(true);
      await Auth.signIn(email, password);
      const model = await currentAuthenticatedUser();
      setUser(model);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoginLoading(false);
    }
  }, [setUser]);

  // If the user exists and we are not in the loading phase then we display the dashboard
  if (user && !loader)  {
    return <Dashboard signOut={signOut} user={user} />;
  }

  return (
    <Router style={{ height: '100%' }}>
      <Login login={login} loading={loginLoading} path="/login" />
      <Landing path="/" />
    </Router>
  );
};

export default App;
