import React, { Component } from 'react';
import axios from 'axios';

/** Component renders the main page. */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSend(event) {
    axios.get(`localhost:5000?word=${this.state.text}`)
      .then((response) => {
        alert('response', response);
        console.log('response', response);
      })
      .catch((error) => {
        alert('error', error);
        console.log('error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center h-100vh bg-light'>
        Barracuda says Hi
        <textarea
          className='w-75 my-4'
          value={this.state.text}
          onChange={this.handleChange}
         />
        <input
          type='submit'
          value='Send'
          onClick={this.handleSend}
        />
      </div>
    );
  }
}

export default Main;
