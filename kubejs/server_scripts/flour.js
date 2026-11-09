ServerEvents.tags('item', event => {
  event.remove('c:flour', 'croptopia:flour')
  event.remove('c:flours', 'hearthandharvest:flour')
  event.remove('c:flours/wheat', 'hearthandharvest:flour')
})

ServerEvents.recipes(event => {
  event.replaceOutput({}, 'hearthandharvest:flour', 'create:wheat_flour')
  event.remove({ id: 'croptopia:flour' })
  event.remove({ id: 'croptopia:wheat_seeds' })
  event.remove({ id: 'hearthandharvest:cutting/wheat' })
  event.remove({ id: 'create:milling/wheat' })

  event.replaceInput({}, 'croptopia:flour', '#c:flours/wheat')
  event.replaceOutput({}, 'croptopia:flour', 'create:wheat_flour')
  event.replaceInput({ mod: 'hearthandharvest' }, 'hearthandharvest:flour', '#c:flours/wheat')

  event.custom({
    type: 'farmersdelight:cutting',
    ingredients: [{ item: 'minecraft:wheat' }],
    result: [{ item: { id: 'create:wheat_flour', count: 1 } }],
    tool: { tag: 'c:tools/knife' }
  }).id('kubejs:cutting/wheat_flour')

  event.custom({
    type: 'create:milling',
    ingredients: [{ item: 'minecraft:wheat' }],
    processing_time: 150,
    results: [
      { id: 'create:wheat_flour', count: 2 },
      { id: 'create:wheat_flour', chance: 0.1 },
      { id: 'minecraft:wheat_seeds' }
    ]
  }).id('kubejs:milling/wheat')

  event.custom({
    type: 'create:crushing',
    ingredients: [{ item: 'minecraft:wheat' }],
    processing_time: 150,
    results: [
      { id: 'create:wheat_flour', count: 2 },
      { id: 'create:wheat_flour', chance: 0.25 },
      { id: 'minecraft:wheat_seeds' }
    ]
  }).id('kubejs:crushing/wheat')
})
