import React, { useCallback, useEffect, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import DataMap from "./../../Data/dataCoba.json";
import PictMarker from "../../Images/marker.png";

const myMarker = new L.icon({
  iconUrl: PictMarker,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FlyingTo({ props }) {
  const map = useMap();

  useEffect(() => {
    props && props === null
      ? map.flyTo([0, 0], 2)
      : map.flyTo(props, 13);
  }, [props]);
  console.log("flying");
  return null;
}

export default function Maps(props) {
  const [dataMap, setDataMap] = useState(null);
  useEffect(() => {
    setDataMap(props.data);
  }, [props.data]);
  return (
    <MapContainer
      className="Map"
      center={[-5.42615, 105.269698]}
      zoom={9}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl>
        <LayersControl.Overlay name="Marker">
          <LayerGroup>
            {DataMap &&
              DataMap.map((items) => {
                return (
                  <Marker position={items.center} icon={myMarker}>
                    <Tooltip>{items.location}</Tooltip>
                  </Marker>
                );
              })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Polygon">
          <LayerGroup>
            {DataMap &&
              DataMap.map((items) => {
                return (
                  <Polygon positions={items.polygon}>
                    <Tooltip>{items.location}</Tooltip>
                  </Polygon>
                );
              })}
            {/* <Polygon positions={DataMap[2].polygon}/> */}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Filter">
          <LayerGroup>
            {/* <FlyingTo props={props.dataMap.center} /> */}
            {dataMap && console.log(dataMap[0].center)}
            {dataMap &&
              dataMap.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    position={item.center}
                    icon={myMarker}
                  ></Marker>
                );
              })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
