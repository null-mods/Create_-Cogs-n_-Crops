ServerEvents.tags('item', event => {
  event.add('c:dusts/sulfur', 'kubejs:sulfur_dust')
  event.add('c:dusts', 'kubejs:sulfur_dust')
})

ServerEvents.recipes(event => {
  event.shapeless('2x kubejs:plant_glue', ['#c:flours/wheat', '#c:flours/wheat', 'minecraft:water_bucket'])
    .id('kubejs:crafting/plant_glue')

  event.custom({
    type: 'create:mixing',
    ingredients: [
      { tag: 'c:flours/wheat' },
      { type: 'neoforge:single', amount: 100, fluid: 'minecraft:water' }
    ],
    results: [{ id: 'kubejs:plant_glue', count: 2 }]
  }).id('kubejs:mixing/plant_glue')

  event.shaped(Item.of('kubejs:makeshift_andesite_alloy', 2), ['AGA', 'GAG', 'AGA'], {
    A: 'minecraft:andesite',
    G: 'kubejs:plant_glue'
  }).id('kubejs:crafting/makeshift_andesite_alloy')

  event.custom({
    type: 'create:mixing',
    ingredients: [{ type: 'neoforge:single', amount: 250, fluid: 'hearthandharvest:sap' }],
    results: [{ id: 'kubejs:raw_rubber' }]
  }).id('kubejs:mixing/raw_rubber_from_sap')

  event.custom({
    type: 'create:compacting',
    ingredients: [
      { item: 'minecraft:vine' }, { item: 'minecraft:vine' }, { item: 'minecraft:vine' }, { item: 'minecraft:vine' },
      { type: 'neoforge:single', amount: 250, fluid: 'minecraft:water' }
    ],
    results: [{ id: 'kubejs:raw_rubber' }]
  }).id('kubejs:compacting/raw_rubber_from_vines')

  event.custom({
    type: 'create:compacting',
    ingredients: [
      { tag: 'minecraft:flowers' }, { tag: 'minecraft:flowers' }, { tag: 'minecraft:flowers' }, { tag: 'minecraft:flowers' },
      { type: 'neoforge:single', amount: 250, fluid: 'minecraft:water' }
    ],
    results: [{ id: 'kubejs:raw_rubber' }]
  }).id('kubejs:compacting/raw_rubber_from_flowers')

  event.custom({
    type: 'create:crushing',
    ingredients: [{ item: 'minecraft:sulfur' }],
    processing_time: 250,
    results: [
      { id: 'kubejs:sulfur_dust', count: 2 },
      { id: 'kubejs:sulfur_dust', count: 2, chance: 0.5 }
    ]
  }).id('kubejs:crushing/sulfur_dust')

  event.custom({
    type: 'create:milling',
    ingredients: [{ item: 'minecraft:sulfur' }],
    processing_time: 200,
    results: [{ id: 'kubejs:sulfur_dust', count: 2 }]
  }).id('kubejs:milling/sulfur_dust')

  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [{ item: 'kubejs:raw_rubber' }, { item: 'kubejs:sulfur_dust' }],
    results: [{ id: 'kubejs:rubber' }]
  }).id('kubejs:mixing/rubber')
})
