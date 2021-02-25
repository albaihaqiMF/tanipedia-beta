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
  GeoJSON,
} from "react-leaflet";
import L, { geoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import DataMap from "./../../Static/Data/dataCoba.json";
import PictMarker from "../../Images/marker.png";
import dataGeoJSON from "../../Static/Data/dataGeoJson.json";
import provinceLampung from "../../Static/Data/indonesia-province.json";
import { connect } from "react-redux";

const geoJsonStyle = {
  fillColor: "crimson",
  fillOpacity: ".8",
  color: "black",
  weight: "0.5",
};

const myMarker = new L.icon({
  iconUrl: PictMarker,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FlyingTo({ props }) {
  const map = useMap();

  useEffect(() => {
    props && props === null ? map.flyTo([0, 0], 2) : map.flyTo(props, 13);
  }, [props]);
  console.log("flying");
  return null;
}
var color = ["#80ff80", "#4dff4d", "#1aff1a", "#00e600", "#00b300"];

function Maps(props) {
  const [dataMap, setDataMap] = useState(null);
  useEffect(() => {
    setDataMap(props.data);
  }, [props.data]);

  const MapsEachFeatures = (items, layer) => {
    const provinsi = items.properties.Propinsi;
    const map = useMap();
    const polygon = items.geometry.coordinates;

    var length = 256 - provinsi.length;
    layer.options.fillColor = `rgb(0,${length},0)`;
    layer.bindTooltip(provinsi + " " + provinsi.length);

    layer.on({
      click: () => {
        console.log(polygon);
      },
    });
  };
  return (
    <MapContainer
      className="Map"
      center={[-1, 116.3671875]}
      zoom={5.3}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="bottomright">
        <LayersControl.Overlay name="Marker">
          <LayerGroup>
            {DataMap &&
              DataMap.map((items, i) => {
                return (
                  <Marker key={i} position={items.center} icon={myMarker}>
                    <Tooltip>{items.location}</Tooltip>
                  </Marker>
                );
              })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Polygon">
          <LayerGroup>
            {DataMap &&
              DataMap.map((items, i) => {
                return (
                  <Polygon key={i} positions={items.polygon}>
                    <Tooltip>{items.location}</Tooltip>
                  </Polygon>
                );
              })}
            {/* <Polygon positions={DataMap[2].polygon}/> */}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.BaseLayer name="Filter">
          <LayerGroup>
            {dataMap &&
              dataMap.map((item, id) => {
                return (
                  <Marker
                    key={id}
                    position={item.center}
                    icon={myMarker}
                  ></Marker>
                );
              })}
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="GeoJSON">
          <GeoJSON
            style={geoJsonStyle}
            data={provinceLampung}
            onEachFeature={MapsEachFeatures}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}
export default connect()(Maps);
