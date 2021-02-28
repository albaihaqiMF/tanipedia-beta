import { OPTION_MENU_ACTIONS } from "../Action";

const optionState = {
  petani: null,
  lahan: null,
  panen: null,
  dataOnCard: null,
  isCardOpen:false,
  clicked: 0,
  title: "Option State Management",
};

const optionMenu = (state = optionState, action) => {
  switch (action.type) {
    case OPTION_MENU_ACTIONS.PETANI:
      return {
        ...state,
        petani: action.payload.data,
      };
    case OPTION_MENU_ACTIONS.LAHAN:
      return {
        ...state,
        lahan: action.payload.data,
      };
    case OPTION_MENU_ACTIONS.PANEN:
      console.log(OPTION_MENU_ACTIONS.LAHAN);

    case OPTION_MENU_ACTIONS.DATA_SELECTED:
      return {
        ...state,
        clicked: action.payload.data,
        isCardOpen: action.payload.cardOpen,
      };
    case OPTION_MENU_ACTIONS.CARD:
      return {
        ...state,
        dataOnCard: action.payload.data,
        isCardOpen: action.payload.cardOpen,
      };
    default:
      return state;
  }
};

export default optionMenu;
