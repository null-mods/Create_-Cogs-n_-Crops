const FERTILIZER = 'hearthandharvest:fertilizer_bag'

ServerEvents.recipes(event => {
  event.remove({ id: 'hearthandharvest:fertilizer_bag' })
  event.remove({ id: 'hearthandharvest:organic_compost_from_manure' })

  const compostRecipes = ['farmersdelight:organic_compost_from_rotten_flesh', 'farmersdelight:organic_compost_from_tree_bark']
  compostRecipes.forEach(id => {
    event.replaceOutput({ id: id }, 'farmersdelight:organic_compost', FERTILIZER)
  })

  event.custom({
    type: 'create:item_application',
    ingredients: [{ item: 'minecraft:dirt' }, { item: FERTILIZER }],
    results: [{ id: 'farmersdelight:organic_compost' }],
    keep_held_item: true
  }).id('kubejs:item_application/organic_compost')

  event.recipes.create.splashing('farmersdelight:rich_soil', 'farmersdelight:organic_compost')
    .id('kubejs:splashing/organic_compost')
})

BlockEvents.rightClicked('minecraft:dirt', event => {
  const { block, player, item, hand } = event
  if (String(hand) != 'MAIN_HAND' || item.id != FERTILIZER) return

  block.set('farmersdelight:organic_compost')
  if (!player.isCreative()) {
    if (item.maxDamage > 0) {
      item.damageValue = item.damageValue + 1
      if (item.damageValue >= item.maxDamage) item.shrink(1)
    } else {
      item.shrink(1)
    }
  }
  event.server.runCommandSilent(`playsound minecraft:item.bone_meal.use block @a ${block.x + 0.5} ${block.y + 0.5} ${block.z + 0.5} 1 1`)
  player.swing(hand)
  event.cancel()
})
