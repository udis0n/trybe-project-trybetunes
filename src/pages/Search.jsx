import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import './Search.css';

const MIN_CHARACTERS = 2;

export default class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    searchInput: '',
    lastInput: '',
    resultFind: false,
    albumsList: [],
  };

  enableSearchButton = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
      isSearchButtonDisabled: value.length < MIN_CHARACTERS,
    });
  }

  getAlbums = async (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    const response = await searchAlbumsAPI(searchInput);
    this.setState({
      albumsList: response,
      lastInput: searchInput,
      searchInput: '',
      resultFind: true,
    });
  }

  render() {
    const {
      albumsList,
      isSearchButtonDisabled,
      searchInput,
      lastInput,
      resultFind,
    } = this.state;

    return (
      <div className="desktop">
        <Header />

        <div className="Search" data-testid="page-search">
          <h2 className="search-title">Buscar</h2>
          <form onSubmit={ this.getAlbums }>
            <div className="search-fields">
              <input
                className="search-input"
                data-testid="search-artist-input"
                placeholder="Artista ou banda..."
                type="text"
                value={ searchInput }
                onChange={ this.enableSearchButton }
              />

              <button
                className="search-button"
                data-testid="search-artist-button"
                type="submit"
                disabled={ isSearchButtonDisabled }
              >
                <FontAwesomeIcon className="menu-icon" icon={ faMagnifyingGlass } />
              </button>
            </div>
            <div>
              {
                resultFind && lastInput.length !== 0
                  ? <p className="found">{ `Resultado de álbuns de: ${lastInput}` }</p>
                  : null
              }
            </div>
            <div>
              {
                resultFind && albumsList.length === 0
                  ? <p className="album-not-found">Nenhum álbum foi encontrado</p>
                  : null
              }
            </div>
            {
              albumsList.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  albumImage={ album.artworkUrl100 }
                  artistName={ album.artistName }
                  collectionId={ album.collectionId }
                  collectionName={ album.collectionName }
                  collectionPrice={ album.collectionPrice }
                  trackCount={ album.trackCount }
                  releaseDate={ album.releaseDate }
                />
              ))
            }
          </form>
          <div className="space-div" />
        </div>
      </div>
    );
  }
}
