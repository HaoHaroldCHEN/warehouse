import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const host = 'http://127.0.0.1:8000/';

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  price: {
      padding: '12px;',
      textAlign: 'right',
      fontSize: 18
  },
  img: {
    width: '100px',
    margin: '4px'
  }
});

class ShopCart extends React.Component {
  constructor(props) {
    super(props);        
    this.state = {
        error: null,
        isLoaded: false,
        total: 0,
        items: []
    };
  }

  componentDidMount() {
    var storage = window.sessionStorage; 
    var total_items = [];
    for (var i=0, len = storage.length; i < len; i++){ 
        var key = storage.key(i); 
        fetch(host+'cart_query?sku='+key)
        .then(res => res.json())
        .then(
            (result) => {
                result.data.Quantity = storage.getItem(result.data.sku);
                total_items.push(result.data);
                console.log(total_items);
                this.setState({
                    isLoaded: true,
                    items: total_items,
                    total: this.state.total+(result.data.Quantity*result.data.price)
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

    
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Product Title</CustomTableCell>
            <CustomTableCell align="right">Img</CustomTableCell>
            <CustomTableCell align="right">Unti Price</CustomTableCell>
            <CustomTableCell align="right">Quantity</CustomTableCell>
            <CustomTableCell align="right">Price</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.items.map(row => (
            <TableRow className={classes.row}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right"><img className={classes.img} src={row.image_url}/></CustomTableCell>
              <CustomTableCell align="right">{row.price}</CustomTableCell>
              <CustomTableCell align="right">{row.Quantity}</CustomTableCell>
              <CustomTableCell align="right">{row.price*row.Quantity}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.price}>Total Price: ${this.state.total}</div>
    </Paper>
    )
  }
}

ShopCart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopCart);
