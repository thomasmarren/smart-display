import { WeatherCode } from "@/hooks/useWeather";
import styled from "styled-components";

export const Overcast = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${scale})`}
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g id="cloudy">
        <g transform="translate(20,10)">
          <g className="am-weather-cloud-1">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#91C0F8"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
              transform="translate(-10,-8), scale(0.6)"
            />
          </g>
          <g className="am-weather-cloud-2">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const PartlyCloudy = styled((props) => {
  return (
    <svg
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${props.scale})`}
    >
      <g id="cloudy-day-1">
        <g transform="translate(20,10)">
          <g transform="translate(0,16)">
            <g className="am-weather-sun">
              <g>
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(45)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(90)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(135)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(180)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(225)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(270)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(315)">
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
            </g>
            <circle
              cx="0"
              cy="0"
              fill="orange"
              r="5"
              stroke="orange"
              strokeWidth="2"
            />
          </g>
          <g className="am-weather-cloud-2">
            <path
              d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#C6DEFF"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
})`
  /*
** CLOUDS
*/
  @keyframes am-weather-cloud-2 {
    0% {
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }

    50% {
      -webkit-transform: translate(2px, 0px);
      -moz-transform: translate(2px, 0px);
      -ms-transform: translate(2px, 0px);
      transform: translate(2px, 0px);
    }

    100% {
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
  }

  .am-weather-cloud-2 {
    -webkit-animation-name: am-weather-cloud-2;
    -moz-animation-name: am-weather-cloud-2;
    animation-name: am-weather-cloud-2;
    -webkit-animation-duration: 3s;
    -moz-animation-duration: 3s;
    animation-duration: 3s;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  /*
** SUN
*/
  @keyframes am-weather-sun {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .am-weather-sun {
    -webkit-animation-name: am-weather-sun;
    -moz-animation-name: am-weather-sun;
    -ms-animation-name: am-weather-sun;
    animation-name: am-weather-sun;
    -webkit-animation-duration: 9s;
    -moz-animation-duration: 9s;
    -ms-animation-duration: 9s;
    animation-duration: 9s;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -ms-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  @keyframes am-weather-sun-shiny {
    0% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }

    50% {
      stroke-dasharray: 0.1px 10px;
      stroke-dashoffset: -1px;
    }

    100% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }
  }

  .am-weather-sun-shiny line {
    -webkit-animation-name: am-weather-sun-shiny;
    -moz-animation-name: am-weather-sun-shiny;
    -ms-animation-name: am-weather-sun-shiny;
    animation-name: am-weather-sun-shiny;
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    -ms-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -ms-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
`;

