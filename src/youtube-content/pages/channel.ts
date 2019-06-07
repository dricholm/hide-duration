import { thumbnailSelector } from '../css-classes';
import { hideDurationOverlay } from '../utils';
import { getChannels } from '../store';

export const channelPage = () => {
  const channelTitleElement = document.querySelector('#channel-title');

  if (channelTitleElement == null) {
    console.warn('Channel title element not found');
    return;
  }

  const channelTitle = channelTitleElement.textContent;
  if (channelTitle == null) {
    console.warn('Channel title is null');
    return;
  }

  if (
    getChannels()
      .map(channel => channel.name)
      .includes(channelTitle)
  ) {
    document.querySelectorAll(thumbnailSelector).forEach(element => {
      hideDurationOverlay(element);
    });
  }
};
