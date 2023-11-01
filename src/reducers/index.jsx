import * as actions from "../actions";

const initialState = {
  source_dialog: {
    open: false,
    type: "",
  },
};

const index = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_ADD_DIALOG:
      return {
        ...state,
        source_dialog: {
          open: action.payload,
          type:"create"
        },
      };
    default:
      return state;
  }
};

export default index;
