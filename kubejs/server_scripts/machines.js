ServerEvents.recipes(event => {
  event.shaped('kubejs:andesite_machine', ['ABA', 'BCB', 'ABA'], {
    A: 'create:andesite_alloy',
    B: 'create:cogwheel',
    C: 'create:andesite_casing'
  }).id('kubejs:crafting/andesite_machine')

  event.shaped('kubejs:copper_machine', ['ABA', 'BCB', 'ABA'], {
    A: 'kubejs:rubber',
    B: 'create:fluid_pipe',
    C: 'create:copper_casing'
  }).id('kubejs:crafting/copper_machine')

  event.shaped('kubejs:foundry_machine', ['ABA', 'BCB', 'ABA'], {
    A: 'createmetallurgy:refractory_mortar',
    B: 'createmetallurgy:steel_ingot',
    C: 'create:industrial_iron_block'
  }).id('kubejs:crafting/foundry_machine')

  event.shaped('kubejs:brass_machine', ['AAA', 'ACA', 'AAA'], {
    A: 'create:precision_mechanism',
    C: 'create:brass_casing'
  }).id('kubejs:crafting/brass_machine')
})
