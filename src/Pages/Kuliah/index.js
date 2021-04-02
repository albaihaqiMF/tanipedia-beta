import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import data from "./Unila.json";
import building from "./building.png";
import monument from "./fountain.png";
import dots from "./black-circle.png";

var centerMap = [-5.3645, 105.2434];
var zoom = 16.5;
const geoJsonStyle = {
  fillColor: "crimson",
  fillOpacity: ".8",
  color: "black",
  weight: "0.5",
};

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter());
  const [zoomScale, setZoomScale] = useState(map.getZoom());

  const onClick = useCallback(() => {
    map.flyTo(centerMap, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    setZoomScale(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      , zoom: {zoomScale}
      <button onClick={onClick}>reset</button>
    </p>
  );
}
export default function Kuliah() {
  const [map, setMap] = useState(null);
  const FeatureController = (items, layer) => {
    const properties = items.properties;
    console.log(items);
    if (properties.fill) {
      layer.options.fillColor = properties.fill;
    }
    if (items.geometry.type == "Point") {
      //   if (properties.cate == "monument") {
      //     layer.setIcon(
      //       new L.divIcon({
      //         className: "KuliahDiv",
      //         html:
      //           `<img src=${monument} height="35px"/>` +
      //           `<span>${properties.nama}</span>`,
      //       })
      //     );
      //   } else {
      //     layer.setIcon(
      //       new L.divIcon({
      //         className: "KuliahDiv",
      //         html:
      //           `<img src=${building} height="35px"/>` +
      //           `<span>${properties.nama}</span>`,
      //       })
      //     );
      //   }
      layer.setIcon(
        new L.divIcon({
          className: "KuliahDiv",
          html:
            `<img src=${dots} height="10px"/>` +
            `<span>${properties.nama}</span>`,
        })
      );
    }
    if (items.geometry.type == "Polygon") {
      layer
        .bindTooltip(properties.nama, { permanent: true, direction: "right" })
        .openTooltip();
    }
  };
  const MyMap = useMemo(() => {
    return (
      <MapContainer
        className="Map"
        center={centerMap}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        <LayersControl>
          <LayersControl.Overlay name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>
        </LayersControl>
        <GeoJSON
          style={geoJsonStyle}
          data={data}
          onEachFeature={FeatureController}
        />
      </MapContainer>
    );
  }, []);
  return (
    <>
      {map ? <DisplayPosition map={map} /> : null}
      {MyMap}
    </>
  );
}
