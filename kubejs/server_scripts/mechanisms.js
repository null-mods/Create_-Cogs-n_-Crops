ServerEvents.recipes(event => {
  const kinetic = 'kubejs:kinetic_mechanism'
  const incompleteKinetic = 'kubejs:incomplete_kinetic_mechanism'
  const refractory = 'kubejs:refractory_mechanism'
  const incompleteRefractory = 'kubejs:incomplete_refractory_mechanism'

  event.shapeless(kinetic, ['#c:tools/knife', 'create:cogwheel', '#kubejs:andesite_alloys', '#minecraft:logs'])
    .damageIngredient('#c:tools/knife')
    .id('kubejs:crafting/kinetic_mechanism')

  event.recipes.create.sequenced_assembly([kinetic], '#minecraft:wooden_slabs', [
    event.recipes.create.deploying(incompleteKinetic, [incompleteKinetic, 'create:andesite_alloy']),
    event.recipes.create.deploying(incompleteKinetic, [incompleteKinetic, 'create:andesite_alloy']),
    event.recipes.create.deploying(incompleteKinetic, [incompleteKinetic, Ingredient.of('#c:tools/knife')]).keepHeldItem()
  ]).transitionalItem(incompleteKinetic).loops(1).id('kubejs:sequenced_assembly/kinetic_mechanism')

  event.shaped('kubejs:sealed_mechanism', ['RKR', ' O '], {
    R: 'kubejs:rubber',
    K: kinetic,
    O: 'croptopia:olive_oil'
  }).id('kubejs:crafting/sealed_mechanism')

  event.shapeless(incompleteRefractory, ['kubejs:sealed_mechanism', 'createmetallurgy:refractory_mortar', 'createmetallurgy:graphite'])
    .id('kubejs:crafting/incomplete_refractory_mechanism')

  event.recipes.create.sequenced_assembly([refractory], incompleteRefractory, [
    event.recipes.create.filling(incompleteRefractory, [incompleteRefractory, Fluid.of('minecraft:lava', 1000)]),
    event.recipes.create.filling(incompleteRefractory, [incompleteRefractory, Fluid.of('minecraft:lava', 1000)]),
    event.recipes.create.pressing(incompleteRefractory, incompleteRefractory)
  ]).transitionalItem(incompleteRefractory).loops(1).id('kubejs:sequenced_assembly/refractory_mechanism')

  event.remove({ id: 'create:sequenced_assembly/precision_mechanism' })
  const incompletePrecision = 'create:incomplete_precision_mechanism'
  event.recipes.create.sequenced_assembly(['create:precision_mechanism'], kinetic, [
    event.recipes.create.deploying(incompletePrecision, [incompletePrecision, 'create:cogwheel']),
    event.recipes.create.deploying(incompletePrecision, [incompletePrecision, 'create:large_cogwheel']),
    event.recipes.create.deploying(incompletePrecision, [incompletePrecision, '#c:nuggets/iron']),
    event.recipes.create.deploying(incompletePrecision, [incompletePrecision, 'kubejs:polished_rock_candy'])
  ]).transitionalItem(incompletePrecision).loops(3).id('kubejs:sequenced_assembly/precision_mechanism')
})
