// imports from vendor deps
// import _ from 'lodash/fp';
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';

// imports from styles
import './link.scss';

// imports from 'components'

// imports from 'constants'

// imports from helpers
// import { preventedDefault, isExternalUrl } from 'utils';

// additional code
// const noOp = preventedDefault(() => {});

// exports / class definitions
export default class Link extends React.Component {

  static propTypes = {
    children: toBe.node.isRequired,
    className: toBe.string,
    url: toBe.string,
    route: toBe.object,
    callback: toBe.func,
    newWindow: toBe.bool,
    disabled: toBe.bool,
    unstyled: toBe.bool,
    params: toBe.object,
  };

  static contextTypes = {
    router: toBe.object,
    // canLeaveRoute: toBe.func,
  };

  static defaultProps = {
    newWindow: false,
    disabled: false,
    unstyled: false,
  };

  constructor(...args) {
    super(...args);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  shouldOpenInNewTab(event) { // eslint-disable-line react/sort-comp
    // cmd + click on mac
    // ctrl + click on win
    return event.button === 0 && (event.metaKey || event.ctrlKey);
  }

  onClickHandler(...args) {
    // This function is used as a Link middleware for router5 navigation
    const { disabled, callback, url, route } = this.props;
    const { router } = this.context; // canLeaveRoute
    const event = args[0];

    // check if there's some state or user action that prevents us
    // from navigating to a new route
    if (
      !url
      || url === '#'
      || disabled
      || event.defaultPrevented
      // || (_.isFunction(canLeaveRoute) && !canLeaveRoute())
    ) {
      console.log(23232, event);
      event && event.preventDefault(); // don't do anything
    } else if (!this.shouldOpenInNewTab(event)) {
      event.preventDefault(); // prevent default browser action on link click
      if (route) {
        router.navigate(route.name, route.params, { reload: route.reload });
      } else {
        // router.navigateToUrl(url, params);
      }
    }

    !disabled && callback && callback(...args);
  }

  render() {
    const {
      children,
      className,
      callback,
      disabled,
      newWindow,
      url,
      unstyled,
    } = this.props;

    const label = typeof(children) === 'string' ? <span>{children}</span> : children;
    const computedClassName = classNames(className, {
      '-disabled': disabled,
      '_unstyled-link': unstyled,
    });

    return newWindow // external urls will be opened in a new tab
      ? (
         <a
           target={newWindow ? '_blank' : '_self'}
           href={url}
           onClick={disabled ? () => {} : callback} // onClick={disabled ? noOp : callback}
           className={computedClassName}
         >
           { label }
         </a>
      )
      : (
        <a
          onClick={this.onClickHandler}
          className={computedClassName}
          href={url}
        >
          { label }
        </a>
      );
  }
}
