import React, { Component } from 'react';

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
    alert('Send: ' + this.state.text);
    event.preventDefault();
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100vh bg-light">
        Barracuda says Hi
        <textarea
          className='w-75 my-4'
          value={this.state.text}
          onChange={this.handleChange}
        >
          </textarea>
        <input
          type="submit"
          value="Send"
          onClick={this.handleSend}
        />
      </div>
    );
  }
}

export default Main;
