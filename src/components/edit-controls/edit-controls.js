import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Modal, Button } from 'antd';
import styled from 'styled-components';

import AddingPhotoModal from 'Components/adding-photo-modal';
import ViewPointer from 'Components/view-pointer';
import EditPhotoModal from 'Components/edit-photo-modal';
import ControlIcon from './components/control-icon';

import { removePointer, removeCurrentPointer, getCurrentPointerEdit } from 'Ducks/added-photo';

import trashImg from './assets/trash.png';
import viewImg from './assets/view.png';
import editImg from './assets/edit.png';
import closeImg from './assets/close.png';

const EditControlsWrap = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 40px;
  width: 100%;
  background-color: white;
  box-shadow: 0 -6px 10px rgba(0, 0, 0, .16);
`;

const stateToProps = createStructuredSelector({
  currentPointerEdit: getCurrentPointerEdit
})

const dispatchToProps = dispatch => bindActionCreators({
  removePointer,
  removeCurrentPointer
}, dispatch);

@connect(stateToProps, dispatchToProps)
class EditControls extends Component {
  state = {
    isVisibleInfo: false,
    isVisibleEdit: false
  }

  handleViewButtonOk = () => {
    this.setState({
      isVisibleInfo: true
    })
  }

  handleViewButtonCancel = () => {
    this.setState({
      isVisibleInfo: false
    })
  }

  handleRemoveButton = () => {
    const { ID, removePointer, removeCurrentPointer } = this.props;

    removeCurrentPointer();
    removePointer(ID);
  }

  handleDisplayEdit = () => {
    this.setState({
      isVisibleEdit: true
    })
  }

  handleCancelEdit = () => {
    this.setState({
      isVisibleEdit: false
    })
  }

  handleCloseEdit = () => {
    this.props.removeCurrentPointer();
  }

  render() {
    const { ID, isVisible, currentPointerEdit } = this.props;

    return isVisible && (
      <EditControlsWrap>
        <Row type="flex" justify="center" style={{ height: '100%' }}>
          <Col span={3}>
            <ControlIcon src={trashImg} onClick={ this.handleRemoveButton } />
          </Col>
          <Col span={3}>
            <ControlIcon src={viewImg} onClick={this.handleViewButtonOk} />
            <ViewPointer
              onCancel={this.handleViewButtonCancel}
              visible={this.state.isVisibleInfo}
              pointerData={currentPointerEdit}
            />
          </Col>
          <Col span={3}>
            <ControlIcon src={editImg} onClick={this.handleDisplayEdit}/>
            <EditPhotoModal
              ID={ID}
              initialValues={{
                label: currentPointerEdit.label,
                brand: currentPointerEdit.brand,
                price: currentPointerEdit.price,
              }}
              onCancel={this.handleCancelEdit}
              visible={this.state.isVisibleEdit}
            />
          </Col>
          <Col span={3}>
            <ControlIcon src={closeImg} onClick={this.handleCloseEdit}/>
          </Col>
        </Row>
      </EditControlsWrap>
    )
  }
}

export default EditControls;
