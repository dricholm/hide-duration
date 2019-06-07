import * as store from '../store';
import { channelPage } from './channel';
import { hideThumbnailDuration } from '../css-classes';

describe('Channel page', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should add CSS class to video thumbnail', () => {
    const name = 'Filtered channel';
    jest.spyOn(store, 'getChannels').mockReturnValueOnce([{ name }]);
    const channelTitle = document.createElement('div');
    channelTitle.setAttribute('id', 'channel-title');
    channelTitle.textContent = name;
    const thumbnail = document.createElement('ytd-video-renderer');
    document.body.appendChild(channelTitle);
    document.body.appendChild(thumbnail);
    channelPage();
    expect(thumbnail.classList.contains(hideThumbnailDuration)).toBe(true);
  });

  it('should not add CSS class to video thumbnail', () => {
    const name = 'Filtered channel';
    jest.spyOn(store, 'getChannels').mockReturnValueOnce([{ name }]);
    const channelTitle = document.createElement('div');
    channelTitle.setAttribute('id', 'channel-title');
    channelTitle.textContent = `${name} with something`;
    const thumbnail = document.createElement('ytd-video-renderer');
    document.body.appendChild(channelTitle);
    document.body.appendChild(thumbnail);
    channelPage();
    expect(thumbnail.classList.contains(hideThumbnailDuration)).toBe(false);
  });
});
