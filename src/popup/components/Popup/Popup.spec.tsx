import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import Popup from './Popup';
import { browser } from 'webextension-polyfill-ts';

describe('Popup', () => {
  beforeEach(() => {
    (browser.storage.sync.get as jest.Mock).mockClear();
    (browser.storage.sync.set as jest.Mock).mockClear();
  });

  it('it should display loading', () => {
    const utils = render(<Popup />);

    utils.getByText(/Loading/);
    expect(utils.queryByLabelText('Channel name')).toBeNull();
    expect(utils.queryByText('No channels have been added')).toBeNull();
    expect(utils.queryByRole('list')).toBeNull();
  });

  it('it should fetch data from browser API', async () => {
    const utils = render(<Popup />);

    expect(browser.storage.sync.get).toHaveBeenCalledWith({ channels: [] });

    await waitForElement(() => utils.getByLabelText('Channel name'));
    utils.getByText('No channels have been added');
    expect(utils.queryByText(/Loading/)).toBeNull();
  });

  it('it should add channel', async () => {
    const value = 'Channel name value';
    const utils = render(<Popup />);

    const input = await waitForElement(() =>
      utils.getByLabelText('Channel name')
    );
    fireEvent.change(input, { target: { value } });
    fireEvent.click(utils.getByRole('button'));

    expect(browser.storage.sync.set).toHaveBeenCalledWith({
      channels: [{ name: value }],
    });
    utils.getByText(value);
  });

  it('it should remove channel', async () => {
    (browser.storage.sync.get as jest.Mock).mockReturnValueOnce({
      channels: [{ name: 'Mock value' }],
    });
    const utils = render(<Popup />);

    await waitForElement(() => utils.getByText('Mock value'));
    const buttons = utils.getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(browser.storage.sync.set).toHaveBeenCalledWith({
      channels: [],
    });
    expect(utils.queryByText('Mock value')).toBeNull();
  });
});
