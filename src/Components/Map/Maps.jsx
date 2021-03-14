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
import kabupaten from "../../Static/Data/kabupatenkota.json";
import { connect } from "react-redux";
import {
  dataOnCard,
  getProfile,
  getLahan,
} from "../../Redux/Action/OptionMenuActions";
import MyLoader from "../Loader";

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
const CornMarker = new L.divIcon({
  className: "DivIcon",
  html: `<img src=${Corn} height="30px"/>` + "<span>Jagung</span>",
});
const RiceMarker = new L.divIcon({
  className: "DivIcon",
  html: `<img src=${Rice} height="30px"/>` + "<span>Padi</span>",
});

function Maps(props) {
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
  }, [props.clicked, props.petani, props.lahan]);

  const dataFiltered =
    props.id_filter == "0" || dataTabs === null
      ? dataTabs
      : dataTabs.filter((item) => {
          return (
            item.provinsi == props.id_filter ||
            item.kabupaten == props.id_filter ||
            item.kecamatan == props.id_filter ||
            item.desa == props.id_filter
          );
        });

  // console.log(dataFiltered, dataTabs);

  const [map, setMap] = useState(null);

  // const mapE = useMapEvents()

  // const centerMap = useEffect(() => {
  //   var i = 0;
  //   var loop = true;
  //   do {
  //     if (
  //       dataFiltered[i].latitude !== null &&
  //       dataFiltered[i].longtitude !== null
  //     ) {
  //       mapE.flyTo(dataFiltered[i].coordinate, 8);
  //       loop = false
  //     }
  //     console.log(dataFiltered[i])
  //     i++
  //   } while (loop);
  // }, [dataFiltered]);

  const MapsEachFeatures = (items, layer) => {
    const name = items.properties;
    // var length = 236 - name.length * 5;
    // layer.options.fillColor = `rgb(0,${length},0)`;
    layer.bindTooltip(
      name &&
        Object.keys(name).map((key, i) => {
          <p key={i}>
            <span>{key}</span> : <span>{name[key]}</span>
          </p>;
        })
    );
    layer.on({
      click: (e) => {},
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
      {/* {centerMap} */}
      <LayersControl position="bottomleft">
        {/* LayerBasic Start */}
        <LayersControl.BaseLayer checked={true} name="Option">
          <LayerGroup>
            {dataTabs === null
              ? null
              : dataFiltered.map((items, i) => {
                  return items.latitude === null ? null : (
                    <Marker
                      key={i}
                      position={items.coordinate}
                      icon={getMarker(items.kategori)}
                      divIcon
                      eventHandlers={{
                        click: (e) => {
                          props.dispatch(dataOnCard(items, true));
                          map.flyTo(e.latlng, 13);
                        },
                      }}
                    >
                      {/* {items.kategori === null ? null : (
                        <Tooltip>{items.kategori}</Tooltip>
                      )} */}
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
            data={kabupaten}
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
  return {
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
    panen: state.optionMenu.panen,
    clicked: state.optionMenu.clicked,
    id_filter: state.optionMenu.id_filter,
  };
}
export default connect(stateToProps)(Maps);
