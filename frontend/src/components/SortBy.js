import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPostsBy } from '../store/posts/actions';

const options = [
  { name: 'Score: Highest to lowest', value: 'desc-voteScore' },
  { name: 'Score: Lowest to highest', value: 'asce-voteScore' },
  { name: 'Date: newest to oldest', value: 'desc-timestamp' },
  { name: 'Date: oldest to newest', value: 'asce-timestamp' },
];

class SortBy extends Component {
  render() {
    const { sortPostsBy, postsSortedBy } = this.props;
    return (
      <div className="c-sort-by_box">
        <span>Sort by</span>
        <div className="c-sort-by-input">
          <select
            value={postsSortedBy.value}
            onChange={e => {
              sortPostsBy(e.target.value);
            }}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  postsSortedBy: state.posts.sortBy,
});
const mapDispatchToProps = dispatch => ({
  sortPostsBy: data => dispatch(sortPostsBy(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
