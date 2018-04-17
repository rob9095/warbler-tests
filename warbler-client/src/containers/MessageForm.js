import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postNewMessage} from '../store/actions/messages';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state= {
      message: '',
      submitButton: 'disabled',
      clientErrors: '',
      errorStyles: {
        color: ''
      }
    };
  }

  handleInputChange = e => {
    this.setState({
      message: e.target.value,
    })
    if (e.target.value === '') {
      this.setState({
        submitButton: 'disabled'
      })
    } else {
      this.setState({
        submitButton: ''
      })
    }
  }

  handleNewMessage = e => {
    e.preventDefault();
    if(this.state.message !== '') {
      this.props.postNewMessage(this.state.message);
      this.setState({ message: '' });
      this.props.history.push('/');
    } else {
      this.setState({
        clientErrors: 'Please type a message',
        errorStyles: {
          color: '#D32F2F'
        }
      })
    }
  };

  render() {
    return(
      <div className="new-message-container">
        <h2>What's on Your Mind?</h2>
        <div className="mdl-color--white mdl-shadow--2dp content mdl-color-text--grey-800 mdl-cell mdl-cell--6-col message-form-container">
          <form className="new-message" onSubmit={this.handleNewMessage}>
            {this.state.clientErrors && (
              <div className="error red">{this.state.clientErrors}</div>
            )}
            {this.props.errors.message && (
              <div className="alert alert-danger">{this.props.errors.message}</div>
            )}
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea
                className="mdl-textfield__input"
                type="textarea"
                value={this.state.message}
                onChange={this.handleInputChange}
              />
              <label className="mdl-textfield__label" style={this.state.errorStyles}>Type Here...</label>
            </div>
            <button className="mdl-button mdl-button--raised	mdl-button--colored mdl-js-button mdl-js-ripple-effect" disabled={this.state.submitButton}>
              Add Message
            </button>
          </form>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return{
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
