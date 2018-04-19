import React, { Component } from 'react';
import { Layout } from 'antd';

const customContentStyle = {
  backgroundColor: 'white',
  margin: '0 auto',
  maxWidth: '1200px',
  width: '100%'
}

class Content extends Component {
  render() {
    return (
      <Layout.Content style={ customContentStyle }>
        { this.props.children }
      </Layout.Content>
    );
  }
}

export default Content;
