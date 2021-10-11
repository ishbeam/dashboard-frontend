import { locationsList } from "./constants";
import { createLocationObject } from "./helper";

const directions = [
  {
    from: locationsList.Grassroots,
    to: locationsList.Client,
    strokeColor: "#000000"
  },
];
const DummyLocations = directions.map(elem => {
  return createLocationObject(
    elem.from.latLng,
    elem.from.title,
    elem.to.latLng,
    elem.to.title,
    elem.strokeColor
  );
});

export default DummyLocations;
