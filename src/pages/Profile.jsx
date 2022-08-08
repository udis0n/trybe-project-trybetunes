import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

export default class Profile extends Component {
  state = {
    loadingProfile: true,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      userName: userInfo.name,
      userEmail: userInfo.email,
      userImage: userInfo.image,
      userDescription: userInfo.description,
      loadingProfile: false,
    });
  }

  render() {
    const {
      loadingProfile,
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;

    return (
      <div className="desktop">
        <Header />

        <div className="Profile" data-testid="page-profile">
          {
            loadingProfile
              ? <FontAwesomeIcon className="loading-profile-icon" icon={ faCompactDisc } />
              : (
                <div className="profile-container">
                  <div className="image-info-container">
                    <div className="profile-image-container">
                      <img
                        data-testid="profile-image"
                        src={
                          (userImage.length === 0)
                            ? 'https://job.masterkorean.vn/theme/oklassedu/pix/avtdef.jpg'
                            : userImage
                        }
                        alt={ userName }
                      />
                    </div>
                    <div className="profile-info-container">
                      <p className="profile-name">{ userName }</p>
                      <p className="profile-email">{ userEmail }</p>
                    </div>
                  </div>
                  <p className="profile-description">{ userDescription }</p>
                  <Link className="profile-edit-button" to="/profile/edit">
                    Editar perfil
                  </Link>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
