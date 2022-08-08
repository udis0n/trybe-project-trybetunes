import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    isButtonDisabled: true,
    name: '',
    image: '',
    description: '',
    email: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const { name, image, description, email } = await getUser();
      this.setState({
        name,
        image,
        description,
        email,
        isLoading: false }, this.toggleButton);
    });
  }

  isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  toggleButton = () => {
    const { name, image, description, email } = this.state;
    const allInputsAreFilled = name !== ''
      && image !== ''
      && description !== ''
      && email !== '';

    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    this.setState({
      isButtonDisabled: !(allInputsAreFilled && isValidEmail),
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.toggleButton);
  }

  saveInformation = async () => {
    const { name, image, description, email } = this.state;

    this.setState({ isLoading: true }, async () => {
      const userInfo = { name, email, image, description };
      await updateUser(userInfo);
      this.setState({ isLoading: false });
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const {
      isLoading,
      isButtonDisabled,
      name,
      email,
      description,
      image,
    } = this.state;

    return (
      <div className="desktop">
        <Header />

        <div className="ProfileEdit" data-testid="page-profile-edit">
          <h1>Editar Perfil</h1>
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
          <form>
            <label className="edit-container" htmlFor="name-input">
              Nome
              <input
                className="edit-input"
                autoComplete="off"
                data-testid="edit-input-name"
                type="text"
                value={ name }
                name="name"
                id="name-input"
                onChange={ this.handleChange }
              />
            </label>

            <label className="edit-container" htmlFor="email-input">
              Email
              <input
                className="edit-input"
                autoComplete="off"
                data-testid="edit-input-email"
                type="text"
                value={ email }
                name="email"
                id="email-input"
                onChange={ this.handleChange }
              />
            </label>

            <label className="edit-container" htmlFor="image-input">
              Imagem
              <input
                className="edit-input"
                autoComplete="off"
                data-testid="edit-input-image"
                type="text"
                value={ image }
                name="image"
                id="image-input"
                onChange={ this.handleChange }
              />
            </label>

            <label className="edit-container" htmlFor="description-input">
              Descrição
              <input
                className="edit-input"
                autoComplete="off"
                data-testid="edit-input-description"
                type="text"
                value={ description }
                name="description"
                id="description-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              className="save-edit-button"
              data-testid="edit-button-save"
              type="button"
              onClick={ this.saveInformation }
              disabled={ isButtonDisabled }
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
