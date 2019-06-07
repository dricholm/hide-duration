import React, { useState, FormEvent } from 'react';
import classnames from 'classnames';

interface ChannelFormProps {
  onSubmit: (name: string) => void;
  usedValues: Array<string>;
}

const ChannelForm: React.FC<ChannelFormProps> = ({ onSubmit, usedValues }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (usedValues.includes(name)) {
      setError(true);
      return;
    }

    setError(false);
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={submit} className="form-inline">
      <div className="input-group">
        <input
          type="text"
          className={classnames('form-control', { 'is-invalid': error })}
          placeholder="Channel name"
          aria-label="Channel name"
          aria-describedby="add-button"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
        {error && (
          <div className="invalid-feedback" role="alert">
            This channel has already been added.
          </div>
        )}
      </div>
    </form>
  );
};

ChannelForm.defaultProps = {
  usedValues: [],
};

export default ChannelForm;
