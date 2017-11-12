import * as UI from '../ui'
import * as World from '../world'
import * as Commands from '../commands'

UI.init()

export default (function () {

  var bedroom = { title: 'Guest bedroom', coords: [0, 0], description: 'The room is empty, save for a heavily soiled mattress. The mattress is coated in a thick, still-wet layer of human excrement, with edge-to-edge coverage like they were buttering a piece of toast.'  }
  var masterBedroom = { title: 'Master bedroom', coords: [0, 1], description: 'A large king-size bed fills the entire room, there is no way to even walk around it.'  }
  var catRoom = { title: 'Cat room', coords: [0, 2], description: 'There is no furniture. The cat sitting in the center of the room looks menacingly at you.'  }
  var study = { title: 'Study', coords: [1, 0], description: 'You see an open laptop on a plain white Ikea desk. Covering the west wall is a large bookcase with many books. One of the books looks suspiciously like if you pulled on it a secret passage might open up. Under the desk, a grown woman attempts to hide but is given away by her giggling.'  }
  var living = { title: 'Living room', coords: [1, 1], description: 'The room is dominated by a large, flat-screen television which plays an animated gif of two doge where the one on the left licks the nose of the one on the right.'}
  var dining = { title: 'Dining room', coords: [1, 2], description: 'The table is set for four guests'}
  var foyer = { title: 'Foyer', coords: [2, 0], description: 'On the floor there is a pair of boots and a draft excluder with googly eyes.'  }
  var hallway = { title: 'Hallway', coords: [2, 1], description: 'A dimly-lit passage. On the wall hangs a painting of a cat, dressed in people clothes.'  }
  var kitchen = {title: 'Kitchen', coords: [2, 2], description: 'There are dishes strewn about everywhere.'}

  /*
    +----------------------------+
    | bedroom | master |   cat   |
    |---------+--------+---------|
    |  study  | living | dining  |
    |---------+--------+---------|
    |  foyer  | hallway| kitchen |
    +----------------------------+
  */
  var world = [
    [bedroom, masterBedroom, catRoom],
    [study, living, dining],
    [foyer, hallway, kitchen]
  ]

  var startingCell = foyer

  function start () {
    UI.print('## A HOUSE ##')

    function gameLoop (next) {
      if (next.coords) {
        UI.print('You are in the ' + next.title)
        UI.print('------------------------------------')
        UI.print(next.description)
        UI.print('<br>')
        World.possibleExitsMessage(world, next)
          .forEach(function (exit) {
            UI.print(exit + '<br>')
          })
      } else {
        UI.print(next)
      }
      UI.listen(function (response) {
        gameLoop(Commands.parse(response))
      })
    }

    gameLoop(startingCell)
  }

  return {
    start: start
  }
})()
