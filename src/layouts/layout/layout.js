import React, { Component } from 'react';
import { Layout } from 'antd';

const customLayoutStyle = {
  backgroundColor: '#F4F4F4',
  padding: '0 15px'
}

class LayoutWrap extends Component {
  render() {
    return (
      <Layout style={ customLayoutStyle }>
        { this.props.children }
      </Layout>
    );
  }
}

export default LayoutWrap;
