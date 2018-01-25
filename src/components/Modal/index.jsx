
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import removeClass from 'dom-helpers/class/removeClass';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';


export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    allowClickOutside: PropTypes.bool,
    children : PropTypes.node.isRequired,
    bgColor: PropTypes.string,
  }

  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    allowClickOutside: true,
    bgColor: "#FFFFFF",
  }

  constructor (props) {
    super(props);
    this.wrapper = null;
    this.state= { exit: true };
  }

  componentDidMount() {
    if (this.wrapper) {
      this.wrapper.addEventListener('keydown', event => {
        if (event.keyCode === 27) { // esc
          this.props.onClose(event);
        }
      });
      this.wrapper.focus();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isOpen === false && nextProps.isOpen === true) {
      this.setState({ exit: false });
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen === false && this.props.isOpen === true) {
      this.wrapper.focus();
    }
  }

  render () {
    const { isOpen, onClose, children, bgColor } = this.props;

    return (
      <div
        className={ cn("modal", { "modal-open": isOpen }) }
        tabIndex="-1"
        ref={ elm => { this.wrapper = elm; } }
      >
        { isOpen && <div
          className="modal-overlay"
          onClick={ (e) => {
            if (this.props.allowClickOutside) {
              this.setState({ exit: true });
            }
          }}
        >
          <TransitionGroup className="modal-transition-group" appear>
            { this.state.exit
              ? null
              :
              <CSSTransition
                key={1}
                classNames="modal"
                onEnter={ (node) => removeClass(node, 'modal-appear') }
                onExited={ onClose }
                timeout={{ appear: 300, enter: 300, exit: 100 }}
              >
                <div className="modal-wrapper" onClick={ (e) => e.stopPropagation() } style={{ backgroundColor: bgColor }}>
                  <div
                    onClick={(e) => this.setState({ exit: true })}
                    className="modal-close"
                  >&times;</div>
                  <div className="modal-content">
                    { children }
                  </div>
                </div>
              </CSSTransition>
            }
          </TransitionGroup>
          </div> }
      </div>
    )
  }
}
