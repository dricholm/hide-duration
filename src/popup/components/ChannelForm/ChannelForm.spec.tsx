import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ChannelForm from './ChannelForm';

describe('ChannelForm', () => {
  it('it should submit value', () => {
    const onSubmit = jest.fn();
    const value = 'A channel name';

    const utils = render(<ChannelForm onSubmit={onSubmit} usedValues={[]} />);
    const input = utils.getByLabelText('Channel name') as HTMLInputElement;
    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);

    fireEvent.click(utils.getByText('Add'));
    expect(onSubmit).toHaveBeenCalledWith(value);
    expect(input.value).toBe('');
    expect(utils.queryByRole('alert')).toBeNull();
  });

  it('it should not submit already used value', () => {
    const onSubmit = jest.fn();
    const value = 'A channel name';

    const utils = render(
      <ChannelForm onSubmit={onSubmit} usedValues={[value]} />
    );
    const input = utils.getByLabelText('Channel name') as HTMLInputElement;
    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);

    fireEvent.click(utils.getByText('Add'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input.value).toBe(value);
    utils.getByRole('alert');
  });
});
