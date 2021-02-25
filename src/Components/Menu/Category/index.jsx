import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "reactstrap";

function OptionButton(props) {
  const [buttonActived, setButtonActived] = useState({
    activedButton: 0,
    object: [
      { id: 0, option: "PROFILE" },
      { id: 1, option: "PETANI" },
      { id: 2, option: "LAHAN" },
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
  console.log(props.profile, "profile");
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
    profile: state.optionMenu.profile,
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
  };
}

export default connect(propsReducer)(OptionButton);
