import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/auth/useRefreshToken";
import { useAuth } from "../../hooks/auth/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { username, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!username && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [username, persist, refresh]);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`user: ${username}`);
  // }, [isLoading, username]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
