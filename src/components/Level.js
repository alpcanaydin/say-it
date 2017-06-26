import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import stringSimilarity from 'string-similarity';

class Level extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speaking: false,
      heardSentence: '',
      score: 0,
    };

    this.calculateScore = this.calculateScore.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleSay = this.handleSay.bind(this);
    this.handleNextLevel = this.handleNextLevel.bind(this);
  }

  compontentWillMount() {
    this.props.recognition.abort();
  }

  calculateScore(realSentence, heardSentence) {
    const score = stringSimilarity.compareTwoStrings(realSentence, heardSentence);

    return Math.round(score * 100);
  }

  handleListen() {
    this.props.speak.say(this.props.sentence);
  }

  handleSay() {
    this.setState({ speaking: true });

    this.props.recognition.on('result', result => {
      const word = result.results[0][0].transcript.toLocaleLowerCase();
      const score = this.calculateScore(this.props.sentence, word);

      this.setState({
        heardSentence: word,
        score,
      });
      this.context.updateScore(score);
    });

    this.props.recognition.on('speechstart', () => {
      this.setState({ speaking: true });
    });

    this.props.recognition.on('speechend', () => {
      this.setState({ speaking: false });
    });

    this.props.recognition.on('error', () => {
      this.props.recognition.abort();
      this.setState({
        speaking: false,
        heardSentence: '',
        score: 0,
      });
    });

    this.props.recognition.on('nomatch', () => {
      this.props.recognition.abort();
      this.setState({
        speaking: false,
        heardSentence: '',
        score: 0,
      });
    });

    this.props.recognition.start();
  }

  handleNextLevel() {
    this.setState(
      {
        speaking: false,
        heardSentence: '',
        score: 0,
      },
      () => {
        this.context.getNextLevel(this.props.level);
      },
    );
  }

  render() {
    const { level, sentence, enSentence } = this.props;
    const { speaking, score, heardSentence } = this.state;

    if (heardSentence) {
      return (
        <div>
          <h3 className="gap-bottom-large">Level {level}</h3>
          <h1>{sentence}</h1>
          <h3 className="gap-bottom-large">You said: {heardSentence}</h3>

          <h3>Level Score / Total Score</h3>
          <h1 style={{ marginTop: '5px' }}>{score} / {this.context.getTotalScore()}</h1>

          <button className="button" onClick={this.handleNextLevel}>
            Next Level
          </button>
        </div>
      );
    }

    return (
      <div>
        <h3 className="gap-bottom-large">Level {level}</h3>
        <h1>{sentence}</h1>
        <h3>{enSentence}</h3>

        <div className="buttonGroup">
          <button className={cx('button', { disabled: speaking })} onClick={this.handleListen}>
            Listen
          </button>
          {' '}
          <button className={cx('button', { disabled: speaking })} onClick={this.handleSay}>
            Say it!
          </button>
        </div>
      </div>
    );
  }
}

Level.propTypes = {
  speak: PropTypes.object.isRequired,
  recognition: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  sentence: PropTypes.string.isRequired,
  enSentence: PropTypes.string.isRequired,
};

Level.contextTypes = {
  updateScore: PropTypes.func.isRequired,
  getTotalScore: PropTypes.func.isRequired,
  getNextLevel: PropTypes.func.isRequired,
};

export default Level;
