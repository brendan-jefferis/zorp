World = (function() {
  function cellByDirection (world, direction, cell) {
    var bounds = [world.length - 1, world[0].length - 1]
    var coords = cell.coords
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
    var northCell = cellByDirection(world, 'north', cell)
    var southCell = cellByDirection(world, 'south', cell)
    var eastCell = cellByDirection(world, 'east', cell)
    var westCell = cellByDirection(world, 'west', cell)
    return {
      north: northCell !== cell ? northCell.title : '',
      south: southCell !== cell ? southCell.title : '',
      east: eastCell !== cell ? eastCell.title : '',
      west: westCell !== cell ? westCell.title : ''
    }
  }

  function possibleExitsMessage(world, currentCell) {
    var possibleExits = exits(world, currentCell)
    return Object
      .entries(possibleExits)
      .filter(function(x) { return x[1] !== ''})
      .map(function (x) { return 'To the ' + x[0] + ' is the ' + x[1]})
  }

  function move(world, direction, cell) {
    return cellByDirection(world, direction, cell)
  }

  return {
    possibleExitsMessage: possibleExitsMessage,
    move: move
  }
})()
