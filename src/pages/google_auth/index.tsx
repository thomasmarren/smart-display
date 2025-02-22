import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const GoogleAuth = () => {
  const { authorizationUrl } = useIsAuthenticated({ returnUrl: true });
  return (
    <Container>
      <a
        style={{
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        href={authorizationUrl}
      >
        Authorize Google Photos & Calendar
      </a>
    </Container>
  );
};

export default GoogleAuth;
