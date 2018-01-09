import React, { Component } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/lib/md';
import './VoteCounter.css';

class VoteCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
    };
  }

  IncrementVote = () => {
    this.setState({ votes: this.state.votes + 1 });
  };
  DecreaseVote = () => {
    this.setState({ votes: this.state.votes - 1 });
  };

  render() {
    const { votes } = this.state;

    const valueStyle = () => {
      const valueName =
        votes < 0
          ? 'c-vote-counter-value--negative'
          : 'c-vote-counter-value--positive';
      return valueName;
    };

    return (
      <div className="c-vote-counter">
        <button className="c-vote-counter-button" onClick={this.IncrementVote}>
          <MdKeyboardArrowUp />
        </button>
        <h2 className={valueStyle()}>{votes}</h2>
        <button className="c-vote-counter-button" onClick={this.DecreaseVote}>
          <MdKeyboardArrowDown />
        </button>
      </div>
    );
  }
}

export default VoteCounter;
