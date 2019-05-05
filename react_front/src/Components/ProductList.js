import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ProductCard from './ProductCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    border: 0,
    color: theme.palette.text.secondary,
  }
});

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes,items } = this.props;
    return(<div className={classes.root}>
      <Grid container spacing={16}>
        {items.map(item => (
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>
              <ProductCard item = {item} />
            </Paper>
          </Grid>          
        ))}
      </Grid>
    </div>)
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
