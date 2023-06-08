import React, { createContext, useContext, useState } from "react";

type Provider = {
  widget: Widgets;
  setWidget: (v: Widgets) => void;
};

export enum Widgets {
  PhotoSlides = "PhotoSlides",
  Forecast = "Forecast",
  Holidays = "Holidays",
}

const WidgetContext = createContext({} as Provider);

const WidgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [widget, setWidget] = useState(Widgets.PhotoSlides);

  return (
    <WidgetContext.Provider
      value={{
        widget,
        setWidget,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export const useCurrentWidget = () => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error("useCurrentWidget must be used within a WidgetProvider");
  }
  return context;
};

export default WidgetProvider;
