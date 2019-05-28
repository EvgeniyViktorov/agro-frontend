// vendors
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';

// styles
import './textarea.scss';


export default class Textarea extends React.Component {

  static propTypes = {
    value: toBe.any,
    onChange: toBe.func,
    className: toBe.string,
    maxRows: toBe.number,
    maxLength: toBe.number,
  };

  static defaultProps = {
    value: '',
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { className } = this.props;

    const props = {
      ...this.props,
      className: classNames('textarea', className),
      value: this.state.value,
      onChange: this.handleChange,
    };

    return <textarea {...props} />;
  }
}
