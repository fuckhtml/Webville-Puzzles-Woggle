'use strict';

const initWoggleGame = () => {
  
  const generateLetterBox = () => {
    const letterFrequency = {
      "a": 8,
      "b": 1,
      "c": 3,
      "d": 3,
      "e": 12,
      "f": 2,
      "g": 2, 
      "h": 6,
      "i": 7,
      "j": 1,
      "k": 1,
      "l": 4,
      "m": 2,
      "n": 6,
      "o": 8,
      "p": 2,
      "q": 6,
      "r": 6,
      "s": 8,
      "t": 3,
      "u": 2,
      "v": 2,
      "w": 1,
      "x": 1,
      "y": 2,
      "z": 1
    }
    const letterBoxLength = 16;
    let letterBox = '';

    let s = '';
    for (const letter in letterFrequency) {
      for (let i = 0; i < letterFrequency[letter]; i++) {
        s += letter;
      }
    }
    for (let i = 0; i < letterBoxLength; i++) {
      const l = s[Math.floor(Math.random() * s.length)];
      letterBox += l;
      s = s.replace(l, '');
    }

    return letterBox;
  }

  const renderLetterBox = (letterBox) => {
    const letterBoxNode = document.querySelector('#letterbox');
    for (let i = 0; i < letterBoxNode.children.length; i++) {
      letterBoxNode.children[i].classList.add(`l${letterBox[i]}`);
    }
  }

  const letterBoxOnClickHandler = (event) => {
    if (event.target.tagName === 'A' && !event.target.classList.contains('disabled')) {
      const l = event.target.className.match(/\bl.\b/)[0][1];
      document.querySelector('#currentWord').innerText += l;
      event.target.classList.add('disabled');
    }
  }



  // Main Game Logic

  renderLetterBox(generateLetterBox());
  document.querySelector('#letterbox').addEventListener('click', letterBoxOnClickHandler);

}

window.addEventListener('load', initWoggleGame);