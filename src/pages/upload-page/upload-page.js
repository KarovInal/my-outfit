import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { map, get } from 'lodash';
import random from 'Utils/random';

import {
  addPointer,
  getPointersAddedPhoto,
  setCurrentPointerAdd,
  getCurrentPointerAdd,
  getCurrentPointerEdit
} from 'Ducks/added-photo';

import UploadPhoto from 'Components/upload-photo';
import AddingPhotoModal from 'Components/adding-photo-modal';
import PointerWithEdit from 'Components/pointer-with-edit';
import EditControls from 'Components/edit-controls';
import PointerList from 'Components/pointer-list';

import Content from 'Layouts/content';

const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  background-color: #ccc;
`;

const PhotoWrapSquare = styled.div`
  content: "";
  display: block;
  padding-bottom: 100%;
`;

const PhotoWrap = styled.div`
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
`;

const stateToProps = createStructuredSelector({
  pointersPhoto: getPointersAddedPhoto,
  currentPointerAdd: getCurrentPointerAdd,
  currentPointerEdit: getCurrentPointerEdit
})

const dispatchToProps = dispatch => bindActionCreators({
  addPointer,
  setCurrentPointerAdd
}, dispatch);


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
    const pointerID = random();

    this.props.addPointer(x, y, pointerID);
    this.props.setCurrentPointerAdd(pointerID);
  }

  renderPointers = () => {
    const { pointersPhoto } = this.props;

    return map(pointersPhoto, pointer => {
      return (
        <PointerWithEdit
          key     = { pointer.ID }
          ID      = { pointer.ID }
          x       = { pointer.coordinates.x }
          y       = { pointer.coordinates.y }
        />
      )
    });
  }

  render() {
    const { currentPointerAdd, currentPointerEdit, pointersPhoto } = this.props;

    const currentPointerAddID = get(currentPointerAdd, 'ID');
    const currentPointerEditID = get(currentPointerEdit, 'ID');

    return (
      <Content style={{ paddingTop: '10px' }}>
        <Row type="flex" align="middle" justify="center">
          <Col span={8} align="center" justify="center">
            <AddingPhotoModal
              isVisible={!!currentPointerAdd}
              ID={currentPointerAddID}
              initialValues={{
                label: 'Куртка Nike',
                price: 6123,
                brand: 'nike'
              }}
            />
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
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} sm={18} md={14} align="center" justify="center">
            <PointerList pointers={pointersPhoto}/>
          </Col>
        </Row>
        <EditControls isVisible={!!currentPointerEdit} ID={ currentPointerEditID } />
      </Content>
    )
  }
}

export default UploadPage;
