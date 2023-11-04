import * as actions from "../actions";

const initialState = {
  documents: [],
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
    case actions.GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      }
      
    default:
      return state;
  }
};

export default index;
