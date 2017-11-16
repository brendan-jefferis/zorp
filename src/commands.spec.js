import test from 'ava'
import { parse } from './commands'

var g = 'get lamp'
var m = 'go north'

const inventory = [
  {name: 'lens', description: 'a magical lens that reveals secrets', fn: 'reveal-secret'},
  {name: 'binoculars', description: 'a well-used pair of binoculars with 4x zoom', fn: 'view-distance'},
  {name: 'magnifying glass', description: 'a large magnifying glass', fn: 'view-detail'},
  {name: 'sword', description: 'a steel short sword', fn: 'attack'}
]

const areaOne = {
  title: 'the dining room',
  coords: [0, 0],
  secret: 'a hidden door',
  description: 'the table is set for four guests',
  distance: 'distant mountains out the window',
  detail: 'you see hair fibres in the carpet',
  actors: [
    {
      name: 'troll',
      description: 'a regular old troll'
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

const areaTwo = { title: 'the living room', coords: [0, 1], description: 'a living room' }

const state = {
  area: areaOne,
  world: [[areaOne], [areaTwo]],
  inventory: inventory,
  message: ''
}

test('look : should describe current area by default', t => {
  const result = parse('look', state)
  t.is(result.message, 'You are in the dining room<br>the table is set for four guests')
})

test('look : should be able to look at item in area', t => {
  const result = parse('look at table', state)
  t.is(result.message, 'a solid wooden table. You can barely make out a tiny engraved message.')
})

test('look : should be able to look at item in inventory', t => {
  const result = parse('look at binoculars', state)
  t.is(result.message, 'a well-used pair of binoculars with 4x zoom')
})

test('look : should handle unknown target', t => {
  const result = parse('look at stick', state)
    t.is(result.message, 'you can\'t see that')
})

test('look : should be able to look with item', t => {
  const result = parse('look with binoculars', state)
  t.is(result.message, 'distant mountains out the window')
})

test('look : with item (two-word item name)', t => {
  const result = parse('look with magnifying glass', state)
  t.is(result.message, 'you see hair fibres in the carpet')
})

test('look : at item with item', t => {
  const result = parse('look at table with lens', state)
  t.is(result.message, 'a hidden chamber')
})

test('look : at item with item (two-word item name)', t => {
  const result = parse('look at table with magnifying glass', state)
  t.is(result.message, 'the numbers 1 0 7 8 6')
})

test('hit :  should require a target', t => {
  const result = parse('hit', state)
  t.is(result.message, 'need a target to hit')
})

test('hit : should prompt to specify an item', t => {
  const target = 'troll'
  const result = parse(`hit ${target}`, state)
  t.is(result.message, `Need something to hit ${target} with`)
})

test('hit : should be able to hit target with item', t => {
  const target = 'troll'
  const item = 'sword'
  const result = parse(`hit ${target} with ${item}`, state)
  t.is(result.message, `You hit ${target} with ${item}`)
})

test('go : should prompt for direction', t => {
  const result = parse('go', state)
  t.is(result.message, 'what direction do you want to go in?')
})

test('go : should return message if attempt to move out of bounds', t => {
  const direction = 'north'
  const result = parse(`go ${direction}`, state)
  t.is(result.message, `you cannot go ${direction}`)
})

test('go : should return new area if direction provided', t => {
  const result = parse('go south', state)
  t.is(result.area.title, 'the living room')
})
