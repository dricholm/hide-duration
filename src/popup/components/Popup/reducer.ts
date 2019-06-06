import {
  PopupState,
  PopupActionTypes,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  SET_CHANNELS,
} from './types';

export const initialState: PopupState = {
  channels: [],
  isLoading: true,
};

export const popupReducer: (
  state: PopupState,
  action: PopupActionTypes
) => PopupState = (state, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.payload.channel],
      };

    case REMOVE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter(
          channel => channel.name !== action.payload.channel.name
        ),
      };

    case SET_CHANNELS:
      return {
        ...state,
        channels: action.payload.channels,
        isLoading: false,
      };

    default:
      console.error('Invalid PopupAction type', action);
      return state;
  }
};
