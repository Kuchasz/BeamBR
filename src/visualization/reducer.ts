import {State} from "./state";
import {Actions, changeVisualizationConfigActionType} from "./actions";

const initialState: State = {
    minValue: 20,
    maxValue: 80,
    valueSteps: 25
};

export const reducer = (state: State = initialState, action: Actions) => {
  switch(action.type){
      case changeVisualizationConfigActionType: return {...action.config};
      default: return state;
  }
};

export const getConfig = (state: State) =>
    state;