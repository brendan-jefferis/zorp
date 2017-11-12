Atlantis = (function() {
  function printTitle() {
    UI.print("================ THE LOST CITY OF ===============")
    UI.print("&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;.__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;.__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
    UI.print("&nbsp;&nbsp;/&nbsp;&nbsp;_&nbsp;&nbsp;\\_/&nbsp;&nbsp;|_|&nbsp;&nbsp;| _____&nbsp;&nbsp;&nbsp;&nbsp;_____/&nbsp;&nbsp;|_|__| ______")
    UI.print("&nbsp;/&nbsp;&nbsp;/_\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;__\\&nbsp;&nbsp;| \\_&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;__\\&nbsp;&nbsp;|/&nbsp;&nbsp;___/")
    UI.print("/&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;| |&nbsp;&nbsp;|__/ __ \\|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;\\&nbsp;&nbsp;| |&nbsp;&nbsp;|\\___ \\ ")
    UI.print("\\____|____/__| |____(______/___|__/__| |__/____&nbsp;/")
    UI.print("&nbsp;")
    UI.print("Copyright &copy; Jefferis 2017 all rights reserved")
    UI.print("=================================================")
    UI.print("&nbsp;")
  }

  function start() {
    printTitle()

    // You UI functions are:
    // print - print a message but don't wait for response
    // clear - erase input history (clears screen)
    // prompt - print a message to output and handle the eventual response (using .then())

    UI.prompt('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PRESS ENTER TO BEGIN')
      .then(function(response) {
        UI.clear()
        return UI.prompt('Once upon a time some things happened. As you are walking along the beach you spot something shiny in the sand. Would you like to take a closer look?')
      })
      .then(function (response) {
        if (response.toLowerCase() === 'yes'){
          return UI.prompt('Congratulations, you just discovered Atlantis. That was easier than anticipated. Would you like to list your new discovery on Trademe?')
        } else {
          return UI.print('Yawn, you lead a boring life. You might as well go back to sleep. -- GAME OVER --') 
        }
      })
      .then(function (response) {
        if (response.toLowerCase() === 'yes'){
          return UI.prompt('How much do you think she\'s worth?')
        } else {
          return UI.print('Fair enough. Enjoy your new home.  --- GAME OVER ---') 
        }
      })
      .then(function(response) {
        
        function getAmount(res) {
          var amount = parseInt(res, 10)
          if (amount < 6000) {
            UI.prompt('C\'mon bro it\'s the lost city of Atlantis, not a used Holden. Try again . . .')
              .then(getAmount)
          } else if (amount > 150000) {
            UI.prompt('Mate, you\'re dreamin! Try again . . .')
              .then(getAmount)
          } else {
            return UI.print('Good work. Your auction was successful. You drive to Mosgiel to collect your $' + amount + '. Unfortunately, it appears the programmer has fallen asleep. Looks like you\'re stuck in Mosgiel until he wakes up . . .')
          }
        }

        getAmount(response)
      })
  }

  return {
    start: start
  }
})()
