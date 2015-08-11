var React = require('react');

var CommentContent = React.createClass({

  render: function() {
    return (
      <div className="comment-content">
        <p className="comment-author">{this.props.comment.author} </p> 
        <p className="comment-video-timestamp">@ {this.props.comment.time} seconds </p> 
        <p className="comment-text">{this.props.comment.text} </p>
        <p className="comment-reply-button" onClick={this.props.toggleReplyForm}>Reply</p>
      </div>
    );
  }

});

module.exports = CommentContent;