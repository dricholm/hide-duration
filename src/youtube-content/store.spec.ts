import * as browser from '../services/browser';
import { getChannels, loadChannels } from './store';

describe('YouTube content store', () => {
  it('should load and return channels from browser', async () => {
    const channels = [{ name: 'Channel name' }];
    jest.spyOn(browser, 'getChannels').mockResolvedValueOnce(channels);

    await loadChannels();
    expect(browser.getChannels).toHaveBeenCalledTimes(1);
    expect(getChannels()).toBe(channels);
  });
});
