import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  CardHeader,
} from "reactstrap";
import "./cardMaps.css";
import padi from "../../../../Images/padi.jpg";
import { dataOnCard } from "../../../../Redux/Action/OptionMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCoffee,
  faLeaf,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMapPin,
  faPhone,
  faSeedling,
  faTimes,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import titleCase from "../../../../Function/CapitalizeEachWord";

const CardMaps = (props) => {
  const [cardOpen, setcardOpen] = useState(false);
  const [startY, setStartY] = useState(null);
  useEffect(() => {
    setcardOpen(props.isCardOpen);
  }, [props]);
  const CardDisplay = cardOpen
    ? { opacity: "1", height: "35vh" }
    : { opacity: "0" };
  const [cardZoom, setCardZoom] = useState(null);
  // cardOpen && setCardZoom(null)
  const data = props.data;
  // console.log(data);

  const profileCard = data && (
    <>
      <CardBody style={{ padding: "0" }}>
        <Button
          size="sm"
          onClick={() => {
            props.dispatch(dataOnCard(null, false));
            setcardOpen(false);
          }}
          id="close-button"
        >
          <FontAwesomeIcon
            id="closeIcon"
            size="lg"
            icon={faTimes}
            color="red"
          />
        </Button>
        <CardImg height="150px" src={padi} />
      </CardBody>
      <CardTitle style={{ padding: "15px 10px" }} tag="h5">
        {data.nama}
      </CardTitle>
      <CardBody>
        <Table>
          <tbody>
            <tr title="Nomor NIK dan KK">
              <th scope="row">
                <FontAwesomeIcon size="lg" icon={faAddressCard} color="blue" />
              </th>
              <td>
                <p>
                  NIK : {data.nik ? data.nik : "-"}, KK :{" "}
                  {data.kk ? data.kk : "-"}
                </p>
              </td>
            </tr>
            <tr title="Wilayah">
              <th scope="row">
                <FontAwesomeIcon size="lg" icon={faMapMarkedAlt} color="blue" />
              </th>
              <td style={{ textAlign: "justify" }}>
                {data.provinsi === null &&
                  data.kabupaten === null &&
                  data.kecamatan === null &&
                  data.desa === null &&
                  "-"}
                {data.desa && titleCase(data.desa) + ", "}
                {data.kecamatan && titleCase(data.kecamatan) + ", "}
                {data.kabupaten && titleCase(data.kabupaten) + ", "}
                {data.provinsi && titleCase(data.provinsi)}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FontAwesomeIcon size="lg" icon={faPhone} color="blue" />
              </th>
              <td>{data.telp ? data.telp : "-"}</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
      <CardText></CardText>
    </>
  );

  const lahanCard = data && (
    <>
      <CardBody style={{ padding: "0" }}>
        <Button
          size="sm"
          onClick={() => {
            props.dispatch(dataOnCard(null, false));
            setcardOpen(false);
          }}
          id="close-button"
        >
          <FontAwesomeIcon
            id="closeIcon"
            size="lg"
            icon={faTimes}
            color="red"
          />
        </Button>
        <CardImg height="150px" src={padi} />
      </CardBody>
      <Table>
        <tbody>
          <tr title="Petani">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faUserAlt} color="blue" />
            </th>
            <td>{data.petani ? data.petani : "Tidak diketahui"}</td>
          </tr>
          <tr title="Jenis Pertanian">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faSeedling} color="green" />
            </th>
            <td>{data.kategori ? data.kategori : "Tidak diketahui"}</td>
          </tr>
          <tr title="Wilayah">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faMapMarkedAlt} color="blue" />
            </th>
            <td>
              {data.provinsi === null &&
                data.kabupaten === null &&
                data.kecamatan === null &&
                data.desa === null &&
                "-"}
              {data.desa && titleCase(data.desa) + ", "}
              {data.kecamatan && titleCase(data.kecamatan) + ", "}
              {data.kabupaten && titleCase(data.kabupaten) + ", "}
              {data.provinsi && titleCase(data.provinsi)}
            </td>
          </tr>
          <tr title="Alamat">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faMapPin} color="red" />
            </th>
            <td>{data.alamat ? data.alamat : "Tidak diketahui"}</td>
          </tr>
          <tr title="Usia Tanam">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faLeaf} color="green" />
            </th>
            <td>{data.usia_tanam ? data.usia_tanam + " bulan" : "-"}</td>
          </tr>
          {/* <tr title="Usia Tanam">
            <th scope="row">
              <FontAwesomeIcon size="lg" icon={faLeaf} color="green" />
            </th>
            <td>{data.usia_tanam ? data.usia_tanam + " bulan" : "-"}</td>
          </tr> */}
        </tbody>
      </Table>
    </>
  );

  const [myScreen, setMyScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMyScreen(window.innerWidth);
    });
  });
  return (
    data && (
      <div
        style={(CardDisplay, myScreen < 600 ? cardZoom : { height: "75vh" })}
        className="CardMaps"
      >
        <Card style={{ height: "100%" }}>
          <CardHeader
            id="swipe-wrap"
            onTouchStart={(e) => {
              setStartY(e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              var move = e.touches[0].clientY;
              var changeMove = startY - move;
              if (changeMove > 0) {
                if (startY < 220) {
                  setCardZoom({
                    height: `calc(75vh + ${changeMove}px)`,
                    overflowY: "hidden",
                  });
                } else {
                  setCardZoom({
                    height: `calc(35vh + ${changeMove}px)`,
                    overflowY: "hidden",
                  });
                }
              } else {
                if (startY < 220) {
                  setCardZoom({
                    height: `calc(75vh + ${changeMove}px)`,
                  });
                } else {
                  setCardZoom({
                    height: `calc(35vh + ${changeMove}px)`,
                  });
                }
              }
            }}
            onTouchEnd={(e) => {
              var end = e.changedTouches[0].clientY;
              var screenScroll = window.innerHeight / 4;
              if (end > 3 * screenScroll) {
                setCardZoom({ height: "35vh", overflowY: "auto" });
                props.dispatch(dataOnCard(null, false));
              }
              if (end < 3 * screenScroll) {
                setCardZoom({ height: "35vh", overflowY: "auto" });
              }
              if (end < 2 * screenScroll) {
                setCardZoom({ height: "75vh", overflowY: "auto" });
              }
            }}
          >
            <span id="swipe"></span>
          </CardHeader>
          <div
            style={{
              padding: "0 ",
              background: "white",
              height: "auto",
            }}
          >
            {props.clicked == 0 ? profileCard : lahanCard}
          </div>
        </Card>
      </div>
    )
  );
};
function detailClicked(state) {
  return {
    data: state.optionMenu.dataOnCard,
    isCardOpen: state.optionMenu.isCardOpen,
    clicked: state.optionMenu.clicked,
  };
}
export default connect(detailClicked)(CardMaps);
