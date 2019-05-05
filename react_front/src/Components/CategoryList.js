import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import { Link } from 'react-router-dom';

const host = 'http://127.0.0.1:8000/';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class CategoryList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(host + 'cate_list')
    .then(res => res.json())
    .then(
      (result) => {
          this.setState({
          isLoaded: true,
          items: result.data
          });
      },
      (error) => {
          this.setState({
          isLoaded: true,
          error
          });
      }
    )
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
          <List component="nav" className={classes.root}>
            <ListItem  button onClick={this.handleClick}>
              <ListItemText primary="All Catgory" />
              {this.state.open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Divider />
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {items.map(item => (
                  <ListItem button component={Link} to={{ pathname: "/", search: "?cate="+encodeURIComponent(item)}}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))} 
              </List>
            </Collapse>  
          </List>
        );
    }
  }

  propTypes = {
    classes: PropTypes.object.isRequired,
  };
}

export default withStyles(styles)(CategoryList);
