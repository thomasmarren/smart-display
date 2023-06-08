import { HttpMethod } from "@/constants";
import { useEffect, useState } from "react";

const Ecobee = () => {
  const [auth, setAuth] = useState<{ ecobeePin?: string; code?: string }>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getPin = async () => {
      try {
        const response = await fetch("/api/ecobee_auth");
        const data = await response.json();
        setAuth(data);
      } catch (e) {
        console.error("onError");
        console.error(e);
      }
    };

    getPin();
  }, []);

  const onFinish = async () => {
    await fetch("/api/ecobee_auth", {
      method: HttpMethod.POST,
      body: JSON.stringify({ code: auth.code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSuccess(true);
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Auth with Ecobee</h1>
      <h2>Pin: {auth.ecobeePin}</h2>
      <h2>Code: {auth.code}</h2>
      <button onClick={onFinish}>Finish</button>
      <br />
      {success && <div>Success!</div>}
    </div>
  );
};

export default Ecobee;
