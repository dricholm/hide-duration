import { browser } from 'webextension-polyfill-ts';

import { getChannels, setChannels } from './browser';
import { Channel } from '../types';

describe('Browser', () => {
  beforeEach(() => {
    (browser.storage.sync.get as jest.Mock).mockClear();
    (browser.storage.sync.set as jest.Mock).mockClear();
  });

  it('should get channels', async () => {
    await getChannels();
    expect(browser.storage.sync.get).toHaveBeenCalledWith({ channels: [] });
  });

  it('should set channels', async () => {
    const channels: Array<Channel> = [{ name: 'Channel name' }];
    await setChannels(channels);
    expect(browser.storage.sync.set).toHaveBeenCalledWith({ channels });
  });
});
