const key = process.env.GOOGLE_MAPS_KEY;

export const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  };
};

export const locationsList = {
  Grassroots: convertTolatLng("47.668711, -117.416709", "Grassroots"),
  Client: convertTolatLng("47.671103, -117.407828", "Client")
};