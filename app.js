
function render(text) {
  const output = document.getElementById('output')
  const content = document.createElement('div')
  content.innerText = text
  output.appendChild(content)
}



render('Hello there.')
