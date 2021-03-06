/* next.js head */
import Head from 'next/head';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import SearchIcon from '@material-ui/icons/Search';
import NextLink from 'next/link';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { theme } from '../utils/styles';
import { siteName } from '../utils/config';
import {
  Badge,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useStyles } from '../utils/styles';
import { Store } from './Store';
import { USER_SIGN_OUT } from '../utils/constants';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function Layout({ children, title = 'NextJS Hello' }) {
  const classes = useStyles();

  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const signoutHandler = () => {
    dispatch({ type: USER_SIGN_OUT });
    Cookies.remove('userInfo');
    Router.push('/');
  };

  const [userMenuElement, setUserMenuElement] = React.useState(null);
  const userMenuOpenHandler = (event) => {
    setUserMenuElement(event.currentTarget);
  };
  const userMenuCloseHandler = () => {
    setUserMenuElement(null);
  };

  const [adminMenuElement, setAdminMenuElement] = React.useState(null);
  const adminMenuOpenHandler = (event) => {
    setAdminMenuElement(event.currentTarget);
  };
  const adminMenuCloseHandler = () => {
    setAdminMenuElement(null);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarCloseHandler = () => {
    setSidebarOpen(false);
  };

  const sidebarOpenHandler = () => {
    setSidebarOpen(true);
  };

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - ${siteName}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton aria-label="open sidebar" onClick={sidebarOpenHandler}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={sidebarOpen}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Typography
                    gutterBottom
                    variant="h2"
                    color="textPrimary"
                    component="h2"
                  >
                    Product Categories
                  </Typography>
                </ListItem>
                <ListItem href="#">
                  <Link href="/search?category=Shirts">
                    <Typography>Shirts</Typography>
                  </Link>
                </ListItem>
                <ListItem href="#">
                  <Link href="/search?category=Pants">
                    <Typography>Pants</Typography>
                  </Link>
                </ListItem>
              </List>
            </Drawer>

            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                {siteName}
              </Link>
            </NextLink>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form action="/search">
                <InputBase
                  name="name"
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  {cart.cartItems.length > 0 ? (
                    <Badge badgeContent={cart.cartItems.length} color="primary">
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
            </nav>
            {userInfo ? (
              <>
                <Button aria-controls="user-menu" onClick={userMenuOpenHandler}>
                  {userInfo.name}
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={userMenuElement}
                  keepMounted
                  open={Boolean(userMenuElement)}
                  onClose={userMenuCloseHandler}
                >
                  <MenuItem>
                    <NextLink href="/profile">
                      <Link color="primary" href="/profile">
                        User Profile
                      </Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href="/order-history">
                      <Link color="primary" href="/order-history">
                        Order History
                      </Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem onClick={signoutHandler}>Sign Out</MenuItem>
                </Menu>
                {userInfo.isAdmin && (
                  <>
                    <Button
                      aria-controls="admin-menu"
                      onClick={adminMenuOpenHandler}
                    >
                      Admin
                    </Button>
                    <Menu
                      id="admin-menu"
                      anchorEl={adminMenuElement}
                      keepMounted
                      open={Boolean(adminMenuElement)}
                      onClose={adminMenuCloseHandler}
                    >
                      <MenuItem>
                        <NextLink href="/admin/orders">
                          <Link color="primary" href="/admin/orders">
                            Orders
                          </Link>
                        </NextLink>
                      </MenuItem>
                      <MenuItem>
                        <NextLink href="/admin/products">
                          <Link color="primary" href="/admin/products">
                            Products
                          </Link>
                        </NextLink>
                      </MenuItem>
                      <MenuItem>
                        <NextLink href="/admin/users">
                          <Link color="primary" href="/admin/users">
                            Users
                          </Link>
                        </NextLink>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            ) : (
              <NextLink href="/signin">
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                >
                  Sign In
                </Button>
              </NextLink>
            )}
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© '}
              {siteName} {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
  );
}
