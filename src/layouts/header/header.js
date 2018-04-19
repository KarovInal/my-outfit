import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';

const Logo = styled.span`
  color: #FFA700;
  font-size: 18px;
  font-weight: 900;
  font-style: italic;
`;

const customHeadStyle = {
  textAlign: 'center',
  backgroundColor: '#1D1D1D'
};

class Header extends Component {
  render() {
    return (
      <Layout.Header style={ customHeadStyle }>
        <Logo>MY OUTFIT</Logo>
      </Layout.Header>
    )
  }
}

export default Header;
