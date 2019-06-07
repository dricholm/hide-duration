import { hideThumbnailDuration, thumbnailSelector } from './css-classes';
import { getChannels } from './store';
import { disconnectWatch } from './pages/watch';
import { disconnectContents } from './pages/contents';

export const reset = () => {
  disconnectWatch();
  disconnectContents();

  document
    .querySelectorAll(`.${hideThumbnailDuration}`)
    .forEach(element => element.classList.remove(hideThumbnailDuration));

  document.querySelectorAll(thumbnailSelector).forEach(filterByName);
};

export const filterByName = (videoItem: Element) => {
  const channelElement = videoItem.querySelector(
    '#metadata yt-formatted-string'
  );

  if (channelElement == null) {
    console.warn('ChannelElement is null');
    return;
  }

  const channelName = channelElement.getAttribute('title');
  if (channelName == null) {
    console.warn('Channel name is null', channelElement);
    return;
  }

  if (
    getChannels()
      .map(channel => channel.name)
      .includes(channelName)
  ) {
    hideDurationOverlay(videoItem);
  }
};

export const hideDurationOverlay = (videoItem: Element) => {
  videoItem.classList.add(hideThumbnailDuration);
};
