// imports from vendor deps
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';

// imports from styles
import './form-row.scss';

export default class FormRow extends React.Component {
  static propTypes = {
    multiline: toBe.bool,
    className: toBe.string,
  };

  render() {
    const { multiline, children } = this.props;
    const computedClassName = classNames(
      'form-row', this.props.className, { '-multiline': multiline }
    );

    return (
      <div className={computedClassName}>{ children }</div>
    );
  }
}
