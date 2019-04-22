import React, { Component } from 'react';
import { Bit } from '../../model';
import { http } from '../../axios';
import NavBar from '../../components/NavBar';
import CloudSun from '../../assets/images/cloudsun.svg';
import RainSun from '../../assets/images/rainsun.svg';
import Rain from '../../assets/images/rain.svg';
import Sun from '../../assets/images/sun.svg';
import Sunny from '../../assets/images/sunny.svg';
import Tornado from '../../assets/images/tornado.svg';
import Bug from '../../assets/images/ticks.svg';

const textareaMaxLength = 5000;

/** Component renders the Main page. */
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filteredText: '',
      result: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    this.check(event);
  }

  check() {
    http.post('check', { text: this.state.text })
      .then((response) => {
        const bits = response.data.body
          .map(b => new Bit(b.data, b.isWord, b.isBad));

        this.setState({
          result: bits,
          filteredText: this.getFilteredText(bits),
        });
      });
  }

  getFilteredText(bits) {
    return bits.map(bit => bit.toRightString()).join('');
  }

  render() {
    const { text, filteredText } = this.state;
    return (
      <div className='container'>
        <NavBar />
        <div className='row mt-4'>
          <div className='col justify-content-center'>
            <textarea
              autoFocus
              className='w-100 textarea border'
              value={text}
              placeholder='Please write/paste your text into this text area'
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
        <div className='d-flex justify-content-center mt-4'>
          <div className="row w-75 border pt-3 pb-1">
            <div className='col'>
              <span className='d-flex align-items-center' title=''>
              <img
                alt='Filtered symbols'
                className='wh-2em mr-2'
                src={Tornado}
              />
              <p className='mb-0'>232 Filtered symbols</p>
              </span>
            </div>
            <div className='col'>
              <span className='d-flex align-items-center' title=''>
              <img
                alt='Bad words found'
                className='wh-2em mr-2'
                src={Bug}
              />
              <p className='mb-0'>16 bad words found</p>
              </span>
            </div>
            <div className='col'>
              <span className='d-flex align-items-center' title=''>
              <img
                alt='Bad words added to base'
                className='wh-2em mr-2'
                src={Sunny}
              />
              <p className='mb-0'>5 bad words added to base</p>
              </span>
            </div>

            <div className='w-100 mt-3 text-center'>
              Please rate and help us improve quality
            </div>

            <div className='d-flex justify-content-center w-100 mt-2'>
              <div className='ripple icon-button' title='Bad'>
                <img
                  alt='Bad'
                  className='wh-2em'
                  src={Rain}
                />
                <span className='small'>Bad</span>
              </div>
              <div className='ripple icon-button' title='Nice'>
                <img
                  alt='Nice'
                  className='wh-2em'
                  src={RainSun}
                />
                <span className='small'>Nice</span>
              </div>
              <div className='ripple icon-button' title='Good'>
                <img
                  alt='Good'
                  className='wh-2em'
                  src={CloudSun}
                />
                <span className='small'>Good</span>
              </div>
              <div className='ripple icon-button' title='Excellent'>
                <img
                  alt='Excellent'
                  className='wh-2em'
                  src={Sun}
                />
                <span className='small'>Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
