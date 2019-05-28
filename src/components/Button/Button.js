// imports from vendor deps
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';

// imports from styles
import './button.scss';


export default class Button extends React.Component {
  static propTypes = {
    className: toBe.string,
    primary: toBe.bool,
    secondary: toBe.bool,
    positive: toBe.bool,
    negative: toBe.bool,
    unstyled: toBe.bool,
    disabled: toBe.bool,
	  loading: toBe.bool,
    children: toBe.any,
  };

  render() {
    const {
      primary,
      secondary,
      positive,
      negative,
      disabled,
      unstyled,
	    loading,
    } = this.props;
    const computedClassName = classNames('button', this.props.className, {
      '-primary': primary,
      '-secondary': secondary,
      '-positive': positive,
      '-negative': negative,
      '-disabled': disabled,
      '-unstyled': unstyled,
      '-loading': loading
    });

    return (
      <button type="button" {...this.props} className={computedClassName}>
	      { loading && <i className="icon fi-arrows-ccw" /> }
        { this.props.children }
      </button>
    );
  }
}
