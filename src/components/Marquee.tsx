import styled from "styled-components";

export const Marquee = styled("div")`
  position: absolute;
  bottom: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-family: "Lato";

  background-color: white;
  color: black;

  p {
    display: inline-block;
    padding-left: 50%;
    animation: marquee 30s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
`;
