/* eslint-disable react/no-deprecated */
// imports from vendor deps
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

// imports from styles
import './input-text.scss';

// imports from 'components'
// imports from 'constants'
// imports from helpers
// additional code

// exports / class definitions
export default class InputText extends React.Component {

  static propTypes = {
    value: toBe.any,
    defaultValue: toBe.any,
    onChange: toBe.func,
    onBlur: toBe.func,
    type: toBe.string,
    invalid: toBe.bool,
    disabled: toBe.bool,
    className: toBe.string,
    maxLength: toBe.number,
    trimOnBlur: toBe.bool,
  };

  static defaultProps = {
    value: null,
    type: 'text',
    onChange: _.noop,
    onBlur: _.noop,
    invalid: false,
	  disabled: false,
    maxLength: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: !_.isNil(props.value) ? props.value : props.defaultValue,
    };
    _.bindAll(['handleChange', 'handleBlur'], this);
  }

  componentWillReceiveProps(nextProps) { // TODO: getDerivedPropsFromState
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(e) {
    const newValue = e.target.value;
    this.setState({ value: newValue }, () => this.props.onChange(newValue));
  }

  handleBlur(e) {
    if (this.props.trimOnBlur) {
      const newValue = e.target.value;
      const newEvent = _.merge(e, { target: { value: newValue.trim() } });
      this.handleChange(newEvent);
      this.props.onBlur(newEvent);
    } else {
      this.props.onBlur(e);
    }
  }

  render() {
    const { className, invalid } = this.props;

    // HACK: This component uses onInput instead of onChange
    // because IE11 fails to call onChange events when you paste/cut using context menu (RMB)
    // We're using onInput because it works fine, and because for text input
    // there's no difference between how onChange and onInput work
    return (
      <input
        {..._.omit(['defaultValue', 'onChange'], this.props)}
        className={classNames(className, 'input-text', {
          '-invalid': invalid,
        })}
        value={this.state.value}
        onBlur={this.handleBlur}
        onInput={this.handleChange}
      />
    );
  }

}
