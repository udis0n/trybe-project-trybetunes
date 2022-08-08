import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

const ONE = 1;

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        isLoading: false,
      });
    });
  }

  handleChange = (music) => {
    const { favoriteSongs } = this.state;
    this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      this.setState({
        favoriteSongs: favoriteSongs.filter((song) => song.trackId !== music.trackId),
        isLoading: false,
      });
    });
  }

  playOrPauseMusic = async ({ target }) => {
    const { id } = target;
    const audio = document.getElementById(`audio-${id}`);
    const audioParent = audio.parentElement;
    const removeParentClass = 'playing-parent';
    if (audio.classList.contains('playing')) {
      audio.classList.remove('playing');
      audioParent.classList.remove(removeParentClass);
      await audio.pause();
    } else {
      const oldAudio = document.getElementsByClassName('playing')[0];
      if (oldAudio !== undefined) {
        const oldAudioParent = oldAudio.parentElement;
        oldAudio.classList.remove('playing');
        oldAudioParent.classList.remove(removeParentClass);
        await oldAudio.pause();
      }
      audio.classList.add('playing');
      audioParent.classList.add(removeParentClass);
      await audio.play();
    }
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div className="desktop">
        <Header />

        <div className="AlbumId Favorites" data-testid="page-favorites">
          {
            isLoading
              ? (
                <div className="edit-loading">
                  <div className="lds-ring">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )
              : null
          }
          <div className="album-info">
            <div className="album-image-container">
              <img
                className="album-image"
                src="https://i.pinimg.com/originals/b5/6b/e4/b56be4c73ac7edfdb53f78db9c7a0708.jpg"
                alt="favorite-musics"
              />
            </div>
            <div>
              <h1 className="album-name" data-testid="album-name">
                Músicas Curtidas
              </h1>
              <p className="artist-name" data-testid="artist-name">
                Playlist
              </p>
            </div>
          </div>
          {
            favoriteSongs.map((song, index) => {
              const {
                trackId,
                trackName,
                artistName,
                previewUrl,
                artworkUrl100,
              } = song;
              return (
                <div className="MusicCard FavoriteCard" key={ trackId }>
                  <audio
                    type="audio/mpeg"
                    id={ `audio-${index + ONE}` }
                    data-testid="audio-component"
                    src={ previewUrl }
                  >
                    <track kind="captions" />
                  </audio>

                  <div className="track-id-container">
                    <p className="track-id">{ index + ONE }</p>
                    <button
                      className="play-button-album"
                      id={ index + ONE }
                      type="button"
                      onClick={ this.playOrPauseMusic }
                    >
                      ▶
                    </button>
                  </div>

                  <div className="album-image">
                    <img src={ artworkUrl100 } alt="album" />
                  </div>

                  <div className="track-name-container">
                    <p className="track-name">{ trackName }</p>
                    <p className="track-artist-name">{ artistName }</p>
                  </div>

                  {/* <p>{ index }</p>
                  <p>{ trackName }</p> */}
                  {/* <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    <code>audio</code>
                  </audio> */}
                  {/* <input
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    name="favorite"
                    id={ trackId }
                    checked={ favoriteSongs.some((music) => music.trackId === trackId) }
                    onChange={ () => this.handleChange(song) }
                  />
                  <label htmlFor={ trackId }>
                    Favorita
                  </label> */}

                  <div className="heart-container">
                    <input
                      className="check-heart"
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      name="favorite"
                      id={ trackId }
                      checked={ favoriteSongs.some((music) => music.trackId === trackId) }
                      onChange={ () => this.handleChange(song) }
                    />
                    <label className="heart-label" htmlFor={ trackId }>
                      <FontAwesomeIcon icon={ faHeart } />
                    </label>
                  </div>
                </div>
              );
            })
          }
          <div className="space-div" />
        </div>
      </div>
    );
  }
}
