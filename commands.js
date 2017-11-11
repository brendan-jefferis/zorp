var inventory = [
  {name: 'lens', description: 'a mysterious lens', use: 'reveal-secret'},
  {name: 'binoculars', description: 'a well-used pair of binoculars with 4x zoom', use: 'view-distance'},
  {name: 'magnifying glass', description: 'a large magnifying glass', use: 'view-detail'}
]

var area = {
  title: 'dining room',
  coords: [1, 2],
  secret: 'a hidden door',
  description: 'the table is set for four guests',
  distance: 'distant mountains out the window',
  detail: 'you see hair fibres in the carpet',
  items: [{
    name: 'table',
    description: 'a solid wooden table. You can barely make out a tiny engraved message.',
    detail: 'the numbers 1 0 7 8 6',
    secret: 'a hidden chamber'
  }]
}

Commands = (function() {

  function look(a) {
    if (typeof a === 'function') {
      return 'You see ' +  a(area)
    } else if (!a) {
      return 'You are in the ' +  area.title + '<br>' + area.description
    }
    return a
  }

  function at(a) {
    // FIXME this is specific to look
    return a.description || a
  }

  function with_(a) {
    return a.use || a
  }

  function revealSecret(a) {
    return a.secret || a
  }

  function viewDistance(a) {
    return a.distance || a
  }

  function viewDetail(a) {
    return a.detail || a
  }

  var actions = {
    'look': look,
    'at': at,
    'with': with_,
    'reveal-secret': revealSecret,
    'view-distance': viewDistance,
    'view-detail': viewDetail
  }

  function parse(str) {
    var tokens = str.split(' ').reverse()
    return tokens.reduce(function (accum, val, i, arr) {
      // FIXME - handle more than 2 word items
      var item = lookupItem(val, inventory, area)
      if (!item) {
        item = lookupItem(arr[i+1] + ' ' + val, inventory, area)
        if (item) {
          delete arr[i+1]
        }
      }
      if (item) {
        if (actions.hasOwnProperty(accum)) {
          return actions[accum](item)
        }
        return item
      }

      if (actions.hasOwnProperty(val)) {
        if (actions.hasOwnProperty(accum)) {
          return actions[val](actions[accum])
        }
        return actions[val](accum)
      }

      return val
    }, '')
  }

  return {
    parse: parse
  }
})()

function lookupItem(name, inventory, area) {
  var item = find(name, inventory)
  if (!item) {
    item = find(name, area.items)
  }
  return item
}

function find(name, arr) {
  return arr.find(function (x) { return x.name === name})
}

var t = 'hit troll with sword'
var g = 'get lamp'
var m = 'go north'
var l = 'look'
var l2 = 'look at table'
var l3 = 'look with binoculars'
var l4 = 'look at table with lens'
var l5 = 'look at table with magnifying glass'

