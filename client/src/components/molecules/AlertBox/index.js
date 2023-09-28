import React from 'react';
import PropTypes from 'prop-types';

import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

let instance = null;

class AlertBox extends React.Component {
  static getInstance() {
    return instance;
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    instance = this;
  }

  render() {
    const { show } = this.state;

    if (!show) {
      return null;
    }

    const { title, description } = this.state;

    return (
      <Dialog open={show} onClose={this.hideAlertBox}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        {this.renderActions()}
      </Dialog>
    );
  }

  renderActions = () => {
    const { actions } = this.state;

    return (
      <DialogActions>
        {_map(actions, (action, index) => (
          <Button onClick={action.onPress} color={action.color || 'primary'}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    );
  };

  showAlertBox = props => {
    this.setState({
      show: true,
      ...nullifiedAlertBoxProps,
      ...props,
    });
  };

  hideAlertBox = () => {
    this.setState(
      {
        show: false,
      },
      this.props.onDismiss
    );
  };
}

/* eslint-disable react/no-unused-prop-types */
const AlertBoxPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,

  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onPress: PropTypes.func,
      title: PropTypes.string,
    })
  ),
};

const nullifiedAlertBoxProps = {};
_forEach(AlertBoxPropTypes, (value, key) => {
  nullifiedAlertBoxProps[key] = undefined;
});

export const showAlertBox = (props = {}) => {
  const boxInstance = AlertBox.getInstance();
  if (boxInstance) {
    boxInstance.showAlertBox({ ...props });
  }
};

export const hideAlertBox = () => {
  const boxInstance = AlertBox.getInstance();
  if (boxInstance) {
    boxInstance.hideAlertBox();
  }
};

AlertBox.propTypes = AlertBoxPropTypes;

export default AlertBox;
