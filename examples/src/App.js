import React from 'react';

import {transitions} from 'react-dialodge';

import ModalButton from './ModalButton';

export default () => (
  <div>
    <p>Basic, small dialog with default transitions:</p>
    <ModalButton>
      <p>Hi</p>
    </ModalButton>

    <p>Basic, small dialog with special transitions:</p>
    <ModalButton contentTransition={transitions.bottomsUp}>
      <p>Hi</p>
    </ModalButton>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>

    <ModalButton>
      <div style={{height: '120vh'}}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
      </div>
    </ModalButton>
  </div>
);
