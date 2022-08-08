import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import AlbumId from './pages/AlbumId';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';
import './pages/colors.css';
import './App.css';

const MINIMUM_CHARACTERS = 3;

class App extends React.Component {
  state = {
    userName: '',
    buttonIsDisabled: true,
    // searchInput: '',
    // albumsList: [],
  }

  changeHandler = ({ target }) => {
    const { value } = target;

    this.setState({
      userName: value,
      buttonIsDisabled: value.length < MINIMUM_CHARACTERS,
    });
  }

  // getAlbums = async () => {
  //   const { searchInput } = this.state;
  //   const response = await searchAlbumsAPI(searchInput);
  //   this.setState({
  //     albumsList: response,
  //   });
  //   console.log(response);
  // }

  render() {
    const {
      userName,
      buttonIsDisabled,
      // albumsList,
      // searchInput,
    } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              userName={ userName }
              buttonIsDisabled={ buttonIsDisabled }
              changeHandler={ this.changeHandler }
            />) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ AlbumId } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/loading" component={ Loading } />
          <Route component={ NotFound } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
