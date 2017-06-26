import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sentences from '../data/sentences.json';

import Level from './Level';
import GameFinished from './GameFinished';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      score: 0,
      gameFinished: false,
    };

    this.updateScore = this.updateScore.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.getNextLevel = this.getNextLevel.bind(this);
  }

  getChildContext() {
    return {
      updateScore: this.updateScore,
      getTotalScore: this.getTotalScore,
      getNextLevel: this.getNextLevel,
    };
  }

  getLevelSentence() {
    return sentences[this.props.language][`level${this.state.level}`];
  }

  getLevelEnSentence() {
    return sentences['en-US'][`level${this.state.level}`];
  }

  getNextLevel(level) {
    if (level === 6) {
      this.setState({ gameFinished: true });
      return;
    }

    this.setState({ level: level + 1 });
  }

  getTotalScore() {
    return this.state.score;
  }

  updateScore(score) {
    this.setState({ score: this.state.score + score });
  }

  render() {
    const { speak, recognition } = this.props;
    const { level, gameFinished, score } = this.state;
    const sentence = this.getLevelSentence();
    const enSentence = this.getLevelEnSentence();

    if (gameFinished) {
      return <GameFinished score={score} />;
    }

    return (
      <Level
        speak={speak}
        recognition={recognition}
        level={level}
        sentence={sentence}
        enSentence={enSentence}
      />
    );
  }
}

Game.childContextTypes = {
  updateScore: PropTypes.func,
  getTotalScore: PropTypes.func,
  getNextLevel: PropTypes.func,
};

Game.propTypes = {
  language: PropTypes.string.isRequired,
  speak: PropTypes.object.isRequired,
  recognition: PropTypes.object.isRequired,
};

export default Game;
