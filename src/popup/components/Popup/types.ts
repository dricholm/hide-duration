import { Channel } from '../../../types';

export interface PopupState {
  channels: Array<Channel>;
  isLoading: boolean;
}

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const SET_CHANNELS = 'SET_CHANNELS';

interface AddChannelAction {
  type: typeof ADD_CHANNEL;
  payload: {
    channel: Channel;
  };
}

interface RemoveChannelAction {
  type: typeof REMOVE_CHANNEL;
  payload: {
    channel: Channel;
  };
}

interface SetChannelsAction {
  type: typeof SET_CHANNELS;
  payload: {
    channels: Array<Channel>;
  };
}

export type PopupActionTypes =
  | AddChannelAction
  | RemoveChannelAction
  | SetChannelsAction;
