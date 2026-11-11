ServerEvents.recipes(event => {
  event.replaceInput({ id: 'create_things_and_misc:sprinklerheadcraft' }, 'minecraft:dried_kelp', 'kubejs:rubber')

  event.remove({ id: 'create_things_and_misc:diluted_bonemeal_craft' })
  event.recipes.create.mixing(Fluid.of('create_things_and_misc:diluted_bonemeal', 1000), [
    'hearthandharvest:fertilizer_bag',
    Fluid.of('minecraft:water', 1000)
  ]).id('kubejs:mixing/diluted_fertilizer')
})
