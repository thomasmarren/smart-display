import { GoogleOAuthProvider } from "@react-oauth/google";
import { Display } from "../../components/Display";

const Root = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTH_CLIENT_ID as string}>
      <Display />
    </GoogleOAuthProvider>
  );
};

export default Root;
