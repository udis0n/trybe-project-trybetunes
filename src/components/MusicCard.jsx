import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'react-h5-audio-player/lib/styles.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

export default class MusicCard extends Component {
  state = {
    isChecked: false,
    listOfFavoriteSongs: [],
    // loadingFavorite: false,
  };

  async componentDidMount() {
    // this.setState({ loadingFavorite: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ listOfFavoriteSongs: favoriteSongs }, () => {
      const { listOfFavoriteSongs } = this.state;
      const { trackId } = this.props;
      this.setState({
        isChecked: listOfFavoriteSongs.some((song) => song.trackId === trackId),
        // loadingFavorite: false,
      });
    });
  }

  addSongToFavorites = async () => {
    const { music } = this.props;
    // this.setState({ loadingFavorite: true });
    await addSong(music);
    this.setState({
      isChecked: true,
      // loadingFavorite: false,
    });
  }

  removeSongFromFavorites = async () => {
    const { music } = this.props;
    // this.setState({ loadingFavorite: true });
    await removeSong(music);
    this.setState({ listOfFavoriteSongs: await getFavoriteSongs() });
    this.setState({
      isChecked: false,
      // loadingFavorite: false,
    });
  }

  checkboxHandler = async () => {
    const { isChecked } = this.state;
    if (isChecked) {
      await this.removeSongFromFavorites();
      return;
    }
    this.addSongToFavorites();
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
    const {
      trackId,
      trackName,
      trackNumber,
      previewUrl,
      artistName,
    } = this.props;

    const {
      isChecked,
    } = this.state;

    return (
      <div className="MusicCard">
        <audio
          type="audio/mpeg"
          id={ `audio-${trackNumber}` }
          data-testid="audio-component"
          src={ previewUrl }
        >
          <track kind="captions" />
        </audio>

        <div className="track-id-container">
          <p className="track-id">{ trackNumber }</p>
          <button
            className="play-button-album"
            id={ trackNumber }
            type="button"
            onClick={ this.playOrPauseMusic }
          >
            ▶
          </button>
        </div>

        <div className="track-name-container">
          <p className="track-name">{ trackName }</p>
          <p className="track-artist-name">{ artistName }</p>
        </div>
        {/* <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio> */}

        <div className="heart-container">
          <input
            className="check-heart"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id={ trackId }
            onChange={ this.checkboxHandler }
            checked={ isChecked }
          />
          <label className="heart-label" htmlFor={ trackId }>
            <FontAwesomeIcon icon={ faHeart } />
          </label>
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
