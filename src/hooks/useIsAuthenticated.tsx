import { HttpMethod } from "@/constants";
import { useEffect, useState } from "react";

export const useIsAuthenticated = () => {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const getIsAuthenticated = async () => {
      const response = await fetch("/api/google_auth");

      const data = await response.json();

      setIsAuthenticated(data.isAuthenticated);
    };

    getIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isAuthenticated === undefined || isAuthenticated) return;

    const getUrl = async () => {
      try {
        const response = await fetch("/api/google_auth", {
          method: HttpMethod.POST,
        });
        const data = await response.json();
        setAuthorizationUrl(data.url);
      } catch (e) {
        console.error("onSuccess");
        console.error(e);
      }
    };

    getUrl();
  }, [isAuthenticated]);

  const loading =
    isAuthenticated === undefined || (!isAuthenticated && !authorizationUrl);

  return { authorizationUrl, loading, isAuthenticated };
};
