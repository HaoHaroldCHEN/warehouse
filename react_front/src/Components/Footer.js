import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    foot: {
      background: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "12px 24px"
    }
});

class Footer extends React.Component {
  
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.foot}>CopyRight</div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
