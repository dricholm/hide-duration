import { Channel } from '../types';
import { getChannels as getChannelsFromBrowser } from '../services/browser';

let channels: Array<Channel>;

export const loadChannels = async () => {
  channels = await getChannelsFromBrowser();
};

export const getChannels = () => channels;
