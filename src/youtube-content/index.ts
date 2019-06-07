import './style.scss';

import { reset } from './utils';
import { loadChannels } from './store';
import { watchPage } from './pages/watch';
import { checkContents } from './pages/contents';
import { channelPage } from './pages/channel';

loadChannels();

document.addEventListener('yt-navigate-finish', event => {
  reset();

  if (event.target == null) {
    console.warn('yt-navigate-finish event is null');
    return;
  }

  onNavigateFinish((event.target as Element).baseURI);
});

const onNavigateFinish = (url: string) => {
  reset();
  checkPages(url);
};

const checkPages = (baseUri: string) => {
  if (baseUri.match(/\/watch\?/)) {
    watchPage();
  } else if (baseUri.match(/\/(?:channel|user)\//)) {
    channelPage();
  } else {
    checkContents();
  }
};
