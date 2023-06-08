import {
  useCurrentWidget,
  Widgets as IWidgets,
} from "@/contexts/WidgetProvider";
import { Forecast } from "./Forecast";
import { Holidays } from "./Holidays";
import { PhotoSlides } from "./PhotoSlides";

export const Widgets = () => {
  const { widget, setWidget } = useCurrentWidget();

  const onNext = () => {
    if (widget === IWidgets.PhotoSlides) {
      setWidget(IWidgets.Forecast);
      return;
    }
    if (widget === IWidgets.Forecast) {
      setWidget(IWidgets.Holidays);
      return;
    }

    setWidget(IWidgets.PhotoSlides);
  };

  const widgets: {
    [key: string]: () => JSX.Element;
  } = {
    PhotoSlides: () => (
      <PhotoSlides key="widget-1" slideshowSpeedSeconds={10} onNext={onNext} />
    ),
    Forecast: () => <Forecast key="widget-2" onNext={onNext} />,
    Holidays: () => <Holidays key="widget-3" onNext={onNext} />,
  };

  const Widget = widgets[widget];

  // return <Holidays onNext={() => {}} />;
  return <Widget />;
};
