ServerEvents.recipes(event => {
  const MACHINES = {
    andesite_machine: ['create:andesite_casing', 'kubejs:kinetic_mechanism'],
    copper_machine: ['create:copper_casing', 'kubejs:sealed_mechanism'],
    foundry_machine: ['create:industrial_iron_block', 'kubejs:refractory_mechanism'],
    brass_machine: ['create:brass_casing', 'create:precision_mechanism']
  }

  Object.keys(MACHINES).forEach(machine => {
    const [casing, mechanism] = MACHINES[machine]
    event.shaped(`kubejs:${machine}`, ['MMM', 'MCM', 'MMM'], {
      M: mechanism,
      C: casing
    }).id(`kubejs:crafting/${machine}`)
  })
})
