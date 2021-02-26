import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "reactstrap";
import { optionSelected } from "../../../Redux/Action/OptionMenuActions";

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
    <div className="Option-Button">
      <ButtonGroup>
        {buttonActived.object.map((items) => {
          return (
            <button
              className={setActived(items.id)}
              key={items.id}
              onClick={() => {
                activeButton(items.id);
                props.dispatch(optionSelected(items.id))
              }}
            >
              {items.option}
            </button>
          );
        })}
      </ButtonGroup>
    </div>
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
