
UI = (function() {
  var history = []
  var promptEvent = new Event('prompt_response')
  var input

  function init() {
    input = document.querySelector('input')
    input.value = ''
    input.addEventListener('keyup', handleKeyUp)
    document.addEventListener('click', function() { focus('input') })
    focus('input')
  }

  function clear() {
    history = []
  }

  function prompt(text) {
    print(text)
    return new Promise(function (resolve) {
      input.addEventListener('prompt_response', function (e) {resolve(e.currentTarget.value)})
    })
  }

  function print(text) {
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

    history.push('<br>>' +  e.currentTarget.value + '<br><br>')
    input.dispatchEvent(promptEvent)
    e.currentTarget.value = ''
    render()
  }
  
  return {
    init: init,
    clear: clear,
    prompt: prompt,
    print: print
  }
})()
