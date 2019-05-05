import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Page from './Page';
import ShopCart from './ShopCart';

const host = 'http://127.0.0.1:8000/';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 8,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  }
});

class Layout extends React.Component{
    constructor(props) {
        super(props);        
        this.state = {
            error: null,
            isLoaded: false,
            current: 1,
            items: []
        };
    }

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        fetch(host+'?p='+(params.get("p")?params.get("p"):1)+'&key='+(params.get("key")?params.get("key"):"")+'&cate='+(params.get("cate")?encodeURIComponent(params.get("cate")):""))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data,
                    total: result.total_page,
                    current: result.current_page,
                    params: params
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
    
    render() {
        const { classes } = this.props;
        const { error, isLoaded, items, total, current, params } = this.state;

        var res = [];
        if (this.props.match.url == "/shop_cart") {
            res.push(<Grid item xs={12} sm={9}><ShopCart /></Grid>);
        } else {
            res.push(<Grid item xs={12} sm={9}><Paper className={classes.paper}><ProductList items={items} /></Paper><Grid item xs={12}><Page total={total} current={current} params={params} /></Grid></Grid>);
        }
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className={classes.root}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}>
                            <CategoryList />
                            </Paper>
                        </Grid>
                        {res}
                    </Grid>
                </div>
            );
        }
    }

    propTypes = {
        classes: PropTypes.object.isRequired,
    };
    
}

export default withStyles(styles)(Layout);
