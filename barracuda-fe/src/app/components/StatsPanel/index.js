import React, { Component } from 'react';
import CloudSun from '../../assets/images/cloudsun.svg';
import RainSun from '../../assets/images/rainsun.svg';
import Rain from '../../assets/images/rain.svg';
import Sun from '../../assets/images/sun.svg';
import Sunny from '../../assets/images/sunny.svg';
import Tornado from '../../assets/images/tornado.svg';
import Bug from '../../assets/images/ticks.svg';

/** Component renders stats panel. */
class StatsPanel extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //     //   stats: this.props.stats,
    //     // };
  }

  render() {
    const { stats } = this.props;
    return (
      <div className='d-flex justify-content-center mt-4'>
        <div className="row w-75 border pt-3 pb-1">
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
                title={`${stats.badWordsFound} bad words found`}
              >
              <img
                alt='Bad words found'
                className='wh-2em mr-2'
                src={Bug}
              />
              <p className='mb-0'>{stats.badWordsFound} bad words found</p>
              </span>
          </div>
          <div className='col'>
              <span
                className='d-flex align-items-center justify-content-center'
                title={`${stats.badWordsAdded} bad words saved to base`}
              >
              <img
                alt='Bad words added to base'
                className='wh-2em mr-2'
                src={Sunny}
              />
              <p className='mb-0'>
                {stats.badWordsAdded} bad words added to base
              </p>
              </span>
          </div>

          <div className='w-100 mt-3 text-center text-primary'>
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
    );
  }
}

export default StatsPanel;
