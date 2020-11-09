mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFucy1yaXR0ZXIiLCJhIjoiY2thaHduaTVhMDY5NzJ6bnVodzhicDliZCJ9.LyrzN5YFU4oXvPGhyrq_Og";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-71.157895, 42.707741]
});

const getStores = async () => {
  const response = await (await fetch("/api/v1/stores")).json();

  console.log(response);

  const stores = response.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: { storeId: store.storeId, icon: "shop" }
    };
  });

  loadMap(stores);
};

const loadMap = stores => {
  map.on("load", () => {
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: stores
      }
    });

    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
};

getStores();
