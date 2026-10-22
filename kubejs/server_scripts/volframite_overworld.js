ServerEvents.recipes(event => {
  event.remove({ id: 'create:crushing/wolframite_ore' })

  event.custom({
    type: 'create:crushing',
    ingredients: [{ item: 'createmetallurgy:wolframite_ore' }],
    processing_time: 350,
    results: [
      { id: 'createmetallurgy:crushed_raw_tungsten' },
      { id: 'create:experience_nugget', chance: 0.75 },
      { id: 'minecraft:cobbled_deepslate', chance: 0.125 }
    ]
  }).id('kubejs:crushing/wolframite_ore')
})
