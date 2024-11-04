
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../App.css';

const Layout = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
