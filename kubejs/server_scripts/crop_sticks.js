ServerEvents.recipes(event => {
  event.remove({ id: 'agricraft:wooden_crop_sticks' })
  event.remove({ id: 'agricraft:iron_crop_sticks' })

  event.recipes.create.cutting(Item.of('agricraft:wooden_crop_sticks', 4), Ingredient.of('#minecraft:planks'))
    .id('kubejs:cutting/wooden_crop_sticks')

  event.remove({ id: 'createmetallurgy:casting_in_table/iron/rod' })
  event.custom({
    type: 'createmetallurgy:casting_in_table',
    ingredients: [
      { type: 'neoforge:single', amount: 45, fluid: 'createmetallurgy:molten_iron' },
      { item: 'createmetallurgy:graphite_rod_mold' }
    ],
    processing_time: 30,
    result: { item: { count: 1, id: 'kubejs:iron_rod' } }
  }).id('kubejs:casting_in_table/iron_rod')

  event.shaped('agricraft:iron_crop_sticks', ['RR', 'RR'], {
    R: 'kubejs:iron_rod'
  }).id('kubejs:crafting/iron_crop_sticks')
})

const isMysticalSeed = item => {
  if (item.empty) return false
  if (item.id.startsWith('mysticalagriculture:') && item.id.endsWith('_seeds')) return true
  return item.id == 'agricraft:seed' && item.componentString.includes('mysticalagriculture:')
}

const mysticalPlantOn = block => {
  const entity = block.entity
  if (!entity || !entity.hasPlant()) return false
  return String(entity.getPlantId()).startsWith('mysticalagriculture:')
}

const canHandHarvest = item => item.empty || item.id == 'agricraft:seed' || item.id.endsWith('_seeds')

BlockEvents.rightClicked('agricraft:crop', event => {
  const { block, player, item, hand } = event
  const iron = String(block.properties.get('variant')) == 'iron'

  if (!iron && isMysticalSeed(item) && !mysticalPlantOn(block)) {
    player.setStatusMessage(Text.translate('kubejs.message.mystical_needs_iron_sticks').red())
    event.cancel()
    return
  }

  if (!iron && mysticalPlantOn(block) && !['agricraft:clipper', 'agricraft:trowel', 'agricraft:magnifying_glass'].includes(item.id)) {
    player.setStatusMessage(Text.translate('kubejs.message.mystical_needs_iron_sticks').red())
    event.cancel()
    return
  }

  if (String(hand) != 'MAIN_HAND' || !canHandHarvest(item)) return
  const entity = block.entity
  if (!entity || !entity.hasPlant() || !entity.canBeHarvested()) return

  entity.harvest(stack => block.popItem(stack), player)
  player.swing(hand)
  event.cancel()
})
