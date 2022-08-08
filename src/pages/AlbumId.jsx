import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import './AlbumId.css';

const YEAR = 4;

export default class AlbumId extends Component {
  state = {
    musicsList: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musicsList = await getMusics(id);
    this.setState({
      musicsList,
    });
  }

  render() {
    const { musicsList } = this.state;

    return (
      <div className="desktop">
        <Header />

        <div className="AlbumId" data-testid="page-album">
          {
            musicsList.map((music, index) => {
              if (index === 0) {
                return (
                  <div className="album-info" key={ index }>
                    <div className="album-image-container">
                      <img
                        className="album-image"
                        src={ music.artworkUrl100 }
                        alt={ music.collectionName }
                      />
                    </div>
                    <div>
                      <h1 className="album-name" data-testid="album-name">
                        { music.collectionName }
                      </h1>
                      <p className="artist-name" data-testid="artist-name">
                        { `${music.releaseDate.substring(0, YEAR)} ● ${music.artistName}` }
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={ index } className="music-card-container">
                  <MusicCard
                    music={ music }
                    trackId={ music.trackId }
                    trackName={ music.trackName }
                    trackNumber={ music.trackNumber }
                    artistName={ music.artistName }
                    previewUrl={ music.previewUrl }
                  />
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

AlbumId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
