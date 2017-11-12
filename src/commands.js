var inventory = [
  {name: 'lens', description: 'a magical lens that reveals secrets', fn: 'reveal-secret'},
  {name: 'binoculars', description: 'a well-used pair of binoculars with 4x zoom', fn: 'view-distance'},
  {name: 'magnifying glass', description: 'a large magnifying glass', fn: 'view-detail'},
  {name: 'sword', description: 'a steel short sword', fn: 'attack', damage: 2}
]

var area = {
  title: 'dining room',
  coords: [1, 2],
  secret: 'a hidden door',
  description: 'the table is set for four guests',
  distance: 'distant mountains out the window',
  detail: 'you see hair fibres in the carpet',
  actors: [
    {
      name: 'troll',
      description: 'a regular old troll',
      detail: '',
      secret: '',
      health: 6
    }
  ],
  items: [
    {
      name: 'table',
      description: 'a solid wooden table. You can barely make out a tiny engraved message.',
      detail: 'the numbers 1 0 7 8 6',
      secret: 'a hidden chamber'
    }
  ]
}

var DEFAULT_TARGET = area

var tempEquipped
var target

function look() {
  if (!target) {
    return 'You are in ' + DEFAULT_TARGET.title + '<br>' + DEFAULT_TARGET.description
  }
  if (tempEquipped) {
    return actions[tempEquipped.fn](target)
  }
  return target.description
}

function tempEquipItem(a) {
  tempEquipped = a
  return a
}

function setTarget(a) {
  target = a
  return a
}

function revealSecret(a) {
  return a.secret ? a.secret : 'Nothing is revealed'
}

function viewDistance(a) {
  return a.distance ? a.distance : 'You don\'t see anything'
}

function viewDetail(a) {
  return a.detail ? a.detail : 'You don\'t see anything of interest'
}

function hit(target, item) {
  if (!target) {
    return 'need a target to hit'
  }
  if (!item) {
    return 'Need something to hit ' + target.name + ' with'
  }
  return 'You hit ' + target.name + ' with ' + item.name
}

var actions = {
  'look': look,
  'with': tempEquipItem,
  'at': setTarget,
  'reveal-secret': revealSecret,
  'view-distance': viewDistance,
  'view-detail': viewDetail,
  'hit': hit
}

export function parse(str) {
  tempEquipped = null
  target = DEFAULT_TARGET
  var tokens = str.split(' ')
  var command = tokens.shift()
  if (!actions.hasOwnProperty(command)) {
    return command + ' is not a valid instruction'
  }
  var args = tokens.reduce(function(accum, token, i, arr) {
    var item = lookup(token, area, inventory)
    if (!item) {
      item = lookup(token + ' ' + arr[i+1], area, inventory)
    }
    if (typeof last(accum) === 'function') {
      accum.pop()(item)
      return accum
    }

    if (!item) {
      if (actions.hasOwnProperty(token)) {
        return accum.concat([actions[token]])
      }
    }
    return item ? accum.concat([item]) : accum
  }, [])
  return actions[command].apply(this, args)
}


function lookup(name, area, inventory) {
  inventory = inventory || []
  var item = find(name, inventory)
  if (!item) {
    item = find(name, area.items)
  }
  if (!item) {
    item = find(name, area.actors)
  }
  return item
}

function find(name, arr) {
  return arr.find(function (x) { return x.name === name})
}

function last(arr) {
  return arr[arr.length-1]
}

var t = 'hit troll with sword'
var g = 'get lamp'
var m = 'go north'
var l = 'look'
var l2 = 'look at table'
var l3 = 'look with binoculars'
var l4 = 'look at table with lens'
var l5 = 'look at table with magnifying glass'

