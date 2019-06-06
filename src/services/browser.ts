import { browser } from 'webextension-polyfill-ts';

import { Channel } from '../types';

export const setChannels: (
  channels: Array<Channel>
) => Promise<void> = async channels => browser.storage.sync.set({ channels });

// export const getChannels: () => Promise<Array<Channel>> = () =>
//   new Promise(resolve =>
//     browser.storage.sync.get({ channels: [] }, items =>
//       resolve(items.channels as Array<Channel>)
//     )
//   );

export const getChannels: () => Promise<Array<Channel>> = async () => {
  const { channels } = await browser.storage.sync.get({ channels: [] });
  return channels;
};
