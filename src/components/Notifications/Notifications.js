// vendors
import React from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

// styles
import './notifications.scss'

// modules
import { removeNotifications, ACTION_REMOVE, ACTION_ADD } from 'modules/notifications';

const mapStateToProps = (state) => ({
  notifications: state.notifications.items,
});

const actions = {
  [ACTION_ADD]: 'addNotification',
  [ACTION_REMOVE]: 'removeNotification',
};

export class Notifications extends React.Component {

  static propTypes = {
    notifications: toBe.array,
    dispatch: toBe.func,
    autoDismiss: toBe.oneOfType([
      toBe.number,
      toBe.bool,
    ]),
    allowHTML: toBe.bool,
  };

  static defaultProps = {
    notifications: [],
    userName: '',
    autoDismiss: 10,
    allowHTML: true,
  };

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(props) {
    if (props.notifications.length) {
      props.notifications.forEach((notification) => {
        this.notificationSystem[actions[notification._action]]({
          autoDismiss: props.autoDismiss,
          ...notification,
        });
      });
      this.props.dispatch(removeNotifications(props.notifications.map((_, index) => index)));
    }
  }

  notificationSystem = null;

  render() {
    const style = {
      NotificationItem: {
        DefaultStyle: {
          padding: '20px 60px 20px 20px',
          fontSize: '16px',
          lineHeight: '1.4',
          margin: '0',
        },
      },
    };
    return (<NotificationSystem ref="notificationSystem" style={style} {...this.props} />);
  }

}

export default connect(mapStateToProps)(Notifications);
