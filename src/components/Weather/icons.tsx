import styled from "styled-components";

export const Overcast = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
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
      <g filter="url(#blur)" id="cloudy">
        <g transform="translate(20,10)">
          <g className="am-weather-cloud-1">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#91C0F8"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-10,-8), scale(0.6)"
            />
          </g>
          <g className="am-weather-cloud-2">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const PartlyCloudy = styled(() => {
  return (
    <svg version="1.1" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          {/* <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer> */}
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#blur)" id="cloudy-day-1">
        <g transform="translate(20,10)">
          <g transform="translate(0,16)">
            <g className="am-weather-sun">
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
          <g className="am-weather-cloud-2">
            <path
              d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#C6DEFF"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
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

export const Sunny = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="64"
      height="64"
      viewBox="0 0 64 64"
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
      <g filter="url(#blur)" id="day">
        <g transform="translate(32,32)">
          <g className="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
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
      </g>
    </svg>
  );
};

export const WeatherIcon = ({ icon }: { icon?: string }) => {
  switch (icon) {
    case "overcast":
      return <Overcast />;
    case "partly_cloudy":
      return <PartlyCloudy />;
    case "sunny":
      return <Sunny />;
    default:
      return <Overcast />;
  }
};
