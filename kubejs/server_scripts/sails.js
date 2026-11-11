ServerEvents.tags('item', event => {
  event.add('kubejs:sail_cloth', ['#minecraft:wool', 'farmersdelight:canvas'])
})

ServerEvents.recipes(event => {
  event.replaceInput({ id: 'create:crafting/kinetics/white_sail' }, '#minecraft:wool', '#kubejs:sail_cloth')
})
