import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { dataOnCard, optionSelected } from "../../../Redux/Action/OptionMenuActions";

function OptionButton(props) {
  const [buttonActived, setButtonActived] = useState({
    activedButton: 0,
    object: [
      { id: 0, option: "PETANI" },
      { id: 1, option: "LAHAN" },
      { id: 2, option: "PANEN" },
    ],
  });

  function activeButton(index) {
    setButtonActived({
      ...buttonActived,
      activedButton: buttonActived.object[index].id,
    });
  }
  function setActived(index) {
    if (buttonActived.activedButton === index) {
      return "btn-option active";
    } else {
      return "btn-option inactive";
    }
  }
  return (
    <Row className="Option-Button">
      {buttonActived.object.map((items) => {
        return (
          <Col xs={4} sm={3} lg={2} xl={1} key={items.id}>
            <button
              className={setActived(items.id)}
              onClick={() => {
                activeButton(items.id);
                props.dispatch(optionSelected(items.id));
                props.dispatch(dataOnCard(null, false));
              }}
              disabled={items.id == 2 && true}
            >
              {items.option}
            </button>
          </Col>
        );
      })}
    </Row>
  );
}
function propsReducer(state) {
  return {
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
    panen: state.optionMenu.panen,
  };
}

export default connect(propsReducer)(OptionButton);
