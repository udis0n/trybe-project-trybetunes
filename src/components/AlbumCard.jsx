import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

const LETTERS = 4;

export default class AlbumCard extends Component {
  render() {
    const {
      albumImage,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      trackCount,
      releaseDate,
    } = this.props;

    return (
      <div className="AlbumCard">
        <Link
          className="album-link"
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <div className="image-container">
            <img src={ albumImage } alt={ collectionName } />
          </div>
          <div className="info-container">
            <p className="album-name">{ collectionName }</p>
            <p className="artist-name">
              { `${releaseDate.substring(0, LETTERS)} ● ${artistName}` }
            </p>
            <p className="none">{ trackCount }</p>
            <p className="none">{ collectionPrice }</p>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumImage: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  trackCount: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
};
