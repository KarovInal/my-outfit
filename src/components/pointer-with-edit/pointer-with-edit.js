import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import Pointer from 'Components/pointer';

import { getCurrentPointerEdit, setCurrentPointerEdit} from 'Ducks/added-photo';

const stateToProps = createStructuredSelector({
  pointerObject: getCurrentPointerEdit
});

const dispatchToProps = dispatch => bindActionCreators({
  setCurrentPointerEdit
}, dispatch);

@connect(stateToProps, dispatchToProps)
class PointerWithEdit extends Component {
  state = {
    xDraggable: 0,
    yDraggable: 0
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    ID: PropTypes.number.isRequired
  }

  get draggableProps() {
    return {
      defaultPosition: {
        x: this.state.xDraggable,
        y: this.state.yDraggable,
      }
    }
  }

  handlePointerClick = e => {
    const { ID, setCurrentPointerEdit, pointerObject, x, y } = this.props;
    const node = findDOMNode(this);

    const xDraggable = (node.parentNode.offsetWidth * x) / 100 - 6;
    const yDraggable = (node.parentNode.offsetHeight * y) / 100 - 6;

    this.setState({
      xDraggable,
      yDraggable
    })

    if(!pointerObject || pointerObject.ID !== ID) {
      setCurrentPointerEdit(ID);
    }
  }

  checkEditPointer = () => {
    const { pointerObject, ID } = this.props;

    if(!pointerObject || pointerObject.ID !== ID) return false;

    return true;
  }

  render() {
    const { x, y, ID, pointerObject } = this.props;
    const isEdit = this.checkEditPointer();

    if(isEdit) {
      return (
        <Draggable { ...this.draggableProps } bounds="parent">
          <Pointer isEdit onClick={this.handlePointerClick} x={x} y={y} />
        </Draggable>
      )
    }

    return <Pointer onClick={this.handlePointerClick} x={x} y={y} />
  }
}

export default PointerWithEdit;
