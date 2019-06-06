import { getChannels } from '../services/browser';

import './style.scss';

(async () => {
  const channels = await getChannels();
  console.log('Channels', channels);
})();
