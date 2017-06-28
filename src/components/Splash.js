import React, { Component } from 'react';

import Recognition from '../service/Recognition';
import Speak from '../service/Speak';

import Game from './Game';
import PermissionDenied from './PermissionDenied';
import Unsupported from './Unsupported';

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'ar-EG',
      gameStarted: false,
      permission: true,
      unsupported: false,
    };
    this.handleGameStart = this.handleGameStart.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  handleGameStart() {
    const { language } = this.state;

    this.recognition = new Recognition(language);
    this.speak = new Speak(language);

    if (!this.speak.isSupported() || !this.recognition.isSupported()) {
      this.setState({ unsupported: true });
      return;
    }

    this.recognition
      .askPermission()
      .then(() => this.setState({ gameStarted: true }))
      .catch(() => this.setState({ permission: false }));
  }

  render() {
    const { gameStarted, unsupported, permission, language } = this.state;

    if (unsupported) {
      return <Unsupported />;
    }

    if (!permission) {
      return <PermissionDenied />;
    }

    if (gameStarted) {
      return <Game language={language} speak={this.speak} recognition={this.recognition} />;
    }

    return (
      <div>
        <h1 className="gap-bottom">Say it!</h1>
        <p className="gap-bottom">
          Say it is a game that checks if you can speak<br />
          in a language that you do not know.
        </p>
        <p className="gap-bottom-large">
          Listen the sentence and try to say it!
        </p>

        <div className="gap-bottom-large">
          <select className="select" onChange={this.handleLanguageChange}>
            <option value="ar-EG">Arabic</option>
            <option value="nl-NL">Dutch</option>
            <option value="fr-FR">French</option>
            <option value="hi-IN">Hindi</option>
            <option value="de-DE">German</option>
            <option value="el-GR">Greek</option>
            <option value="nb-NO">Norwegian</option>
            <option value="pl-PL">Polish</option>
            <option value="ru-RU">Russian</option>
            <option value="ca-ES">Spanish</option>
            <option value="tr-TR">Turkish</option>
          </select>
        </div>

        <button className="button" onClick={this.handleGameStart}>
          Start Playing
        </button>
      </div>
    );
  }
}

export default Splash;
