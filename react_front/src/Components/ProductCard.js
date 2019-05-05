import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingAdd from '@material-ui/icons/AddShoppingCart';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  card: {
    maxWidth: '100%'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    width: '70%',
    margin: '5% auto'
  },
  iconSmall: {
    fontSize: 20,
  },
  price: {
      color:'#000',
      fontSize: 20
  },
  title: {
      height:'60px'
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class ProductCard extends React.Component {
    
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
        anchorEl: event.currentTarget,
        });
        console.log(event.currentTarget.getAttribute("data-sku"));
        if (window.sessionStorage[event.currentTarget.getAttribute("data-sku")]) {
            sessionStorage.setItem(event.currentTarget.getAttribute("data-sku"), parseInt(window.sessionStorage[event.currentTarget.getAttribute("data-sku")]) + 1)
        } else {
            sessionStorage.setItem(event.currentTarget.getAttribute("data-sku"), 1); 
        } 
    };

    handleClose = () => {
        this.setState({
        anchorEl: null,
        });
    };

    render() {
        const { classes,item } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt={item.name}
                    className={classes.media}
                    image={item.image_url}
                    title={item.name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="h6" className={classes.title}>
                        <strong>{item.name}</strong>
                    </Typography>
                    <Typography component="p">
                        <strong>Brand:</strong> {item.brand} 
                        <br />
                        <strong>Model:</strong> {item.model}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <span className={classes.price}>
                        <sup>$</sup>{item.price}
                    </span>
                    <Button variant="contained" size="small" color="primary" aria-owns={open ? 'simple-popper' : undefined} aria-haspopup="true" data-sku={item.sku}  onClick={this.handleClick}>
                        <ShoppingAdd className={classes.iconSmall} />
                        Add
                    </Button>
                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                        <Typography className={classes.typography}>Add Success!</Typography>
                    </Popover>
                </CardActions>
            </Card>
        );
    }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);
