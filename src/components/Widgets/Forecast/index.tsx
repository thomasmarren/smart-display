import { Clock as ClockComponent } from "@/components/Time/Clock";
import { WeatherIcon } from "@/components/Weather/icons";
import { useEcobee } from "@/hooks/useEcobee";
import { useWeather, WeatherCode } from "@/hooks/useWeather";
import { isNight, seconds } from "@/utils/dates";
import { animated, useSpring, useSprings } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Nighttime:
// background: linear-gradient(to bottom, #f0c27b, #4b1248);
// background: linear-gradient(to bottom, #4b6cb7, #182848);

// Partly Cloudy
// background: linear-gradient(to bottom, #efefbb, #d4d3dd);

// Sunny:
// background: linear-gradient(to bottom, #00d2ff, #3a7bd5);

// Overcast:
// background: linear-gradient(to bottom, #e6dada, #274046);

const Background = styled.div`
  background-color: #045de9;
  height: 100vh;
  width: 100vw;

  ${({ variant }: { variant: WeatherCode }) =>
    () => {
      return "background: linear-gradient(to bottom, #00d2ff, #3a7bd5);";
      // switch (variant) {
      //   case WeatherCode.SUNNY:
      //     return "background: linear-gradient(to bottom, #00d2ff, #3a7bd5);";
      //   case WeatherCode.PARTLY_CLOUDY:
      //     return "background: linear-gradient(to bottom, #efefbb, #d4d3dd);";
      //   case "night":
      //     return "background: linear-gradient(to bottom, #4b6cb7, #182848);";
      //   case WeatherCode.OVERCAST:
      //     return "background: linear-gradient(to top, #e6dada, #274046);";
      //   default:
      //     return "background: linear-gradient(to bottom, #00d2ff, #3a7bd5);";
      // }
    }}
`;

const Clock = styled((props) => (
  <div {...props}>
    <ClockComponent style={{ color: "#FFF", fontSize: "36px" }} />
  </div>
))`
  font-family Roboto;
  position absolute;
  right: 20px;
  text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 10px;
  top: 10px;
`;

const Container = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  width: 50%;
`;

const Current = styled(animated.div)`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  justify-content: center;
  height: 35%;
`;

const DateC = styled((props) => (
  <div {...props}>
    {new Date().toLocaleDateString("en-us", {
      weekday: "short",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })}
  </div>
))`
  color: #fff;
  font-family: Roboto;
  font-size: 32px;
  left: 20px;
  position: absolute;
  text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 10px;
  top: 10px;
`;

const Day = styled(animated.div)`
  text-align: right;
`;

const Daily = ({ base, daily }: { base: {}; daily: any }) => {
  const days = Object.keys(daily);

  const springs = useSprings(
    days.length,
    days.map((_, i) => ({ ...base, delay: seconds(0.2) * i }))
  );

  const elements = days.map((day) => (
    <div
      key={day}
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "5px",
      }}
    >
      <div style={{ fontSize: "24px", marginRight: "50px" }}>
        {new Date(day).toLocaleDateString("en-US", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <WeatherIcon icon={daily[day].icon} />
        </div>
        <div style={{ fontSize: "30px" }}>{daily[day].max}°</div>
        <div style={{ fontSize: "30px" }}>&nbsp;/&nbsp;</div>
        <div
          style={{
            fontSize: "30px",
          }}
        >
          {daily[day].min}°
        </div>
      </div>
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "65%",
        padding: "0 50px",
      }}
    >
      <Container>
        {springs.slice(0, 5).map((s, i) => {
          return (
            <Day key={`day-${i}`} style={s}>
              {elements[i]}
            </Day>
          );
        })}
      </Container>
      <Container>
        {springs.slice(5, 10).map((s, i) => {
          return (
            <Day key={`day-${i + 5}`} style={s}>
              {elements[i + 5]}
            </Day>
          );
        })}
      </Container>
    </div>
  );
};

export const Forecast = ({ onNext }: { onNext: () => void }) => {
  const [forecastView, setForecastView] = useState("hourly");
  const {
    dailyForecast: daily,
    current: { max, min, icon, temperature },
    hourlyForecast: hourly,
    loading,
  } = useWeather();
  const { data: thermostat } = useEcobee();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (forecastView === "daily") {
        onNext();
        return;
      }

      setForecastView("daily");
    }, seconds(15));

    return () => clearTimeout(timeout);
  });

  const base = {
    from: { opacity: 0, transform: "translateX(-10px)" },
    to: { opacity: 1, transform: "translateX(10px)" },
  };

  const hours = Object.keys(hourly)
    .filter((_, i) => i % 2 === 0)
    .slice(0, 10);

  const hourlySprings = useSprings(
    hours.length,
    hours.map((_, i) => ({ ...base, delay: seconds(0.2) * i }))
  );

  const currentSpring = useSpring(base);

  const hourlyElements = hours.map((hour) => (
    <div
      key={hour}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "24px", marginRight: "50px" }}>
        {new Date(hour).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <WeatherIcon icon={hourly[hour].icon} />
        </div>
        <div style={{ fontSize: "30px" }}>{hourly[hour].temperature}°</div>
      </div>
    </div>
  ));

  if (loading) return null;

  return (
    <Background variant={isNight() ? WeatherCode.NIGHT : icon}>
      <DateC />
      <Clock />
      <Current style={currentSpring}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "100px",
            textShadow: "rgba(0, 0, 0, 0.4) 1px 1px 10px",
            lineHeight: "90px",
            marginBottom: "10px",
          }}
        >
          <WeatherIcon icon={icon} scale={2} />
          <span style={{ margin: "0 25px" }}>{temperature}°</span>
        </div>
        <div style={{ fontSize: "30px" }}>
          L: {min}° H: {max}°
        </div>
      </Current>
      {forecastView === "hourly" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "65%",
            padding: "0 150px",
          }}
        >
          <Container>
            {hourlySprings.slice(0, 5).map((s, i) => {
              return (
                <Day key={`day-${i}`} style={s}>
                  {hourlyElements[i]}
                </Day>
              );
            })}
          </Container>
          <Container>
            {hourlySprings.slice(5, 10).map((s, i) => {
              return (
                <Day key={`day-${i + 5}`} style={s}>
                  {hourlyElements[i + 5]}
                </Day>
              );
            })}
          </Container>
        </div>
      )}
      {forecastView === "daily" && <Daily base={base} daily={daily} />}
    </Background>
  );
};
