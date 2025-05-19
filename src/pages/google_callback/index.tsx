import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GoogleCallback = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!router.query.code) return;

    const getAccessToken = async () => {
      try {
        const response = await fetch(
          `/api/google_auth?${new URLSearchParams({
            code: router.query.code as string,
          })}`
        );
        const data = await response.json();
        if (data.isAuthenticated) {
          localStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("onSuccess");
        console.error(e);
      }
    };

    getAccessToken();
  }, [router.query.code]);

  if (isAuthenticated) return router.push("/display");

  return <div>Authenticating...</div>;
};

export default GoogleCallback;
