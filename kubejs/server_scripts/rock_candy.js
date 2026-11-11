ServerEvents.recipes(event => {
  const ROUGH = 'kubejs:rough_rock_candy'
  const POLISHED = 'kubejs:polished_rock_candy'

  const JUICE = 'kubejs:sugar_cane_juice'

  event.recipes.create.compacting(Fluid.of(JUICE, 250), [Item.of('minecraft:sugar_cane', 2)])
    .id('kubejs:compacting/sugar_cane_juice')

  event.recipes.create.mixing(ROUGH, [
    'minecraft:stick',
    Fluid.of(JUICE, 1000)
  ]).heated().id('kubejs:mixing/rough_rock_candy')

  event.custom({
    type: 'create:sandpaper_polishing',
    ingredients: [{ item: ROUGH }],
    results: [{ id: POLISHED }]
  }).id('kubejs:sandpaper_polishing/rock_candy')

  event.custom({
    type: 'createmetallurgy:grinding',
    ingredients: [{ item: ROUGH }],
    processing_time: 50,
    results: [{ id: POLISHED }]
  }).id('kubejs:grinding/rock_candy')

  event.replaceInput(
    { input: 'create:polished_rose_quartz', not: { type: 'minecraft:stonecutting' } },
    'create:polished_rose_quartz',
    POLISHED
  )
})
