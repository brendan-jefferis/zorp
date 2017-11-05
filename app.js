
let history = []

function render() {
  const output = document.getElementById('output')
  output.innerHTML = ''
  history.forEach(function (text) {
  	const line = document.createElement('div')
  	line.innerText = text
  	output.appendChild(line)
  })
}

function focus (selector) {
  const el = document.querySelector(selector)
  if (el) el.focus()
}

history.push('Hello there.')
render()
focus('input')

document.addEventListener('click', function() { focus('input') })

function handleKeyUp(e) {
	if (e.keyCode !== 13) return

	history.push(e.currentTarget.value)
	e.currentTarget.value = ''
	render()
}

const input = document.querySelector('input')
input.value = ''
input.addEventListener('keyup', handleKeyUp)