import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CartIcon from '@material-ui/icons/ShoppingCart';

import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    float: 'right'
  },
  inputRoot: {
    color: 'inherit',
    width: '90%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    width: '30px',
    marginRight: '12px'
  },
  input: {
    color: 'white',
    paddingLeft: '4px'
  },
  iconButton: {
    color: '#FFF'
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cart: window.sessionStorage.length};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      cart: window.sessionStorage.length
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={Logo} className={classes.logo} alt="Noel Leeming" />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Noel Leeming
            </Typography>
            <div className={classes.search}>
            <form method="get">
              <InputBase name="key" className={classes.input} placeholder="Search..." ref="search" />
              <IconButton className={classes.iconButton} aria-label="Search" type="submit">
                <SearchIcon />
              </IconButton>
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" component={Link} to={{ pathname: "/shop_cart"}}>
                <Badge badgeContent={this.state.cart} color="secondary">
                  <CartIcon />
                </Badge>
              </IconButton>              
            </div>
            <div className={classes.sectionMobile}>
            <IconButton color="inherit" component={Link} to={{ pathname: "/shop_cart"}}>
                <Badge badgeContent={this.state.cart} color="secondary">
                  <CartIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
