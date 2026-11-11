ServerEvents.recipes(event => {
  event.remove({ id: 'create:splashing/gravel' })
  event.remove({ id: 'create:splashing/red_sand' })
  event.remove({ id: 'create:splashing/soul_sand' })

  event.custom({
    type: 'create:splashing',
    ingredients: [{ item: 'minecraft:gravel' }],
    results: [{ id: 'minecraft:flint', chance: 0.25 }]
  }).id('kubejs:splashing/gravel')

  event.custom({
    type: 'create:splashing',
    ingredients: [{ item: 'minecraft:red_sand' }],
    results: [{ id: 'minecraft:dead_bush', chance: 0.05 }]
  }).id('kubejs:splashing/red_sand')

  event.custom({
    type: 'create:splashing',
    ingredients: [{ item: 'minecraft:soul_sand' }],
    results: [{ id: 'minecraft:quartz', count: 4, chance: 0.125 }]
  }).id('kubejs:splashing/soul_sand')
})
