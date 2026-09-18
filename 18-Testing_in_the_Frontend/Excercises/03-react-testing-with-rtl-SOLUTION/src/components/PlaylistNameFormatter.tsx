import { useState } from 'react';

import { formatPlaylistName } from '../utils/playlistNameFormatter';

export default function PlaylistNameFormatter() {
  const [name, setName] = useState('');
  const [formattedName, setFormattedName] = useState('');

  function handleClick() {
    setFormattedName(formatPlaylistName(name));
  }

  return (
    <section className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Playlist benennen</h2>
        <label htmlFor='playlist-name'>Playlist-Name</label>
        <input
          id='playlist-name'
          className='input w-full'
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button type='button' className='btn btn-primary' onClick={handleClick}>
          Formatieren
        </button>
        {formattedName && <p>{formattedName}</p>}
      </div>
    </section>
  );
}
