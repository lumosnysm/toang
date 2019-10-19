import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { headerStyles } from './map_styles';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    });
  }

  render() {
    const { classes } = this.props;

    let profile, typeUser;

    if (this.props.current_user && this.props.current_user.type_id == 0) {
      typeUser = <MenuItem onClick={this.handleClose}>Upgrade</MenuItem>
    }

    if (this.props.current_user){
      profile = <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={event => this.handleMenu(event)}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    {typeUser}
                    <MenuItem onClick={this.props.logout}>LogOut</MenuItem>
                  </Menu>
                </div>
    } else {
      profile = <Button color="inherit" onClick={() => this.props.openModal()} >Login</Button>
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TOANG
            </Typography>
            {profile}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStyles)(Appbar);
