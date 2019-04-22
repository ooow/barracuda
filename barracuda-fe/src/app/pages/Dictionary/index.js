import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { http } from '../../axios';
import Plus from '../../assets/images/plus.svg';
import Cancel from '../../assets/images/cancel.svg';
import Cloud from '../../assets/images/cloud.svg';
import Umbrella from '../../assets/images/umbrella.svg';
import { toast } from 'react-toastify';
import { validateWord } from '../../analyzer';

/** Component renders the Dictionary page. */
class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addInputValue: '',
      removeInputValue: '',
      dictionarySize: 0,
    };

    this.addInputValueChange = this.addInputValueChange.bind(this);
    this.removeInputValueChange = this.removeInputValueChange.bind(this);
    this.submitBadWord = this.submitBadWord.bind(this);
    this.removeBadWord = this.removeBadWord.bind(this);

    this.updateDictionarySize();
  }

  addInputValueChange(event) {
    this.setState({ addInputValue: event.target.value });
  }

  removeInputValueChange(event) {
    this.setState({ removeInputValue: event.target.value });
  }

  submitBadWord(event) {
    const { addInputValue } = this.state;  // Always valid value.

    http.post('addBadWord', { badWord: addInputValue })
      .then(() => {
        toast(`Saved: ${addInputValue}`);
        this.setState({ addInputValue: '' });
        this.updateDictionarySize();
      })
      .catch(() => {
        toast.error(`The word: "${addInputValue}" already exists/not allowed`);
      });
    event.preventDefault();
  }

  removeBadWord(event) {
    const { removeInputValue } = this.state; // Always valid value.

    http.post('removeBadWord', { badWord: removeInputValue })
      .then(() => {
        toast(`Removed: ${removeInputValue}`);
        this.setState({ removeInputValue: '' });
        this.updateDictionarySize();
      })
      .catch(() => {
        toast.error(`The word: ${removeInputValue} not found`);
      });
    event.preventDefault();
  }

  updateDictionarySize() {
    http.get('getDictionarySize')
      .then((response) => {
        this.setState({ dictionarySize: response.data.dictionarySize });
      });
  }

  render() {
    const { dictionarySize, addInputValue, removeInputValue } = this.state;
    return (
      <div className='container'>
        <NavBar />
        <div className='container'>
          <div className="row">

            <div className='card mt-5 col-8 mr-3 border'>
              <div className='card-body container'>
                <div>
                  <div className='d-flex card-title align-items-center w-100'>
                    <img
                      alt='Add new bad word'
                      className='wh-20px mr-2'
                      src={Plus}
                    />
                    <h5 className='mb-0'>Add new bad word</h5>
                  </div>
                  <form onSubmit={this.submitBadWord}>
                    <input
                      type="text"
                      className='w-100 custom-form-control-input'
                      placeholder='write a single bad Russian word'
                      value={addInputValue}
                      onChange={this.addInputValueChange}
                    />
                    <input
                      className='btn btn-secondary w-100 mt-1'
                      type="submit"
                      value="Submit"
                      disabled={!validateWord(addInputValue)}
                    />
                  </form>
                </div>

                <div className='mt-5'>
                  <div className='d-flex card-title align-items-center w-100'>
                    <img
                      alt='Remove bad word'
                      className='wh-20px mr-2'
                      src={Cancel}
                    />
                    <h5 className='mb-0'>Remove bad word</h5>
                  </div>
                  <form onSubmit={this.removeBadWord}>
                    <input
                      type="text"
                      className='w-100 custom-form-control-input'
                      placeholder='write a single bad Russian word'
                      value={removeInputValue}
                      onChange={this.removeInputValueChange}
                    />
                    <input
                      className='btn btn-secondary w-100 mt-1'
                      type="submit"
                      value="Remove"
                      disabled={!validateWord(removeInputValue)}
                    />
                  </form>
                </div>
              </div>
            </div>

            <div className='card mt-5 col-sm border'>
              <div className='card-body'>

                <div className='card-title row'>
                  <img
                    alt='Library size'
                    className='wh-20px mr-2'
                    src={Cloud}
                  />
                  <h5 className='mb-0'>Library</h5>
                </div>
                <p className='card-text row'>
                  <span className='font-weight-bold mr-1'>
                    {dictionarySize}
                  </span>
                  bad words
                </p>

                <div className='card-title row'>
                  <img
                    alt='Regular expressions size'
                    className='wh-20px mr-2'
                    src={Umbrella}
                  />
                  <h5 className='mb-0'>Regular expressions</h5>
                </div>
                <p className='card-text row'>
                  <span className='font-weight-bold mr-1'>47</span>
                  regular expressions
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
