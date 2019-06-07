import { hideDurationOverlay, filterByName } from './utils';
import { hideThumbnailDuration } from './css-classes';
import * as store from './store';

describe('YouTube Content Utils', () => {
  it('should filter channel', () => {
    const name = 'Filtered';
    jest.spyOn(store, 'getChannels').mockReturnValueOnce([{ name }]);

    const videoItem = document.createElement('div');
    const metadata = document.createElement('div');
    metadata.setAttribute('id', 'metadata');
    const ytFormattedString = document.createElement('yt-formatted-string');
    ytFormattedString.setAttribute('title', name);
    metadata.appendChild(ytFormattedString);
    videoItem.appendChild(metadata);

    filterByName(videoItem);
    expect(videoItem.classList.contains(hideThumbnailDuration)).toBe(true);
  });

  it('should not filter channel', () => {
    jest
      .spyOn(store, 'getChannels')
      .mockReturnValueOnce([{ name: 'Filtered' }]);

    const videoItem = document.createElement('div');
    const metadata = document.createElement('div');
    metadata.setAttribute('id', 'metadata');
    const ytFormattedString = document.createElement('yt-formatted-string');
    ytFormattedString.setAttribute('title', 'Not Filtered');
    metadata.appendChild(ytFormattedString);
    videoItem.appendChild(metadata);

    filterByName(videoItem);
    expect(videoItem.classList.contains(hideThumbnailDuration)).toBe(false);
  });

  it('should add CSS class to element', () => {
    const div = document.createElement('div');
    hideDurationOverlay(div);
    expect(div.classList.contains(hideThumbnailDuration)).toBe(true);
  });
});
