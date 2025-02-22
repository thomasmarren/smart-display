import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

export const Stocks = () => {
  const [stock, setStock] = useState<{ time: number; close: number }[]>([]);

  useEffect(() => {
    fetch("/api/stocks").then((res) => {
      res.json().then((data) => {
        setStock(data);
      });
    });
  }, []);

  let min = stock[0]?.close;
  stock.forEach((s) => (min = s.close < min ? s.close : min));

  const options = {
    title: {
      text: "",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      type: "currency",
      title: {
        text: "Price",
      },
      min: min - 25,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "#456789"],
            [
              1,
              Highcharts.color(Highcharts?.getOptions()?.colors?.[0] as string)
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 0,
        },
        lineWidth: 1,
        threshold: 0,
      },
    },
    series: [
      {
        type: "area",
        data: stock.map((s) => [s.time, s.close]),
      },
    ],
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#000" }}>
      <div
        style={{
          fontFamily: "Lato",
          fontWeight: 700,
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF",
        }}
      >
        <h1 style={{ marginBottom: "0px" }}>VTI</h1>
        <h1>${stock[0]?.close}</h1>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { width: "100%" } }}
        options={options}
      />
    </div>
  );
};
