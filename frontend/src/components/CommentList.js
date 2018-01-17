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
      showForm: false,
      commentContentToEdit: {},
    };
    this.hideForm = this.hideForm.bind(this);
  }

  filterComments(comments, id) {
    //console.log(comments);
    if (comments !== undefined) {
      return comments.filter(comment => comment.id === id)[0];
    }
  }

  displayForm(comment) {
    this.setState({ showForm: true, commentContentToEdit: comment });
  }

  hideForm() {
    this.setState({
      showForm: false,
      commentContentToEdit: {},
      isEditMode: false,
    });
  }

  render() {
    const { comments, deleteComment, postId } = this.props;
    const { isEditMode, showForm, commentContentToEdit } = this.state;

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

    return (
      <div className="c-post__coments">
        {comments && comments.length >= 1 ? (
          <div>
            <h4 className="c-post-section-comment__title">Comments:</h4>

            {showForm ? (
              <div>
                {isEditMode ? (
                  <div>
                    <CommentForm
                      ref={section => {
                        this.EditCommentBox = section;
                      }}
                      isEditMode={isEditMode}
                      hideForm={this.hideForm}
                      idToEdit={commentContentToEdit && commentContentToEdit.id}
                      initialValues={
                        isEditMode
                          ? this.filterComments(
                              comments,
                              commentContentToEdit.id,
                            )
                          : {}
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <CommentForm
                      postId={postId}
                      hideForm={this.hideForm}
                      initialValue={commentContentToEdit}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>
                <a
                  href=""
                  onClick={eventComment => {
                    eventComment.preventDefault();
                    this.displayForm();
                  }}
                  className="c-post-actions__link c-post-actions__link--create"
                >
                  Create a new comment
                </a>
              </p>
            )}

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
                      {!isEditMode && (
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
                            });
                            this.displayForm(comment);
                            eventComment.preventDefault();
                          }}
                          className="c-post-actions__link c-post-actions__link--edit"
                        >
                          {' '}
                          <MdCreate />
                          <span>Edit</span>
                        </a>
                      )}
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
          </div>
        ) : (
          <div>
            <span className="c-post__no-comments">No comments yet!</span>
            <CommentForm
              hideForm={this.hideForm}
              postId={postId}
              initialValue={commentContentToEdit}
            />
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
