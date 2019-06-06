import React, { useEffect, useReducer } from 'react';

import ChannelForm from '../ChannelForm/ChannelForm';
import ChannelList from '../ChannelList/ChannelList';
import { SET_CHANNELS, ADD_CHANNEL, REMOVE_CHANNEL } from './types';
import { setChannels, getChannels } from '../../../services/browser';
import { popupReducer, initialState } from './reducer';
import { Channel } from '../../../types';

const Popup: React.FC = () => {
  const [{ channels, isLoading }, dispatch] = useReducer(
    popupReducer,
    initialState
  );

  useEffect(() => {
    const fetchFromBrowser = async () => {
      const browserChannels = await getChannels();
      dispatch({
        type: SET_CHANNELS,
        payload: { channels: browserChannels },
      });
    };

    fetchFromBrowser();
  }, []);

  useEffect(() => {
    // Only update Chrome storage after initial data has been loaded
    if (isLoading) {
      return;
    }
    setChannels(channels);
  }, [channels, isLoading]);

  const addChannel = (name: string) => {
    dispatch({ type: ADD_CHANNEL, payload: { channel: { name } } });
  };

  const removeChannel = (channel: Channel) => {
    dispatch({ type: REMOVE_CHANNEL, payload: { channel } });
  };

  if (isLoading) {
    return (
      <div className="d-flex align-items-center p-4">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-hidden="true"
        />
        <strong className="mx-3">Loading channels...</strong>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <ChannelForm
        onSubmit={addChannel}
        usedValues={channels.map(channel => channel.name)}
      />
      <main className="mt-3">
        <ChannelList channels={channels} onRemove={removeChannel} />
      </main>
    </div>
  );
};

export default Popup;
