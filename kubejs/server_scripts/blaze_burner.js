ServerEvents.recipes(event => {
  event.shapeless('create:blaze_burner', [
    'create:empty_blaze_burner',
    'minecraft:lava_bucket',
    'minecraft:coal_block',
    'kubejs:sulfur_dust',
    'kubejs:sulfur_dust'
  ]).id('kubejs:crafting/blaze_burner')
})
