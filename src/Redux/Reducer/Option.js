import { OPTION_MENU_ACTIONS } from "../Action";

const optionState = {
    profile:null,
    petani:null,
    lahan:null,
    title:'Option State Management'
}

const optionMenu = (state = optionState, action) => {
    switch (action.type) {
      case OPTION_MENU_ACTIONS.PROFILE:
        return {
            ...state,
            profile:action.payload.data
        }
      case OPTION_MENU_ACTIONS.PETANI:
        console.log(OPTION_MENU_ACTIONS.PETANI)
      case OPTION_MENU_ACTIONS.LAHAN:
        console.log(OPTION_MENU_ACTIONS.LAHAN)
      default:
        return state;
    }
  };

  export default optionMenu