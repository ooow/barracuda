import React, { Component } from 'react';
import { Bit } from '../../model';
import { http } from '../../axios';
import NavBar from '../../components/NavBar';

/** Component renders the main page. */
class Main extends Component {

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
    http.post('check', { text: this.state.text })
      .then((response) => {
        this.setState(prevState => ({
          ...prevState,
          result: response.data.body.map(b => new Bit(b.data, b.isWord, b.isBad)),
        }));
      });
    //this.setState({ text: '' }); // Clean text area after sending.
    event.preventDefault();
  }

  renderResult() {
    const { result } = this.state;
    return result.length > 0 ? (
      <div>
        <span>Results:</span>
        {
          result.map((r, i) => (<div key={i}>{r.toString()}</div>))
        }
      </div>
    ) : (<div />);
  }

  render() {
    return (
      <div className='container'>
        <NavBar />
        <div className='d-flex flex-column justify-content-center align-items-center bg-light'>
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
      </div>
    );
  }
}

export default Main;
