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
    Array.from(letterBoxNode.children).map( function(tile, i) {
      if (/\bl[a-z]\b/.test(tile.className)) {
        tile.className = tile.className.replace(/\bl[a-z]\b/, `l${letterBox[i]}`)
      } else {
        tile.classList.add(`l${letterBox[i]}`);   
      }
    })
  }

  const letterBoxOnClickHandler = (event) => {
    if (event.target.tagName === 'A' && !event.target.classList.contains('disabled')) {
      const l = event.target.className.match(/\bl.\b/)[0][1];
      document.querySelector('#currentWord').innerText += l;
      event.target.classList.add('disabled');
    }
  }

  const submitOnClickHandler = () => {
    const currentWordNode = document.querySelector('#currentWord');
    const currentWord = currentWordNode.innerText;

    // Send our typed word to get the points —
    // We Send Syncronious Request
    // We can't use browswer window until we get request.readyState = 4
    let request = new XMLHttpRequest();
    request.open('GET', `get-word-points.php?word=${currentWord}`, false);
    request.send(null);

    if (parseInt(request.responseText) > 0) {
      // update score
      userScore += parseInt(request.responseText);
      document.querySelector('#score').innerText = document.querySelector('#score').innerText.replace(/\d{1,}/, userScore);

      // Generate and Render LetterBox
      renderLetterBox(generateLetterBox());
  
      // add typed word into the wordList
      let wordNode = document.createElement('p');
      wordNode.innerText = currentWord;
      document.querySelector('#wordList').append(wordNode);
    }

    // clean currenWordNode
    currentWordNode.innerText = '';

    // enable tiles
    const letterBoxNode = document.querySelector('#letterbox');
    Array.from(letterBoxNode.children).map(tile => tile.classList.remove('disabled'));
  }

  // Main Game Logic

  // setup the game
  let userScore = 0;
  renderLetterBox(generateLetterBox());
  document.querySelector('#letterbox').addEventListener('click', letterBoxOnClickHandler);
  document.querySelector('#submit > a').addEventListener('click', submitOnClickHandler);    

  // start the game
  const introMessage = 'Your goal is to collect existing words from letters bellow. Click a button below to start the game.';
  alert(introMessage);

  // finish the game
  setTimeout(function() {
    alert(`You've got ${userScore} points. Congratulations!`);
    window.location.reload();
  }, 60 * 1000)
}

window.addEventListener('load', initWoggleGame);