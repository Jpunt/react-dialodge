import './transitions.css';

import React from 'react';
import PropTypes from 'prop-types';
import {TransitionGroup, Transition, CSSTransition} from 'react-transition-group';

import styles from './styles';

const duration = 2000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
};

export default class Dialodge extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    close: PropTypes.func.isRequired,
  };

  state = {
    children: null,
    contentIsLargerThanViewPort: false,
    viewPortIsSmall: false,
  };

  contentRef = null;

  onKeyUp = (e) => {
    if (e.key == 'Escape' && this.props.children) {
      this.props.close();
    }
  };

  onResize = (e) => {
    this.onChangeContentHeight();
    this.setState({viewPortIsSmall: window.innerWidth < 600});
  };

  onChangeContentHeight = () => {
    const windowHeight = window.innerHeight;
    const contentHeight = this.contentRef && this.contentRef.getBoundingClientRect().height;
    this.setState({contentIsLargerThanViewPort: contentHeight > windowHeight});
  };

  componentDidMount() {
    window.document.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('resize', this.onResize);
    this.onChangeContentHeight();
  }

  componentWillUnmount() {
    window.document.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children != this.props.children) {
      this.setState({children: nextProps.children});
    }
  }

  componentDidUpdate(prevProps) {
    // Prevent de body from scrolling while the modal is open.
    // This has to be as high up as the body to work. If you
    // know a better way: please do!
    window.document.body.style.overflow = !!this.props.children ? 'hidden' : 'auto';

    if (prevProps.children != this.props.children) {
      this.onChangeContentHeight();
    }
  }

  render() {
    const {children, contentIsLargerThanViewPort, viewPortIsSmall} = this.state;
    return <TransitionGroup>
      {children &&
        <CSSTransition key={0} classNames="Dialodge" timeout={{enter: 200, exit: 150}}>
          <div style={{
            ...styles.container,
            ...(children && styles.containerIsOpen),
            ...(!contentIsLargerThanViewPort && styles.containerContentIsVerticallyCentered),
          }}>
            <div
              style={styles.background}
              className="Dialodge-background"
              onClick={this.props.close}
            />

            <div
              style={{
                ...styles.content,
                ...(contentIsLargerThanViewPort && viewPortIsSmall && styles.contentIsFullScreen),
              }}
              className="Dialodge-content"
              ref={ref => (this.contentRef = ref)}>
              {children}
            </div>
          </div>
        </CSSTransition>
      }
    </TransitionGroup>;
  }
}
