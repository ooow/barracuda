import React, { Component } from 'react';
import { Bit } from '../../model';
import { http } from '../../axios';
import NavBar from '../../components/NavBar';

/** Component renders the main page. */
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'Этот текст абсолютно тестовый блядь',
      filteredText: '',
      result: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSend(event) {
    http.post('check', { text: this.state.text })
      .then((response) => {
        const bits = response.data.body
          .map(b => new Bit(b.data, b.isWord, b.isBad));

        this.setState({
          result: bits,
          filteredText: this.getFilteredText(bits),
        });
      });
    event.preventDefault();
  }

  getFilteredText(bits) {
    return bits.map(bit => bit.toRightString()).join('');
  }

  render() {
    const { text, filteredText } = this.state;
    return (
      <div className='container'>
        <NavBar />
        <div className='container mt-4'>
          <div className='row justify-content-center mb-2'>
            <span className="col text-center">
              Please write/paste your text into this text area
            </span>
          </div>
          <div className='row justify-content-center mb-2'>
            <textarea
              className='col-8 textarea border'
              value={text}
              onChange={this.handleChange}
            />
          </div>
          <div className='row justify-content-center mb-2'>
            <input
              className='btn btn-secondary col-3'
              type='submit'
              value='Send'
              onClick={this.handleSend}
            />
          </div>
          <div className='row justify-content-center mb-2'>
            <textarea
              readOnly
              className='col-8 textarea border'
              value={filteredText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
