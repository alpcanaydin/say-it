/* eslint-disable class-methods-use-this */

class Speak {
  constructor(lang = 'tr') {
    if (!this.isSupported()) {
      return;
    }

    this.synth = window.speechSynthesis;

    this.synthesisUtterance = new window.SpeechSynthesisUtterance();
    this.synthesisUtterance.lang = lang;
  }

  isSupported() {
    return typeof window.SpeechSynthesisUtterance === 'function';
  }

  say(text, callback = () => {}) {
    this.synthesisUtterance.text = text;
    this.synthesisUtterance.onend = callback;
    this.synth.speak(this.synthesisUtterance);
  }
}

export default Speak;
