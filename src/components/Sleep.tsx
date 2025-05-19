import styled from "styled-components";
import { Clock } from "./Time/Clock";
import { useEffect, useState } from "react";

type Props = {
  onNext: () => void;
};

export const Sleep = styled(({ onNext, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/quotes/random");
        const data = await response.json();
        setQuote(data[0].content);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching quote:", e);
      }
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      onNext();
    }, 30000);

    return () => clearTimeout(interval);
  }, [onNext]);

  const day = new Date().getDate();
  const text = quote ? quote : day % 2 === 0 ? "Goodnight" : "Buenas noches";

  if (isLoading) return null;

  return (
    <div {...props}>
      <div>{text}</div>
      {/* <Clock style={{ marginTop: "25px", fontSize: "75px" }} /> */}
    </div>
  );
})`
  margin: 0 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  color: #777;
  background-color: black;
  font-family: Roboto;
  font-size: 32px;
`;
