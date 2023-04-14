import styled from "styled-components";
import { Clock } from "./Time/Clock";

export const Sleep = styled((props) => {
  const day = new Date().getDate();
  const text = day % 2 === 0 ? "Goodnight" : "Buenas noches";
  return (
    <div {...props}>
      <div>{text}</div>
      <Clock style={{ marginTop: "25px", fontSize: "75px" }} />
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #777;
  background-color: black;
  font-family: Roboto;
  font-size: 100px;
`;
