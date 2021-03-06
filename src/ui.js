var history = []
var promptEvent = new Event('prompt_response')
var input

export function init() {
  input = document.querySelector('input')
  input.value = ''
  input.addEventListener('keyup', handleKeyUp)
  document.addEventListener('click', function() { focus('input') })
  focus('input')
}

export function clear() {
  history = []
}

// FIXME - remove this
export function prompt(text) {
  if (text) print(text)
  return new Promise(function (resolve) {
    input.addEventListener('prompt_response', function (e) {
      resolve(e.currentTarget.value)
    })
  })
}

export function listen(text, callback) {
  if (typeof text === 'string') print(text)
  if (typeof text === 'function') callback = text
  function respond(e) {
    callback(e.currentTarget.value)
    input.removeEventListener('prompt_response', respond)
  }
  input.addEventListener('prompt_response', respond)
}

export function print(text) {
  history.push(text)
  render()
}

function render() {
  const output = document.getElementById('output')
  output.innerHTML = ''
  history.forEach(function (text) {
    const line = document.createElement('div')
    line.innerHTML = text
    output.appendChild(line)
    output.scrollTop = output.scrollHeight
  })
}

function focus (selector) {
  const el = document.querySelector(selector)
  if (el) el.focus()
}

function handleKeyUp(e) {
  if (e.keyCode !== 13) {
    return
  }

  history.push('<br>> ' +  e.currentTarget.value + '<br><br>')
  input.dispatchEvent(promptEvent)
  e.currentTarget.value = ''
  render()
}
