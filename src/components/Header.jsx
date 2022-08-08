import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompactDisc,
  faMagnifyingGlass,
  faUser,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../services/userAPI';
import './Header.css';

export default class Header extends Component {
  state = {
    shownName: '',
    isLoadingName: true,
  }

  async componentDidMount() {
    const response = await getUser();
    this.setState({
      shownName: response.name,
      isLoadingName: false,
    });
  }

  render() {
    const { isLoadingName, shownName } = this.state;
    return (
      <header className="Header" data-testid="header-component">
        <div className="logo-container">
          <FontAwesomeIcon className="icon-logo" icon={ faCompactDisc } />
          <p className="text-logo">Trybetunes</p>
        </div>
      <div className="line" />
        <div className="menu-links-container">

          <NavLink
            className="menu-link"
            activeClassName="menu-selected"
            data-testid="link-to-search"
            to="/search"
          >
            <FontAwesomeIcon className="menu-icon" icon={ faMagnifyingGlass } />
            Buscar
          </NavLink>

          <NavLink
            className="menu-link"
            activeClassName="menu-selected"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <FontAwesomeIcon className="menu-icon" icon={ faHeart } />
            Curtidas
          </NavLink>

          <NavLink
            className="menu-link"
            activeClassName="menu-selected"
            data-testid="link-to-profile"
            to="/profile"
          >
            <FontAwesomeIcon className="menu-icon" icon={ faUser } />
            Perfil
          </NavLink>

        </div>
        <div className="line" />
        <div className="line-bottom" />

        <div className="user-container">
          {
            isLoadingName
              ? <p className="user-name">Carregando...</p>
              : (
                <p className="user-name" data-testid="header-user-name">
                  { shownName }
                </p>
              )
          }
        </div>
      </header>
    );
  }
}
