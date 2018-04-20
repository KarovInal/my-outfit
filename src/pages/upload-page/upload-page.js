import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { map } from 'lodash';

import { addPointer, getPointersAddedPhoto } from 'Ducks/added-photo';

import UploadPhoto from 'Components/upload-photo';

import Content from 'Layouts/content';

const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PhotoWrapSquare = styled.div`
  content: "";
  display: block;
  padding-bottom: 100%;
`;

const PhotoWrap = styled.div`
  background-color: #f2f3f4;
  bottom: 0;
  display: block;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

const Photo = styled.div`
  background-image: url( ${props => props.src} );
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  transition: all 0.2s ease;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotate(90deg);
`;

const Pointer1 = styled.div`
  margin-top: -16px;
  background-color: black;
  height: 20px;
  width: 20px;
`;

const Pointer2 = styled.div`
  position: absolute;
  left: ${props => props.x + '%'};
  top: ${props => props.y + '%'};
  margin-top: -16px;
  background-color: black;
  height: 20px;
  width: 20px;
`;

const dispatchToProps = dispatch => bindActionCreators({
  addPointer
}, dispatch);

const stateToProps = createStructuredSelector({
  pointersPhoto: getPointersAddedPhoto
})

@connect(stateToProps, dispatchToProps)
class UploadPage extends Component {
  state = {
    imageUrl: ''
  }

  handleUpload = imageUrl => {
    this.setState({
      imageUrl
    })
  }

  onAddPointer = e => {
    const xCor = e.pageX - this.preview.offsetLeft;
    const yCor = e.pageY - this.preview.offsetTop;

    const x = (xCor / this.preview.offsetWidth) * 100;
    const y = (yCor / this.preview.offsetHeight) * 100;
    this.props.addPointer(x, y);
  }

  renderPointers = () => {
    const { pointersPhoto } = this.props;
    return map(pointersPhoto, pointer => {
      return (
        <Pointer2
          key = { pointer.ID }
          x   = { pointer.coordinates.x }
          y   = { pointer.coordinates.y }
        />
      )
    });
  }

  render() {
    return (
      <Content style={{ paddingTop: '10px' }}>
        <Row type="flex" align="middle" justify="center">
          <Col span={8} align="center" justify="center">
            <UploadPhoto onUpload={this.handleUpload} />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center">
          <PhotoContainer innerRef={preview => { this.preview = preview }}>
            <PhotoWrapSquare>
              <PhotoWrap>
                <Photo src={this.state.imageUrl} onClick={this.onAddPointer} />
                { this.renderPointers() }
              </PhotoWrap>
            </PhotoWrapSquare>
          </PhotoContainer>
        </Row>
      </Content>
    )
  }
}

export default UploadPage;
