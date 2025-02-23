import { GoogleOAuthProvider } from "@react-oauth/google";
import { Display } from "../../components/Display";

export async function getServerSideProps({
  req,
}: {
  req: { headers: { "x-forwarded-for": string } };
}) {
  // 'x-forwarded-for' might be a comma-separated list if behind a proxy.
  const forwarded = req.headers["x-forwarded-for"];
  console.log("req.headers", req.headers);

  return {
    props: {},
  };
}

const Root = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTH_CLIENT_ID as string}>
      <Display />
    </GoogleOAuthProvider>
  );
};

export default Root;
