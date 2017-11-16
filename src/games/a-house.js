import * as UI from '../ui'
import * as World from '../world'
import * as Commands from '../commands'

UI.init()

export default (function () {

  const boots = { name: 'boots', description: 'a pair of well-worn leather boots' }
  const draftExcluder = { name: 'draft excluder', description: 'a denim-covered draft excluder. someone has glued googly eyes to it to make it look like a snake' }
  const table = { name: 'table', description: 'a solid wooden table'}
  const laptop = { name: 'laptop', description: 'the screen shows a login prompt' }
  const ikeaDesk = { name: 'desk', description: 'a plain white desk from Ikea. there are two drawers, one on the left and one on the right' }
  const leftDrawer = { name: 'left drawer', description: 'you see a scrap of paper' }
  const rightDrawer = { name: 'right drawer', description: 'you see a magnifying glass' }
  const mattress = { name: 'mattress', description: 'the mattress is coated in a thick, still-wet layer of human excrement, with edge-to-edge coverage like they were buttering a piece of toast'}

  const bedroom = { title: 'the guest bedroom', coords: [0, 0], items: [mattress], description: 'The room is empty, save for a heavily soiled mattress.'  }
  const masterBedroom = { title: 'the master bedroom', coords: [0, 1], items: [],  description: 'A large king-size bed fills the entire room, there is no way to even walk around it.'  }
  const catRoom = { title: 'the cat room', coords: [0, 2], items: [],  description: 'There is no furniture. The cat sitting in the center of the room looks menacingly at you.'  }
  const study = { title: 'the study', coords: [1, 0], items: [laptop, ikeaDesk, leftDrawer, rightDrawer],  description: 'You see an open laptop on a plain white Ikea desk. Covering the west wall is a large bookcase with many books. '  }
  const living = { title: 'the living room', coords: [1, 1], items: [],  description: 'The room is dominated by a large, flat-screen television which plays an animated gif of two doge where the one on the left licks the nose of the one on the right.'}
  const dining = { title: 'the dining room', coords: [1, 2], items: [table], description: 'The table is set for four guests'}
  const foyer = { title: 'the foyer', coords: [2, 0], items: [boots, draftExcluder], description: 'On the floor there is a pair of boots and a draft excluder'  }
  const hallway = { title: 'the hallway', coords: [2, 1], items: [], description: 'A dimly-lit passage. On the wall hangs a painting of a cat, dressed in people clothes'  }
  const kitchen = {title: 'the kitchen', coords: [2, 2], items: [], description: 'There are dishes strewn about everywhere.'}

  /*
    +----------------------------+
    | bedroom | master |   cat   |
    |---------+--------+---------|
    |  study  | living | dining  |
    |---------+--------+---------|
    |  foyer  | hallway| kitchen |
    +----------------------------+
  */
  const world = [
    [bedroom, masterBedroom, catRoom],
    [study, living, dining],
    [foyer, hallway, kitchen]
  ]
  const initialState = {
    area: foyer,
    world: world,
    inventory: [],
    message: ''
  }

  function start () {
    let currentArea

    UI.print('## A HOUSE ##')

    function gameLoop (state) {
      if (state.area !== currentArea) {
        currentArea = state.area
        UI.print('You are in ' + state.area.title)
        UI.print('------------------------------------')
        UI.print(state.area.description)
        UI.print('<br>')
        World.possibleExitsMessage(world, state.area)
          .forEach(function (exit) {
            UI.print(exit + '<br>')
          })
      } else if (state.message !== '') {
        UI.print(state.message)
      }
      UI.listen(function (response) {
        gameLoop(Commands.parse(response, state))
      })
    }

    gameLoop(initialState)
  }

  return {
    start: start
  }
})()
