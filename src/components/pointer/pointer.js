import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PointerItem = styled.div`
  ${props => !props.isEdit && `
    position: absolute;
    left: ${props.x + '%'};
    top: ${props.y + '%'};
    margin-top: -6px;
    margin-left: -6px;
  `}

  background-color: rgba(255, 167, 0, 0.5);
  height: 12px;
  width: 12px;
  border-radius: 50%;
  box-shadow: 0 0 6px #FFA700;
  border: solid 1px rgba(256, 256, 256, .5);

  &:hover {
    box-shadow: 0 0 7px #FFA700;
    background-color: rgba(255, 167, 0, 0.8);
    border: solid 1px rgba(256, 256, 256, .8);
  }

  &:after {
    content: "";
    display: block;
    width: 4px;
    height: 4px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2px;
    margin-left: -2px;
  }

  ${props => props.isEdit && `
    &:before {
      content: "";
      position: absolute;
      width: 50px;
      height: 50px;
      left: -25px;
      margin-left: 5px;
      top: -25px;
      background-color: rgba(255, 255, 255, .18);
      margin-top: 5px;
      cursor: move;
    }
  `}
`;

class Pointer extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isEdit: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  _handleClick = e => {
    this.props.onClick(e);
  }

  render() {
    const { x, y, isEdit, ...restProps } = this.props;

    return <PointerItem {...restProps} onClick={this._handleClick} />
  }
}

export default PointerItem;
