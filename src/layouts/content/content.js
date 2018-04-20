import React, { Component } from 'react';
import { Layout } from 'antd';

const customContentStyle = {
  backgroundColor: 'white',
  margin: '0 auto',
  marginTop: '20px',
  maxWidth: '1200px',
  height: 'auto',
  width: '100%'
}

class Content extends Component {
  static defaultProps = {
    style: {}
  }

  render() {
    return (
      <Layout.Content style={{ ...customContentStyle, ...this.props.style }}>
        { this.props.children }
      </Layout.Content>
    );
  }
}

export default Content;
