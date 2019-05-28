// imports from vendor deps
import React from 'react';
import toBe from 'prop-types';

// imports from styles
import './back-button.scss';

// imports from components
import Link from 'components/Link/Link';


export default class BackButton extends React.Component {
  static propTypes = {
    routeName: toBe.string,
    reload: toBe.bool,
  };

  static defaultProps = {
    reload: true
  };

  render() {
    const { routeName, reload } = this.props;

    return (
	    <Link className="back-button link" route={{ name: routeName, reload }} url="back">
		    <i className="icon fi-left-open" />Назад
	    </Link>
    );
  }
}
