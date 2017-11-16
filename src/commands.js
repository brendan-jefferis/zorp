import { move } from './world'

let tempEquipped
let target
let world

const actions = {
  'look': look,
  'with': tempEquipItem,
  'at': setTarget,
  'reveal-secret': revealSecret,
  'view-distance': viewDistance,
  'view-detail': viewDetail,
  'hit': hit,
  'go': go
}

function look() {
  if (!target) {
    return { message: 'you can\'t see that' }
  }
  if (target.coords && !tempEquipped) {
    return { message: `You are in ${target.title}<br>${target.description}` }
  }
  if (tempEquipped) {
    return { message: actions[tempEquipped.fn](target) }
  }
  return { message: target.description }
}

function go(direction) {
  if (!direction) {
    return { message: 'what direction do you want to go in?' }
  }
  const newArea = move(world, direction, target)
  return newArea === target
    ? { message: `you cannot go ${direction}` }
    : { area: newArea }
}

function hit(target) {
  if (!target) {
    return { message: 'need a target to hit' }
  }
  if (!tempEquipped) {
    return { message: `Need something to hit ${target.name} with` }
  }
  return { message: `You hit ${target.name} with ${tempEquipped.name}` }
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

export function parse(str, state) {
  tempEquipped = null
  target = state.area
  world = state.world
  const tokens = str.split(' ')
  const command = tokens.shift()
  if (!actions.hasOwnProperty(command)) {
    return `${command} is not a valid instruction`
  }
  const args = tokens.reduce(function (accum, token, i, arr) {
    let item = lookup(token, state.area, state.inventory)
    if (!item) {
      item = lookup(`${token} ${arr[i + 1]}`, state.area, state.inventory)
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
  return Object.assign(state, actions[command].apply(this, args.concat(tokens)))
}

function lookup(name, area, inventory) {
  inventory = inventory || []
  if (!area.items) return null
  let item = find(name, inventory)
  if (!item) {
    item = find(name, area.items)
  }
  if (!item && !area.actors) return null
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
