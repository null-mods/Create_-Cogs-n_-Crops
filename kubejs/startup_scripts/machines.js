const MACHINES = {
  andesite: [1.75, 0, 2, 14.25, 10.75, 15.5],
  copper: [3.5, 0, 3, 14.25, 12, 16],
  foundry: [2.5, 0, 2.5, 13.5, 9.5, 13.5],
  brass: [3.5, 0, 3, 14, 11, 13]
}

const PARTICLE = {
  andesite: 'create:block/andesite_casing',
  copper: 'create:block/fluid_tank',
  foundry: 'createmetallurgy:block/industrial_iron_block',
  brass: 'create:block/brass_casing'
}

StartupEvents.registry('block', event => {
  Object.keys(MACHINES).forEach(era => {
    const b = MACHINES[era]
    event.create(`${era}_machine`, 'cardinal')
      .parentModel(`kubejs:block/machines/${era}_machine`)
      .texture(PARTICLE[era])
      .box(b[0], b[1], b[2], b[3], b[4], b[5])
      .notSolid()
      .renderType('cutout')
      .hardness(3)
      .resistance(6)
      .soundType('metal')
      .requiresTool(true)
      .tagBlock('minecraft:mineable/pickaxe')
  })
})
