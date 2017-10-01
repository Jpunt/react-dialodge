import React from 'react';

import Dialodge from 'react-dialodge';

export default class ModalButton extends React.Component {
  state = {
    content: null,
  };

  open = () => {
    this.setState({content: this.props.children});
  };

  close = () => {
    this.setState({content: null});
  };

  render() {
    return <div>
      <button onClick={this.open}>Click me</button>
      <Dialodge close={this.close}>
        {this.state.content &&
          <div>
            {this.state.content}
            <button onClick={this.close}>Close</button>
          </div>
        }
      </Dialodge>
    </div>;
  }
}
