import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { http } from '../../axios';

/** Component renders the main page. */
class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '', dictionarySize: 0 };

    this.inputValueChange = this.inputValueChange.bind(this);
    this.submitBadWord = this.submitBadWord.bind(this);

    this.updateDictionarySize();
  }

  inputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  submitBadWord(event) {
    const { inputValue } = this.state;

    // TODO: Add validation.
    if (inputValue.length > 1) {
      http.post('addBadWord', { badWord: inputValue })
        .then((response) => {
          alert(`${inputValue} : ${response.data}`);
          this.setState({ inputValue: '' });
          this.updateDictionarySize();
        });
      event.preventDefault();
    }
  }

  updateDictionarySize() {
    http.get('getDictionarySize')
      .then((response) => {
        this.setState({ dictionarySize: response.data.dictionarySize });
      });
  }

  render() {
    const { dictionarySize, inputValue } = this.state;
    return (
      <div className='container'>
        <NavBar />
        <div className='container'>
          <div className="row">

            <div className='card mt-5 col-8 mr-3 border'>
              <div className='card-body container'>
                <h5 className='card-title w-100'>Add new bad word</h5>
                <form onSubmit={this.submitBadWord}>
                  <input
                    type="text"
                    className='w-100 custom-form-control-input'
                    placeholder='bad word...'
                    value={inputValue}
                    onChange={this.inputValueChange}
                  />
                  <input
                    className='btn btn-secondary w-100 mt-1'
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>

            <div className='card mt-5 col-sm border'>
              <div className='card-body'>
                <h5 className='card-title row'>Library size</h5>
                <p className='card-text row'>{dictionarySize}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
