document.addEventListener('DOMContentLoaded', function () {

  function copyToClipboard() {

    let textArea = document.createElement('textarea');

    textArea.value = this.getAttribute('clipboardText');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this.classList.add('done');
  }

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