export const Sunny = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${scale})`}
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g id="day">
        <g transform="translate(32,32)">
          <g className="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
            <g>
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(45)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(90)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(135)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(180)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(225)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(270)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            <g transform="rotate(315)">
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
          </g>
          <circle
            cx="0"
            cy="0"
            fill="orange"
            r="5"
            stroke="orange"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
};

export const Night = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${scale})`}
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g id="night">
        <g transform="translate(20,20)">
          <g className="am-weather-moon-star-1">
            <polygon
              fill="orange"
              points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7"
              stroke="none"
              strokeMiterlimit="10"
            />
          </g>
          <g className="am-weather-moon-star-2">
            <polygon
              fill="orange"
              points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7"
              stroke="none"
              strokeMiterlimit="10"
              transform="translate(20,10)"
            />
          </g>
          <g className="am-weather-moon">
            <path
              d="M14.5,13.2c0-3.7,2-6.9,5-8.7   c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z"
              fill="orange"
              stroke="orange"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Rain = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${scale})`}
    >
      <g id="rainy-6">
        <g transform="translate(20,10)">
          <g>
            <path
              d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
        <g transform="translate(31,46), rotate(10)">
          <line
            fill="none"
            stroke="#FFF"
            stroke-dasharray="4,4"
            stroke-linecap="round"
            stroke-width="2"
            transform="translate(-4,1)"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
          <line
            fill="none"
            stroke="#FFF"
            stroke-dasharray="4,4"
            stroke-linecap="round"
            stroke-width="2"
            transform="translate(0,-1)"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
          <line
            fill="none"
            stroke="#FFF"
            stroke-dasharray="4,4"
            stroke-linecap="round"
            stroke-width="2"
            transform="translate(4,0)"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
        </g>
      </g>
    </svg>
  );
};

export const LightRain = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      transform={`scale(${scale})`}
    >
      <g id="rainy-3">
        <g transform="translate(20,10)">
          <g transform="translate(0,16)">
            <g>
              <g>
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(45)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(90)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(135)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(180)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(225)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(270)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
              <g transform="rotate(315)">
                <line
                  fill="none"
                  stroke="orange"
                  stroke-linecap="round"
                  stroke-width="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
            </g>
            <circle
              cx="0"
              cy="0"
              fill="orange"
              r="5"
              stroke="orange"
              stroke-width="2"
            />
          </g>
          <g>
            <path
              d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
        <g transform="translate(34,46), rotate(10)">
          <line
            fill="none"
            stroke="#FFF"
            stroke-dasharray="4,7"
            stroke-linecap="round"
            stroke-width="2"
            transform="translate(-6,1)"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
          <line
            fill="none"
            stroke="#FFF"
            stroke-dasharray="4,7"
            stroke-linecap="round"
            stroke-width="2"
            transform="translate(0,-1)"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
        </g>
      </g>
    </svg>
  );
};

export const WeatherIcon = ({
  icon,
  scale,
}: {
  icon?: WeatherCode;
  scale?: number;
}) => {
  switch (icon) {
    case WeatherCode.OVERCAST:
      return <Overcast scale={scale} />;
    case WeatherCode.PARTLY_CLOUDY:
      return <PartlyCloudy scale={scale} />;
    case WeatherCode.SUNNY:
      return <Sunny scale={scale} />;
    case WeatherCode.NIGHT:
      return <Night scale={scale} />;
    case WeatherCode.RAIN:
      return <Rain scale={scale} />;
    case WeatherCode.LIGHT_RAIN:
      return <LightRain scale={scale} />;
    default:
      return <PartlyCloudy scale={scale} />;
  }
};

export const Home = ({
  color = "#fff",
  scale = 1,
}: {
  color?: string;
  scale?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      transform={`scale(${scale})`}
    >
      <g transform="matrix(0.13904038 0 0 0.13904038 -0 7.001239E-05)">
        <g>
          <g>
            <path
              d="M230.149 120.939L65.986 256.274C 65.986 256.465 65.938 256.74597 65.842 257.129C 65.748 257.509 65.698006 257.785 65.698006 257.981L65.698006 257.981L65.698006 395.02197C 65.698006 399.96997 67.507 404.25797 71.12401 407.86896C 74.740005 411.48196 79.02201 413.29996 83.97101 413.29996L83.97101 413.29996L193.60101 413.29996L193.60101 303.664L266.698 303.664L266.698 413.30402L376.327 413.30402C 381.275 413.30402 385.563 411.49002 389.174 407.86902C 392.79102 404.26202 394.60602 399.971 394.60602 395.02203L394.60602 395.02203L394.60602 257.981C 394.60602 257.22098 394.502 256.64697 394.31802 256.274L394.31802 256.274L230.149 120.939z"
              stroke="none"
              fill={color}
              fill-rule="nonzero"
            />
            <path
              d="M457.122 225.438L394.6 173.476L394.6 56.989C 394.6 54.325996 393.74402 52.135998 392.026 50.421997C 390.322 48.709995 388.132 47.853996 385.463 47.853996L385.463 47.853996L330.647 47.853996C 327.98102 47.853996 325.792 48.709995 324.077 50.421997C 322.366 52.135998 321.511 54.326996 321.511 56.989L321.511 56.989L321.511 112.662L251.84898 54.417004C 245.76498 49.468002 238.53099 46.994003 230.15498 46.994003C 221.77998 46.994003 214.54698 49.468002 208.45699 54.417004L208.45699 54.417004L3.172 225.438C 1.2689999 226.95801 0.22599983 229.004 0.031999826 231.574C -0.16100018 234.142 0.5039998 236.38501 2.0289998 238.287L2.0289998 238.287L19.73 259.415C 21.255 261.127 23.251 262.174 25.726 262.557C 28.011 262.749 30.296 262.081 32.581 260.55902L32.581 260.55902L230.149 95.817L427.719 260.55798C 429.245 261.886 431.24 262.54898 433.715 262.54898L433.715 262.54898L434.573 262.54898C 437.044 262.17297 439.036 261.119 440.569 259.41098L440.569 259.41098L458.272 238.28598C 459.794 236.37997 460.461 234.14098 460.263 231.56998C 460.068 229.007 459.021 226.961 457.122 225.438z"
              stroke="none"
              fill={color}
              fill-rule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Snowflake = ({ scale = 1 }) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      transform={`scale(${scale})`}
    >
      <path
        d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"
        fill="#189ad3"
      />
    </svg>
  );
};

export const Flame = ({ scale = 1 }) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      transform={`scale(${scale})`}
    >
      <path
        d="m12 12.9-2.13 2.09c-.56.56-.87 1.29-.87 2.07C9 18.68 10.35 20 12 20s3-1.32 3-2.94c0-.78-.31-1.52-.87-2.07L12 12.9z"
        fill="#FFA52C"
      />
      <path
        d="m16 6-.44.55C14.38 8.02 12 7.19 12 5.3V2S4 6 4 13c0 2.92 1.56 5.47 3.89 6.86-.56-.79-.89-1.76-.89-2.8 0-1.32.52-2.56 1.47-3.5L12 10.1l3.53 3.47c.95.93 1.47 2.17 1.47 3.5 0 1.02-.31 1.96-.85 2.75 1.89-1.15 3.29-3.06 3.71-5.3.66-3.55-1.07-6.9-3.86-8.52z"
        fill="#FFA52C"
      />
    </svg>
  );
};

export const WaterDrop = ({ scale = 1 }) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      transform={`scale(${scale})`}
    >
      <path
        fill="#FFF"
        d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"
      ></path>
    </svg>
  );
};
