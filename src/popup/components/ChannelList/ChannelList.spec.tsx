import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ChannelList from './ChannelList';
import { Channel } from '../../../types';

describe('ChannelList', () => {
  it('it should display alert when no channels are given', () => {
    const onRemove = jest.fn();
    const channels: Array<Channel> = [];

    const utils = render(
      <ChannelList onRemove={onRemove} channels={channels} />
    );

    utils.getByText('No channels have been added');
    const list = utils.queryByRole('list');
    expect(list).toBeNull();
  });

  it('should render a sorted list', () => {
    const onRemove = jest.fn();
    const channels: Array<Channel> = [
      { name: 'Second element' },
      { name: 'Third element' },
      { name: 'first element' },
      { name: '2 channel' },
      { name: '01' },
    ];

    const utils = render(
      <ChannelList onRemove={onRemove} channels={channels} />
    );

    const alert = utils.queryByText('No channels have been added');
    expect(alert).toBeNull();
    const listItems = utils.getAllByRole('listitem');
    expect(listItems.length).toBe(channels.length);
    expect(listItems[0].textContent).toContain(channels[4].name);
    expect(listItems[1].textContent).toContain(channels[3].name);
    expect(listItems[2].textContent).toContain(channels[2].name);
    expect(listItems[3].textContent).toContain(channels[0].name);
    expect(listItems[4].textContent).toContain(channels[1].name);
  });

  it('should call onRemove when clicking on the button', () => {
    const onRemove = jest.fn();
    const channels: Array<Channel> = [
      { name: 'First' },
      { name: 'Second' },
      { name: 'Third' },
    ];

    const utils = render(
      <ChannelList onRemove={onRemove} channels={channels} />
    );

    const buttons = utils.getAllByRole('button');
    expect(buttons.length).toBe(channels.length);
    fireEvent.click(buttons[1]);
    expect(onRemove).toHaveBeenCalledWith(channels[1]);
  });
});
