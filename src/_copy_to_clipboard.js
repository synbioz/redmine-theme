document.addEventListener('DOMContentLoaded', function () {

  var buttonStyles = `
    .cpButton {
      display:block!important;
      position:absolute!important;
      top:0!important;
      right: 0!important;
      padding:.4em .6em!important;
      margin:1em!important;

      font-size: .75em!important;
      text-decoration:none!important;
      text-transformation:uppercase!important;
      line-height: 1!important;
      color:white!important;

      background:rgba(0,0,0,0.1)!important;
      border-radius: 2em!important;
      opacity: 0!important;
      cursor:pointer!important;
      transition: 0.25s!important;
    }
    .cpButton:not(.done):before {
      content: 'COPIER'!important;
    }
    .cpButton.done:before {
      content: 'COPIÉ'!important;
    }
    .cpButton:hover {
      opacity: 1!important;
      color: #fff!important;
      background:rgba(0,0,0,0.8)!important;
    }
    .cpButton:active {
      background:rgba(0,0,0,0.5)!important;
    }
    pre {
      position:relative!important;
    }
    pre:hover .cpButton {
      opacity:1!important;
    }
  `;

  function copyToClipboard() {

    let textArea = document.createElement('textarea');

    textArea.value = this.getAttribute('clipboardText');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this.classList.add('done');
  }

  var style = document.createElement('style')
  style.appendChild(document.createTextNode(buttonStyles));
  style.type = 'text/css';
  document.head.appendChild(style);

  var cpButton = document.createElement('a');
  cpButton.classList.add('cpButton');

  var codeBlocks = document.querySelectorAll('pre');
  for (var i = 0; i < codeBlocks.length; i++) {
    var codeBlock = codeBlocks[i];

    var cln = cpButton.cloneNode(true);
    cln.setAttribute( 'clipboardText', codeBlock.innerText);
    cln.addEventListener('click', copyToClipboard)
    codeBlock.appendChild(cln);
  };

});