import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextArea from 'react-autosize-textarea';

class CommentForm extends Component {

  state = {
    comment: {
      body:''
    }
  }

  // To enure that focus is set on the comment box
  componentDidUpdate() {
    if(this.props.renderAll) {
      this.input.textarea.focus();
    }
  }

  onKeyDown = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      this.props.onSubmit(e, this.state.comment);
      this.setState({
        comment: {body: ''}
      })
    }
  }

  handleOnChange = ({target: {name, value}}) => {
    this.setState({comment: {...this.state.comment, [name]: value}});
  }

  render() {
    const {avatar} = this.props;
    const {comment} = this.state;

    return(
      <form className="commentbox__post">
        <img className="commentbox__avatar" src={avatar}  alt="User avatar"/>
        <div className="commentbox__field">
          <TextArea 
            name="body"
            value={comment.body}
            onKeyDown={this.onKeyDown}
            onChange={this.handleOnChange} 
            placeholder="Send comment"
            ref={(ref) => this.input = ref}
          />
        </div>
      </form>
    )
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggle: PropTypes.bool
}

export default CommentForm;