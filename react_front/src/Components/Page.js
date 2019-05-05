import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: "1px",
  },
  page: {
    marginTop: "24px",
    textAlign: "center"
  }
});

function Page(props) {
  const { classes, total, current, params } = props;
  var res = [];
  if (current<=1) {
    res.push(<Button disabled variant="contained" size="small" color="primary" className={classes.button}>Previous</Button>);
  } else {
    res.push(<Button component={Link} to={{ pathname: "/", search: '?p='+(current-1)+'&key='+(params.get("key")?params.get("key"):"")+'&cate='+(params.get("cate")?encodeURIComponent(params.get("cate")):"") }} variant="contained" size="small" color="primary" className={classes.button}>Previous</Button>);
  }
  
  if (total>10) {
    for (var i=current; i<current+6; i++) {
        res.push(<Button component={Link} to={{ pathname: "/", search: '?p='+(i)+'&key='+(params.get("key")?params.get("key"):"")+'&cate='+(params.get("cate")?encodeURIComponent(params.get("cate")):"") }} variant={i===current?"contained":"outlined"} size="small" color="primary" className={classes.button}>{i}</Button>);
    }
    res.push(<Button variant="outlined" size="small" color="primary" className={classes.button}>...</Button>);
    res.push(<Button component={Link} to={{ pathname: "/", search: '?p='+(total)+'&key='+(params.get("key")?params.get("key"):"")+'&cate='+(params.get("cate")?encodeURIComponent(params.get("cate")):"")}} variant="outlined" size="small" color="primary" className={classes.button}>{total}</Button>);
  } 

  if (current>=total) {
    res.push(<Button disabled variant="contained" size="small" color="primary" className={classes.button}>Next</Button>);
  } else {
    res.push(<Button component={Link} to={{ pathname: "/", search: '?p='+(current+1)+'&key='+(params.get("key")?params.get("key"):"")+'&cate='+(params.get("cate")?encodeURIComponent(params.get("cate")):"") }} variant="contained" size="small" color="primary" className={classes.button}>Next</Button>)
  }
  

  return (
    <div className={classes.page}>
      
      {res}
      
    </div>
  );
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);
