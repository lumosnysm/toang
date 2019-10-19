import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Modal from '@material-ui/core/Modal';
import SignIn from '../../../../../../client/components/sign_in';
import SignUp from '../../../../../../client/components/sign_up';
import path from '../../../../../../client/config/path';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const [openModal, changeModal] = useState(false);
  const [isLogin, changeLogin] = useState(true);

  let button = '';
  let modalContent = '';

  function openLogin() {
    changeModal(true);
    changeLogin(true);
  }

  function openSignUp() {
    changeLogin(false);
  }

  function handleCloseModal() {
    changeModal(false);
  }

  function logout() {
    axios.delete(path.log_out()).then(res => {
        window.location.href = path.root()
    });
  }

  function handleSignIn(email,password) {
    const token = document.getElementsByName('csrf-token')[0].content;
    axios.post(path.sign_in(),{email,password}, {
      headers: {'X-CSRF-Token': token}
    }).then(resp => {
      window.location.href = path.root();
    });
  }

  function handleSignUp(name, email, password) {
    const token = document.getElementsByName('csrf-token')[0].content;
    axios.post(path.sign_up(), {name,email,password}, {
      headers: {'X-CSRF-Token': token}
    }).then(resp => {
      window.location.href = path.root();
    });
  }

  if (props.current_user) {
    button = <IconButton
               className={classes.signOutButton}
               color="inherit"
               onClick={logout}
             >
               <InputIcon />
             </IconButton>
  } else {
    button = <IconButton
               className={classes.signOutButton}
               color="inherit"
               onClick={openLogin}
             >
               <LockOpenIcon />
             </IconButton>
  }

  if (isLogin) {
    modalContent = <SignIn handleSignIn = {handleSignIn}
                     openSignUp = {openSignUp} />
  } else {
    modalContent = <SignUp handleSignUp = {handleSignUp}
                     openLogin = {openLogin} />
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {button}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>

      <Modal
        className={classes.modal}
        open={openModal}
        onClose={this.handleCloseModal}
        disableAutoFocus
      >
        {modalContent}
      </Modal>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
