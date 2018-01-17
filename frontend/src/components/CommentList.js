import React, { Component } from 'react';
import Moment from 'react-moment';
import { deleteComment } from '../store/comments/actions';
import { connect } from 'react-redux';
import VoteCounter from '../components/VoteCounter';
import CommentForm from '../components/CommentForm';
import scrollToComponent from 'react-scroll-to-component';
import { MdCreate, MdDelete } from 'react-icons/lib/md';

import './PostItem.css';
import './PostView.css';

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      isEditMode: false,
      commentSelected: null,
    };
    this.handlerSave = this.handlerSave.bind(this);
  }

  filterComments(comments, id) {
    //console.log(comments);
    if (comments !== undefined) {
      return comments.filter(comment => comment.id === id)[0];
    }
  }

  handlerSave() {
    //console.log('yo');
    this.setState({
      isEditMode: false,
    });
  }

  render() {
    const { comments, deleteComment } = this.props;

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

    return (
      <div className="c-post__coments">
        {comments && comments.length >= 1 ? (
          <div>
            <h4 className="c-post-section-comment__title">Comments:</h4>
            {comments.map(comment => (
              <div className="c-posts-list-item" key={comment.id}>
                <p>{comment.body}</p>

                <div className="c-post__meta">
                  <span className="c-post__info-box">
                    <p className="c-post__info">
                      Commented by:{' '}
                      <span className="c-post__author">{comment.author}</span>
                      <span className="c-post__time">
                        {` - on `}
                        <Moment unix>{comment.timestamp / 1000}</Moment>
                      </span>
                    </p>
                    <div className="c-post-actions c-comment-actions">
                      <a
                        href=""
                        onClick={eventComment => {
                          eventComment.preventDefault();
                          if (
                            window.confirm(
                              'Do you want to delete this comment?',
                            )
                          ) {
                            deleteComment(comment.id);
                          }
                        }}
                        className="c-post-actions__link c-post-actions__link--delete"
                      >
                        <MdDelete />
                        <span>Delete</span>
                      </a>
                      <a
                        href=""
                        onClick={eventComment => {
                          scrollToComponent(this.EditCommentBox, {
                            offset: 100,
                            align: 'bottom',
                            duration: 500,
                          });
                          this.setState({
                            isEditMode: true,
                            commentSelected: comment.id,
                          });
                          eventComment.preventDefault();
                        }}
                        className="c-post-actions__link c-post-actions__link--edit"
                      >
                        {' '}
                        <MdCreate />
                        <span>Edit</span>
                      </a>
                    </div>
                  </span>
                  <span className="c-post__counter">
                    <VoteCounter
                      typeSection={'comment'}
                      commentId={comment.id}
                      voteValue={comment.voteScore}
                    />
                  </span>
                </div>
              </div>
            ))}
            {this.state.isEditMode ? (
              <div>
                <CommentForm
                  ref={section => {
                    this.EditCommentBox = section;
                  }}
                  commentSelected={this.state.commentSelected}
                  isEditMode={this.state.isEditMode}
                  action={this.handlerSave}
                  initialValues={
                    this.state.isEditMode
                      ? this.filterComments(
                          comments,
                          this.state.commentSelected,
                        )
                      : {}
                  }
                />
              </div>
            ) : (
              <div>
                <CommentForm />
              </div>
            )}
          </div>
        ) : (
          <div>
            <span className="c-post__no-comments">No comments yet!</span>
            <CommentForm />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
