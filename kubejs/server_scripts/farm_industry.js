ServerEvents.tags('item', event => {
  event.add('create:pulpifiable', 'kubejs:bagasse')
})

ServerEvents.tags('fluid', event => {
  event.add('kubejs:sugar_cane_juice', 'kubejs:sugar_cane_juice')
})

ServerEvents.recipes(event => {
  const OIL = 'kubejs:vegetable_oil'

  event.recipes.create.milling('minecraft:paper', 'kubejs:bagasse')
    .id('kubejs:milling/paper_from_bagasse')

  event.recipes.create.compacting(Fluid.of(OIL, 250), [Ingredient.of('#c:olives'), Ingredient.of('#c:olives')])
    .id('kubejs:compacting/vegetable_oil_from_olives')
  event.recipes.create.compacting(Fluid.of(OIL, 250), [Ingredient.of('#c:soybeans'), Ingredient.of('#c:soybeans'), Ingredient.of('#c:soybeans'), Ingredient.of('#c:soybeans')])
    .id('kubejs:compacting/vegetable_oil_from_soybeans')
  event.recipes.create.compacting(Fluid.of(OIL, 250), ['minecraft:sunflower'])
    .id('kubejs:compacting/vegetable_oil_from_sunflower')

  event.recipes.create.filling('croptopia:olive_oil', ['minecraft:glass_bottle', Fluid.of(OIL, 250)])
    .id('kubejs:filling/olive_oil')
  event.recipes.create.emptying(['minecraft:glass_bottle', Fluid.of(OIL, 250)], 'croptopia:olive_oil')
    .id('kubejs:emptying/olive_oil')

  event.custom({
    type: 'brewinandchewin:fermenting',
    base_fluid: { amount: 1000, ingredient: { tag: '#kubejs:sugar_cane_juice' }, unit: 'millibuckets' },
    experience: 1.0,
    fermenting_time: 4800,
    ingredients: [{ item: 'minecraft:sugar' }, { item: 'kubejs:bagasse' }, [], []],
    result: { amount: 1000, id: 'kubejs:ethanol' },
    unit: 'millibuckets'
  }).id('kubejs:fermenting/ethanol')
})
