import React, { Component } from 'react';
import axios from 'axios';

/** Component renders the main page. */
class Main extends Component {

  http = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor(props) {
    super(props);
    this.state = { text: 'Этот текст абсолютно тестовый блядь', result: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSend(event) {
    this.http.post('check', { text: this.state.text })
      .then((response) => {
        this.setState(prevState => ({
          ...prevState,
          result: response.data.body,
        }));
        console.log('response', response.data.body);
      })
      .catch((error) => {
        alert(`error: ${error}`);
        console.log('error', error);
      });
    //this.setState({ text: '' }); // Clean text area after sending.
    event.preventDefault();
  }

  renderResult() {
    const { result } = this.state;
    return result.length > 0 ? (
      <div>
        <span>Results:</span>
        {result.map((r, i) => (
          <div key={i}>{r.word} : {r.isBad ? 'true' : 'false'}</div>
        ))
        }
      </div>
    ) : (<div />);
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
        {this.renderResult()}
      </div>
    );
  }
}

export default Main;
