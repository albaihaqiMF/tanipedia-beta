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
  useMapEvents,
} from "react-leaflet";
import L, { geoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import DataMap from "./../../Static/Data/dataCoba.json";
import PictMarker from "../../Images/tanipedia-marker.png";
import Corn from "../../Images/corn.png";
import Rice from "../../Images/rice.png";
import provinsi from "../../Static/Data/provinsi.json";
import { connect } from "react-redux";
import { dataOnCard } from "../../Redux/Action/OptionMenuActions";

const geoJsonStyle = {
  fillColor: "crimson",
  fillOpacity: ".8",
  color: "black",
  weight: "0.5",
};

const myMarker = new L.icon({
  iconUrl: PictMarker,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});
const CornMarker = new L.icon({
  iconUrl: Corn,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});
const RiceMarker = new L.icon({
  iconUrl: Rice,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

var color = ["#80ff80", "#4dff4d", "#1aff1a", "#00e600", "#00b300"];

function Maps(props) {
  const [dataMap, setDataMap] = useState(null);
  const [dataTabs, setdataTabs] = useState(props.petani);
  useEffect(() => {
    switch (props.clicked) {
      case 0:
        setdataTabs(props.petani);
        break;
      case 1:
        setdataTabs(props.lahan);
        break;
      case 2:
        setdataTabs(props.panen);
        break;
      default:
        break;
    }
  }, [props.clicked]);

  // console.log(props.petani, "petani");
  const [map, setMap] = useState(null)

  const MapsEachFeatures = (items, layer) => {
    const name = items.properties.NAME_1;
    var length = 236 - name.length * 5;
    layer.options.fillColor = `rgb(0,${length},0)`;
    layer.bindTooltip(name + " " + name.length);
    layer.on({
      click: (e) => {
        map.flyTo(e.latlng, 5)
      },
    });
  };

  function getMarker(kategori) {
    switch (kategori) {
      case "Padi":
        return RiceMarker;
        break;
      case "Jagung":
        return CornMarker;
      default:
        return myMarker;
        break;
    }
  }
  return (
    <MapContainer
      className="Map"
      center={[-1, 116.3671875]}
      zoom={5.3}
      scrollWheelZoom={true}
      zoomControl={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="bottomright">
        {/* LayerBasic Start */}
        <LayersControl.BaseLayer checked={true} name="Option">
          <LayerGroup>
            {dataTabs === null
              ? null
              : dataTabs.map((items, i) => {
                  return items.latitude === null ? null : (
                    <Marker
                      key={i}
                      position={items.coordinate}
                      icon={getMarker(items.kategori)}
                      eventHandlers={{
                        click: (e) => {
                          props.dispatch(dataOnCard(items, true));
                          map.flyTo(e.latlng, 13);
                        },
                      }}
                    >
                      {items.kategori === null ? null : (
                        <Tooltip>{items.kategori}</Tooltip>
                      )}
                    </Marker>
                  );
                })}
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={props.clicked == 2 ? true : false}
          name="GeoJSON"
        >
          <GeoJSON
            style={geoJsonStyle}
            data={provinsi}
            onEachFeature={MapsEachFeatures}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {/* LayerBasic End */}

      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}
function stateToProps(state) {
  // console.log(state.optionMenu);
  return {
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
    panen: state.optionMenu.panen,
    clicked: state.optionMenu.clicked,
  };
}
export default connect(stateToProps)(Maps);
