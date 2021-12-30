import React from 'react';
import { render } from 'react-dom';

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement('div');

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;

    render(
      <button type="button" onClick={() => onRemoveButtonClicked(rowKey)}>x</button>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;