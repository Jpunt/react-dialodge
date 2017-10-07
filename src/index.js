import React from 'react';
import PropTypes from 'prop-types';
import {TransitionGroup, Transition} from 'react-transition-group';

import styles from './styles';
import * as _transitions from './transitions';
export const transitions = _transitions;

export default class Dialodge extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    close: PropTypes.func.isRequired,
    backgroundStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    backgroundTransition: PropTypes.object,
    contentTransition: PropTypes.object,
    focusOnFirstInput: PropTypes.bool,
  };

  static defaultProps = {
    backgroundStyle: {},
    contentStyle: {},
    backgroundTransition: _transitions.fade(150),
    contentTransition: _transitions.fromBottom({enter: 150, exit: 150}),
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

  onChangeContent = () => {
    if (this.props.children && this.props.focusOnFirstInput) {
      const firstInputInModal = this.contentRef.querySelector('input');
      firstInputInModal && firstInputInModal.focus();
    }
  }

  onChangeContentHeight = () => {
    const windowHeight = window.innerHeight;
    const contentHeight = this.contentRef && this.contentRef.getBoundingClientRect().height;
    this.setState({contentIsLargerThanViewPort: contentHeight > windowHeight});
  };

  componentDidMount() {
    window.document.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('resize', this.onResize);
    this.onChangeContent();
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
    window.document.body.style.overflow = this.props.children ? 'hidden' : 'auto';

    if (prevProps.children != this.props.children) {
      this.onChangeContent();
      this.onChangeContentHeight();
    }
  }

  getStylesForTransition(state, transition) {
    switch (state) {
      case 'entering':
      default:
        return {transition: transition.enter.transition, ...transition.enter.from};
      case 'entered':
        return {transition: transition.enter.transition, ...transition.enter.to};
      case 'exiting':
        return {transition: transition.exit.transition, ...transition.exit.to};
    }
  }

  render() {
    const {children, contentIsLargerThanViewPort, viewPortIsSmall} = this.state;
    const {backgroundTransition, contentTransition} = this.props;
    const enterTimeout = Math.max(backgroundTransition.enter.duration, contentTransition.enter.duration);
    const exitTimeout = Math.max(backgroundTransition.exit.duration, contentTransition.exit.duration);

    return <TransitionGroup>
      {children &&
        <Transition key={0} timeout={{enter: enterTimeout, exit: exitTimeout}}>
          {state => (
            <div style={{
              ...styles.container,
              ...(children && styles.containerIsOpen),
              ...(!contentIsLargerThanViewPort && styles.containerContentIsVerticallyCentered),
            }}>
              <div
                style={{
                  ...styles.background,
                  ...this.props.backgroundStyle,
                  ...this.getStylesForTransition(state, backgroundTransition),
                }}
                className="Dialodge-background"
                onClick={this.props.close}
              />

              <div
                style={{
                  ...styles.content,
                  ...this.props.contentStyle,
                  ...(contentIsLargerThanViewPort && viewPortIsSmall && styles.contentIsFullScreen),
                  ...this.getStylesForTransition(state, contentTransition),
                }}
                className="Dialodge-content"
                ref={ref => (this.contentRef = ref)}>
                {children}
              </div>
            </div>
          )}
        </Transition>
      }
    </TransitionGroup>;
  }
}
