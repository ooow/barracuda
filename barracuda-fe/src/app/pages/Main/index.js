/* eslint-disable jsx-a11y/no-autofocus,class-methods-use-this */
import React, { Component } from 'react';
import { Bit, Stats } from '../../model';
import http from '../../axios';
import NavBar from '../../components/NavBar';
import StatsPanel from '../../components/StatsPanel';

const textareaMaxLength = 50000;

/** Component renders the Main page. */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filteredText: '',
      stats: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getFilteredText(bits) {
    return bits.map(bit => bit.toRightString())
      .join('');
  }

  getBadBits(bits) {
    return bits.filter(b => b.isBad);
  }

  check(event) {
    http.post('check', { text: event.target.value })
      .then((response) => {
        const bits = response.data.body
          .map(b => new Bit(b.data, b.isWord, b.isBad));
        const filteredText = this.getFilteredText(bits);
        const filteredSymbols = filteredText.length;
        const badBits = this.getBadBits(bits);

        this.setState({
          filteredText,
          stats: new Stats(
            filteredSymbols,
            badBits,
            response.data.learnedWords,
          ),
        });
      });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    this.check(event);
  }

  render() {
    const { text, filteredText, stats } = this.state;
    return (
      <div className='container'>
        <NavBar />
        <div className='row mt-4'>
          <div className='col justify-content-center'>
            <textarea
              autoFocus
              className='w-100 textarea border'
              value={text}
              placeholder='Please write/paste your text into this text area.
                           50k limit'
              maxLength={textareaMaxLength}
              onChange={this.handleChange}
            />
          </div>
          <div className='col justify-content-center'>
            <textarea
              readOnly
              className='w-100 textarea border'
              value={filteredText}
            />
          </div>
        </div>
        {filteredText ? <StatsPanel stats={stats} /> : null}
      </div>
    );
  }
}

export default Main;
