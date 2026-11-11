RecipeViewerEvents.addInformation('item', event => {
  event.add(
    ['minecraft:grindstone', '#c:raw_materials', '#c:ores', 'create:crushed_raw_iron', 'create:crushed_raw_gold',
      'create:crushed_raw_copper', 'create:crushed_raw_zinc', 'createmetallurgy:crushed_raw_tungsten'],
    [Text.translate('kubejs.info.grindstone_crushing')]
  )
})
