import React, { Component } from 'react';
import PropTypes from 'prop-types';

const KEYCODE = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
};


class Autocomplete extends Component {
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
  };


  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
      optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      console.log('filteredOptions:', filteredOptions)

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };


  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };


  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;
    const lastFilteredOption = filteredOptions.length - 1;

    switch (e.keyCode) {
      case KEYCODE.UP:
        if (activeOption === 0) {
          this.setState({ activeOption: lastFilteredOption });
        } else {
          this.setState({ activeOption: activeOption - 1 });
        }
        break;
      case KEYCODE.DOWN:
        if (activeOption === lastFilteredOption) {
          this.setState({ activeOption: 0 });
        } else {
          this.setState({ activeOption: activeOption + 1 });
        }
        break;
      case KEYCODE.ENTER:
        this.setState({
          activeOption: 0,
          showOptions: false,
          userInput: filteredOptions[activeOption]
        });
        break;

      default:
        break;
    }
  };


  render() {
    const { activeOption, filteredOptions, showOptions, userInput } = this.state;
    let optionList;

    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, i) => {
              let className;
              if (i === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={this.onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}


Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Autocomplete;
