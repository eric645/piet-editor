import React from 'react';

import Settings from './settings';
import ColorPallet from './colorPallet';
import Canvas from './canvas';

const confirm = window.confirm;

export default class Editor extends React.Component {
  static copyCanvas(canvas) {
    return JSON.parse(JSON.stringify(canvas));
  }

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: 10,
        height: 10,
      },
      selectedColor: 'lred',
      canvas: new Array(10).fill(
        new Array(10).fill('white')
      ),
    };

    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSelectedColor = this.onChangeSelectedColor.bind(this);
    this.updateCodel = this.updateCodel.bind(this);
  }

  onChangeSize(s) {
    if (s.width < this.state.size.width ||
        s.height < this.state.size.height) {
      if (!confirm('New canvas size is smaller than current size. Are you sure?')) {
        return;
      }
    }
    this.setState({ size: s });
  }

  onChangeSelectedColor(c) {
    this.setState({ selectedColor: c });
  }

  updateCodel(pos) {
    if (this.state.canvas[pos.Y][pos.X] !== this.state.selectedColor){
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      newCanvas[pos.Y][pos.X] = this.state.selectedColor;
      this.setState({ canvas: newCanvas });
    }
  }

  render() {
    return (
      <div>
        <Settings onChangeSize={this.onChangeSize} size={this.state.size} />
        <ColorPallet
          onChangeSelectedColor={this.onChangeSelectedColor}
          selectedColor={this.state.selectedColor}
        />
        <Canvas
          size={this.state.size}
          updateCodel={this.updateCodel}
          color={this.state.selectedColor}
        />
        <div className='debug'>
          <div>width: {this.state.size.width}</div>
          <div>height: {this.state.size.height}</div>
          <div>selected: {this.state.selectedColor}</div>
        </div>
      </div>
    );
  }
}
