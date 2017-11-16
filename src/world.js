function cellByDirection (world, direction, cell) {
  const bounds = [world.length - 1, world[0].length - 1]
  const coords = cell.coords
  switch (direction) {
    case 'north':
      return world[coords[0] > 0 ? coords[0] - 1 : 0][coords[1]]

    case 'south':
      return world[coords[0] < bounds[0] ? coords[0] + 1 : bounds[0]][coords[1]]

    case 'east':
      return world[coords[0]][coords[1] < bounds[1] ? coords[1] + 1 : bounds[1]]

    case 'west':
      return world[coords[0]][coords[1] > 0 ? coords[1] - 1 : 0]

    default:
      return cell
  }
}

function exits(world, cell) {
  const northCell = cellByDirection(world, 'north', cell)
  const southCell = cellByDirection(world, 'south', cell)
  const eastCell = cellByDirection(world, 'east', cell)
  const westCell = cellByDirection(world, 'west', cell)
  return {
    north: northCell !== cell ? northCell.title : '',
    south: southCell !== cell ? southCell.title : '',
    east: eastCell !== cell ? eastCell.title : '',
    west: westCell !== cell ? westCell.title : ''
  }
}

export function possibleExitsMessage(world, currentCell) {
  const possibleExits = exits(world, currentCell)
  return Object
    .entries(possibleExits)
    .filter(function(x) { return x[1] !== ''})
    .map(function (x) { return 'To the ' + x[0] + ' is the ' + x[1]})
}

export function move(world, direction, cell) {
  return cellByDirection(world, direction, cell)
}
