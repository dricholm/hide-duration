import React from 'react';

import { Channel } from '../../../types';

interface ChannelListProps {
  channels: Array<Channel>;
  onRemove: (channel: Channel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, onRemove }) => {
  if (channels.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No channels have been added
      </div>
    );
  }

  const sortedChannels = [...channels].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return (
    <ul className="list-group">
      {sortedChannels.map(channel => (
        <li
          className="list-group-item d-flex justify-content-between"
          key={channel.name}
        >
          {channel.name}
          <button
            type="button"
            className="close"
            aria-label="Remove"
            onClick={() => onRemove(channel)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
