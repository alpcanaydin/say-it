import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameFinished extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRestart = this.handleRestart.bind(this);
    this.handleFacebookShare = this.handleFacebookShare.bind(this);
    this.handleTwitterShare = this.handleTwitterShare.bind(this);
  }

  handleRestart() {
    window.location.reload();
  }

  handleFacebookShare() {
    const { score } = this.props;

    window.FB.ui({
      method: 'share',
      href: 'https://alpcanaydin.github.io/say-it',
      quote: `My score: ${score}. Try yourself with a language that you don't know!`,
    });
  }

  handleTwitterShare() {
    const { score } = this.props;

    const url = `https://twitter.com/share?url=${window.location
      .href}&hashtags=sayit&text=I just got ${score} points in Say it.`;

    const width = 550;
    const height = 400;

    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const left = (windowWidth - width) / 2;
    const top = (windowHeight - height) / 2;

    const popupOptions = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, 'twitter', popupOptions);
  }

  render() {
    const { score } = this.props;

    return (
      <div>
        <h1 className="gap-bottom-large">Game Finished!</h1>
        <p>Your score</p>
        <h1 className="gap-bottom-large">{score}</h1>
        <div className="gap-bottom-large">
          <button className="button" onClick={this.handleRestart}>
            Play Again
          </button>
        </div>
        <br />
        <p className="gap-bottom">Share Your Score</p>
        <div className="buttonGroup gap-bottom-large">
          <button className="button facebook" onClick={this.handleFacebookShare}>
            Facebook
          </button>
          {' '}
          <button className="button twitter" onClick={this.handleTwitterShare}>
            Twitter
          </button>
        </div>
      </div>
    );
  }
}

GameFinished.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameFinished;
