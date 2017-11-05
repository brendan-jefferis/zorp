
function render(text) {
  const output = document.getElementById('output')
  const content = document.createElement('div')
  content.innerText = text
  output.appendChild(content)
}

function focus (selector) {
  const el = document.querySelector(selector)
  if (el) el.focus()
}

render('Hello there.')
focus('input')

document.addEventListener('click', function() { focus('input') })
