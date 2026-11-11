const MACHINE_RECIPES = {
  'kubejs:andesite_machine': {
    with: [
      ['create:mechanical_press', 'minecraft:iron_block', 1],
      ['create:mechanical_mixer', 'create:whisk', 1],
      ['create:millstone', '#c:stones', 1],
      ['create:encased_fan', 'create:propeller', 1],
      ['create:mechanical_saw', 'create:iron_sheet', 1],
      ['create:mechanical_drill', 'minecraft:iron_ingot', 1],
      ['create:mechanical_piston', 'minecraft:piston', 1],
      ['create:mechanical_bearing', '#minecraft:wooden_slabs', 1],
      ['create:rope_pulley', 'farmersdelight:rope', 1],
      ['create:cart_assembler', 'minecraft:rail', 1],
      ['create:weighted_ejector', 'create:depot', 1],
      ['bits_n_bobs:chain_pulley', 'minecraft:chain', 1],
      ['create:packager', 'create:cardboard_block', 1],
      ['create:package_frogport', 'minecraft:slime_ball', 1],
      ['create:stock_link', 'create:transmitter', 1],
      ['create:chain_conveyor', 'minecraft:chain', 4],
      ['kubejs:trade_crate', 'minecraft:barrel', 1]
    ],
    cutter: [
      ['create:portable_storage_interface', 2],
      ['create:mechanical_harvester', 2],
      ['create:mechanical_plough', 2],
      ['create:gantry_carriage', 2],
      ['create:andesite_funnel', 4],
      ['create:andesite_tunnel', 4]
    ]
  },
  'kubejs:copper_machine': {
    with: [
      ['create:mechanical_pump', 'kubejs:rubber', 1],
      ['create:fluid_tank', 'minecraft:barrel', 4],
      ['create:spout', 'minecraft:hopper', 1],
      ['create:item_drain', 'minecraft:iron_bars', 1],
      ['create:copper_backtank', 'minecraft:copper_block', 1],
      ['create:steam_engine', 'create:golden_sheet', 1],
      ['create:empty_blaze_burner', 'minecraft:magma_block', 1],
      ['create_winery:wine_cellar', 'minecraft:glass_bottle', 1],
      ['createmetallurgy:foundry_basin', 'createmetallurgy:refractory_mortar', 1]
    ],
    cutter: [
      ['create:hose_pulley', 1],
      ['create:smart_fluid_pipe', 2],
      ['create:portable_fluid_interface', 2]
    ]
  },
  'kubejs:foundry_machine': {
    with: [
      ['createmetallurgy:foundry_mixer', 'createmetallurgy:sturdy_whisk', 1],
      ['createmetallurgy:industrial_crucible', 'minecraft:cauldron', 1],
      ['createmetallurgy:mechanical_belt_grinder', 'createmetallurgy:sandpaper_belt', 1],
      ['create:crushing_wheel', 'create:andesite_alloy_block', 2]
    ],
    cutter: []
  },
  'kubejs:brass_machine': {
    with: [
      ['create:deployer', 'create:brass_hand', 1],
      ['create:mechanical_crafter', 'minecraft:crafting_table', 3],
      ['create:mechanical_roller', 'create:crushing_wheel', 1],
      ['create:smart_chute', 'create:chute', 2],
      ['create:track_station', 'minecraft:compass', 1],
      ['create:controls', 'minecraft:lever', 1],
      ['create:elevator_pulley', 'minecraft:dried_kelp_block', 1],
      ['create:clockwork_bearing', 'minecraft:clock', 1],
      ['create:display_link', '#minecraft:signs', 1],
      ['create:schematicannon', 'minecraft:dispenser', 1],
      ['create:contraption_controls', '#minecraft:buttons', 1],
      ['createcobblestone:mechanical_generator', 'create:mechanical_drill', 1],
      ['create_integrated_farming:vacuum_harvester', 'create:mechanical_harvester', 1],
      ['bits_n_bobs:flywheel_bearing', 'create:large_cogwheel', 1]
    ],
    cutter: [
      ['create:mechanical_arm', 1],
      ['create:brass_funnel', 4],
      ['create:brass_tunnel', 4],
      ['create:sequenced_gearshift', 2],
      ['create:rotation_speed_controller', 1],
      ['create:stockpile_switch', 2],
      ['create:content_observer', 2],
      ['create:track_signal', 4]
    ]
  }
}

ServerEvents.recipes(event => {
  const recipeName = item => item.replace(':', '_')

  Object.keys(MACHINE_RECIPES).forEach(machine => {
    const { with: withX, cutter } = MACHINE_RECIPES[machine]
    withX.forEach(([output]) => event.remove({ output: output }))
    cutter.forEach(([output]) => event.remove({ output: output }))
  })

  Object.keys(MACHINE_RECIPES).forEach(machine => {
    const { with: withX, cutter } = MACHINE_RECIPES[machine]

    withX.forEach(([output, extra, count]) => {
      event.shapeless(Item.of(output, count), [machine, extra])
        .id(`kubejs:machine/crafting/${recipeName(output)}`)
      event.recipes.create.mechanical_crafting(Item.of(output, count), ['MX'], { M: machine, X: extra })
        .id(`kubejs:machine/mechanical_crafting/${recipeName(output)}`)
    })

    cutter.forEach(([output, count]) => {
      event.stonecutting(Item.of(output, count), machine)
        .id(`kubejs:machine/cutting/${recipeName(output)}`)
    })
  })
})
