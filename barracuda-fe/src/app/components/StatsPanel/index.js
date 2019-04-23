import React, { Component } from 'react';
import { toast } from 'react-toastify';
import CloudSun from '../../assets/images/cloudsun.svg';
import RainSun from '../../assets/images/rainsun.svg';
import Rain from '../../assets/images/rain.svg';
import Sun from '../../assets/images/sun.svg';
import Sunny from '../../assets/images/sunny.svg';
import Tornado from '../../assets/images/tornado.svg';
import Bug from '../../assets/images/ticks.svg';
import http from '../../axios';
import { Rate } from '../../model';

/** Component renders stats panel. */
class StatsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRatingBlockVisible: false,
    };

    this.showRatingBlock = this.showRatingBlock.bind(this);
    this.hideRatingBlock = this.hideRatingBlock.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { stats } = this.props;

    if (stats !== prevProps.stats) {
      this.showRatingBlock();
    }
  }

  showRatingBlock() {
    this.setState({ isRatingBlockVisible: true });
  }

  hideRatingBlock() {
    this.setState({ isRatingBlockVisible: false });
  }

  rate(rating) {
    const { stats } = this.props;

    http.post('rate', { rate: new Rate(rating, stats.badBits) })
      .then((response) => {
        const added = response.data.body;
        if (added > 0) {
          toast(`Analyzed new ${added} words`);
        } else {
          toast('Thanks for helping');
        }
        this.hideRatingBlock();
      });
  }

  renderRatingBlock() {
    return (
      <div className='w-100 mt-3 text-center '>
        <div className='text-primary'>
          Please rate and help us improve quality
        </div>
        <div className='d-flex justify-content-center w-100 mt-2'>
          <div
            className='ripple icon-button'
            title='Bad'
            role='button'
            tabIndex={0}
            onClick={this.rate.bind(this, 25)}
          >
            <img
              alt='Bad'
              className='wh-2em'
              src={Rain}
            />
            <span className='small'>Bad</span>
          </div>
          <div
            className='ripple icon-button'
            title='Nice'
            role='button'
            tabIndex={0}
            onClick={this.rate.bind(this, 50)}
          >
            <img
              alt='Nice'
              className='wh-2em'
              src={RainSun}
            />
            <span className='small'>Nice</span>
          </div>
          <div
            className='ripple icon-button'
            title='Good'
            role='button'
            tabIndex={0}
            onClick={this.rate.bind(this, 75)}
          >
            <img
              alt='Good'
              className='wh-2em'
              src={CloudSun}
            />
            <span className='small'>Good</span>
          </div>
          <div
            className='ripple icon-button'
            title='Excellent'
            role='button'
            tabIndex={0}
            onClick={this.rate.bind(this, 100)}
          >
            <img
              alt='Excellent'
              className='wh-2em'
              src={Sun}
            />
            <span className='small'>Excellent</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { stats } = this.props;
    const { isRatingBlockVisible } = this.state;

    return (
      <div className='d-flex justify-content-center mt-4'>
        <div className='row w-75 border pt-3 pb-2'>
          <div className='col'>
            <span
              className='d-flex align-items-center justify-content-center'
              title={`${stats.filteredSymbols} filtered symbols`}
            >
              <img
                alt='filtered symbols'
                className='wh-2em mr-2'
                src={Tornado}
              />
              <p className='mb-0'>{stats.filteredSymbols} filtered symbols</p>
            </span>
          </div>
          <div className='col'>
            <span
              className='d-flex align-items-center justify-content-center'
              title={`${stats.badBits.length} bad words found`}
            >
              <img
                alt='Bad words found'
                className='wh-2em mr-2'
                src={Bug}
              />
              <p className='mb-0'>{stats.badBits.length} bad words found</p>
            </span>
          </div>
          <div className='col'>
            <span
              className='d-flex align-items-center justify-content-center'
              title={`${stats.learnedWords} bad words saved to base`}
            >
              <img
                alt='Bad words added to base'
                className='wh-2em mr-2'
                src={Sunny}
              />
              <p className='mb-0'>
                {stats.learnedWords} bad words added to base
              </p>
            </span>
          </div>

          {isRatingBlockVisible ? this.renderRatingBlock() : null}
        </div>
      </div>
    );
  }
}

export default StatsPanel;
