ServerEvents.tags('item', event => {
  event.add('kubejs:andesite_alloys', ['create:andesite_alloy', 'kubejs:makeshift_andesite_alloy'])
})

ServerEvents.recipes(event => {
  const CRAFTING_TYPES = [
    'minecraft:crafting_shaped',
    'minecraft:crafting_shapeless',
    'create:mechanical_crafting',
    'create:item_application'
  ]
  const NO_CONVERSION = ['create:andesite_alloy', 'create:andesite_alloy_block', 'kubejs:makeshift_andesite_alloy']
  const OWN_RECIPE = ['create:crafting/kinetics/shaft']

  event.remove({ id: 'create:crafting/materials/andesite_alloy' })
  event.remove({ id: 'create:crafting/materials/andesite_alloy_from_zinc' })

  const ids = []
  CRAFTING_TYPES.forEach(type => {
    event.forEachRecipe({ type: type, input: 'create:andesite_alloy' }, recipe => {
      const result = recipe.getOriginalRecipeResult()
      if (result && NO_CONVERSION.includes(String(result.id))) return
      if (OWN_RECIPE.includes(String(recipe.getId()))) return
      ids.push(String(recipe.getId()))
    })
  })

  ids.forEach(id => event.replaceInput({ id: id }, 'create:andesite_alloy', '#kubejs:andesite_alloys'))

  event.shaped(Item.of('create:shaft', 2), ['A', 'A'], {
    A: 'kubejs:makeshift_andesite_alloy'
  }).id('kubejs:crafting/shaft_from_makeshift_alloy')

  console.info(`Makeshift Andesite Alloy accepted in ${ids.length} recipes`)
})
