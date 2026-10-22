# Art
## Draw
### Materials
| Done | Item | Reference |
|---|---|---|
| X | Plant Glue | a more gooey `slimeball` |
| X | Makeshift Andesite Alloy | chunky `andesite_alloy` |
| X | Raw Rubber | |
| X | Sulfur Dust | shape of `gunpowder` |
| X | Rubber | |

### Mechanisms
Style base: `precision_mechanism` and `incomplete_precision_mechanism`.

| Done | Item | Reference |
|---|---|---|
|  | Kinetic Mechanism | `andesite_casing` palette + wood; exposed andesite cog |
|  | Incomplete Kinetic Mechanism | same, missing parts, like `incomplete_precision_mechanism` |
|  | Sealed Mechanism | `copper_casing` palette + black rubber gaskets |
|  | Incomplete Sealed Mechanism | same, without the gaskets |
|  | Refractory Mechanism | Metallurgy foundry palette (`refractory_mortar`, `foundry_basin`); burnt brick tone |
|  | Incomplete Refractory Mechanism | same, still raw (light mortar, before the lava) |
|  | Inductive Mechanism | `copper_wire_spool` coils + `magnet` over the Precision Mechanism |
|  | Incomplete Inductive Mechanism | same, with the coil half wound |

### Story
| Done | Item | Reference |
|---|---|---|
| X | Anselmo's Journal (item and cover) | `writable_book`; worn leather, a cog or wheat ear engraved on the cover; default Patchouli book for the layout |

### NPC skins
| Done | Character | Reference |
|---|---|---|
| | Baron Ferrugem | elegant dark suit, top hat, rust-coloured details (oxidised orange) |
| | Mayor | simple formal clothes, mayor's sash, shy posture |
| | Seu Bento | baker: white apron and cap, dusted with flour |
| | Dona Celeste | grocer: apron, headscarf, suspicious look |
| | Joca | fisherman: yellow raincoat, rubber boots |
| | Dona Marta | blacksmith: leather apron, thick gloves, strong arms |
| | Otávio | watchmaker: waistcoat, watchmaker's loupe on the eye, grey hair |

### Optional
| Done | Item | Reference |
|---|---|---|
| | Painting: portrait of Anselmo | vanilla painting style (`painting`); old farmer with straw hat and glasses |
| | Painting: portrait of the Baron | same style; official portrait pose, dark background |
| | Journal page images | screenshots of the machines with a paper / pencil sketch filter |

## Model
Blockbench, each with its own textures. The Machines can start from the era's casing with a detail on top.

| Done | Model | Reference |
|---|---|---|
| | Andesite Machine | `andesite_casing` + Kinetic Mechanism visible through a window; concept of CAB's Andesite Machine |
| | Copper Machine | `copper_casing` + rubber gaskets and a pipe |
| | Foundry Machine | `industrial_iron_block` + refractory bricks (`foundry_basin`) |
| | Brass Machine | `brass_casing` + glass showing the Precision Mechanism |
| | Electric Machine | casing to be decided (suggestion: Metallurgy steel block) + Electro Energetics coils and insulators |
| | Sap Extractor: static housing | `mechanical_drill` (attached to a block, driven from the back) + `tree_tapper` (spout and bucket) |
| | Sap Extractor: rotating blade (separate part, for animation) | rubber tapper's knife (spiral cut in the bark); Mechanical Drill head for the fitting |
| | Sap Extractor: item model | block model in item pose, like Create's items |
| | Sap Extractor: Ponder scene | Ponder scenes of the Mechanical Drill and the Spout |

# Recipes

**Status**: `Done` = script exists in `kubejs/` (not yet tested in game). Empty = to do.

## Already scripted
| Done | Change | Script |
|---|---|---|
| X | Ore, raw ore and crushed ore in furnace/blast furnace give **3 nuggets** instead of 1 ingot (iron, gold, copper, zinc, tungsten) | `server_scripts/minerio_na_fornalha.js` |
| X | Alloys only from the foundry: remove `mixing/brass_ingot` | `server_scripts/ligas_so_na_fundicao.js` |
| X | Remove and hide metals with no source in the pack (bronze, invar, constantan, electrum, aluminum, lead, lithium, nickel, osmium, silver, tin, netherite, necromium, void steel) | `server_scripts/ligas_sem_minerio.js`, `client_scripts/ligas_sem_minerio.js` |
| X | Wolframite generates in Overworld deepslate; crushing it gives cobbled deepslate instead of netherrack | `data/createmetallurgy/...`, `server_scripts/volframita_overworld.js` |

## New items
| Done | Item | Recipe | Yield |
|---|---|---|---|
| | Plant Glue | crafting: 2 wheat + water bottle | 2 |
| | Plant Glue | Mixer: 1 wheat + 100 mB water | 2 |
| | Makeshift Andesite Alloy | crafting: 2 andesite + 2 Plant Glue | 1 |
| | Raw Rubber | Mixer: 250 mB sap (`sap`) | 1 |
| | Raw Rubber | Compacting: 250 mB water + 4 vines | 1 |
| | Raw Rubber | Compacting: 250 mB water + 4 `#flowers` | 1 |
| | Sulfur Dust | Crushing / Milling: `sulfur` | 2–4 |
| | Rubber | heated Mixer: Raw Rubber + Sulfur Dust | 1 |
| | Kinetic Mechanism (manual) | crafting: knife (`#c:tools/knife`, kept with damage) + cogwheel + andesite alloy + log | 1 |
| | Kinetic Mechanism (automated, era 4) | sequenced assembly on wooden slab: deploy andesite alloy, deploy andesite alloy, deploy knife | 1 |
| | Sealed Mechanism | crafting: Rubber + Kinetic Mechanism + Rubber (row) | 1 |
| | Incomplete Refractory Mechanism | crafting: Sealed Mechanism + refractory mortar + graphite | 1 |
| | Refractory Mechanism | sequenced assembly: Spout 1000 mB lava, Spout 1000 mB lava, Press | 1 |
| | Inductive Mechanism | Precision Mechanism + copper wire + magnet | 1 |
| | Andesite Machine | Andesite Casing surrounded by 8 Kinetic Mechanisms | 1 |
| | Copper Machine | Copper Casing surrounded by 8 Sealed Mechanisms | 1 |
| | Foundry Machine | Industrial Iron Block surrounded by 8 Refractory Mechanisms | 1 |
| | Brass Machine | Brass Casing surrounded by 8 Precision Mechanisms | 1 |
| | Electric Machine | casing to be decided, surrounded by 8 Inductive Mechanisms | 1 |
| | Sap Extractor | Copper Machine + `tree_tapper` | 1 |

## Changed recipes
| Done | Recipe | Change |
|---|---|---|
| | Andesite Alloy | remove `crafting/materials/andesite_alloy` and `..._from_zinc` (no real alloy by hand) |
| | Andesite Alloy | Mixer (`mixing/andesite_alloy`, `..._from_zinc`): output 1 → **2** |
| | Early recipes | Makeshift Andesite Alloy accepted instead of Andesite Alloy in: shaft, andesite casing, hand crank, basin, depot, Kinetic Mechanism (check the full era 0 list in game) |
| | Precision Mechanism | `sequenced_assembly/precision_mechanism` starts from the Kinetic Mechanism |
| | Empty Blaze Burner | netherrack replaced; now Copper Machine + magma block |
| | Blaze Burner | new: Empty Blaze Burner + blaze rods (from  Peaceful essences) → `blaze_burner` |
| | Cinder Flour uses | replace `cinder_flour` with Sulfur Dust in Blaze Cake and in Create filling recipes (gunpowder, redstone, glowstone) |
| | Bountiful | remove `bountiful:bountyboard` and `bountiful:decree` (boards and decrees only in the village) |
| | Nether Wart | sell in the village or remove the recipes that use it (to be decided) |
| | Soul sand / soul soil | alternative recipe or give up haunting (to be decided) |

## Removed recipes (no Nether / End)
| Done | What |
|---|---|
| | Everything netherite: Create backtank and diving gear, Farmer's Delight knife, Hearth and Harvest cleaver, Sophisticated Backpacks netherite backpack and tier 4 stack upgrades, Vanilla Backport netherite armour |
| | Wither: `entity_melting/wither_skeleton`, Brewin' Withering Dross |
| | Dragon egg, dragon breath, nether star ( Peaceful tier III essence); Croptopia dragon egg dishes; Confectionery Ruby Chocolate |

## Machine recipes (Machine + X)
Machine + X in a crafting table (shapeless) and in the Mechanical Crafter. **Cutter** = Machine in the stonecutter, no X. The original recipe of each machine is removed.

### Era 1: Andesite Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| | Mechanical Press | iron block | 1 |
| | Mechanical Mixer | whisk | 1 |
| | Millstone | stone (`#c:stones`) | 1 |
| | Encased Fan | propeller | 1 |
| | Mechanical Saw | iron sheet | 1 |
| | Mechanical Drill | iron ingot | 1 |
| | Mechanical Piston | piston | 1 |
| | Mechanical Bearing | wooden slab | 1 |
| | Rope Pulley | Farmer's Delight rope | 1 |
| | Cart Assembler | rail | 1 |
| | Portable Storage Interface | chute | 2 |
| | Weighted Ejector | depot | 1 |
| | Chain Pulley (Bits 'n' Bobs) | chain | 1 |
| | Mechanical Harvester | cutter | 2 |
| | Mechanical Plough | cutter | 2 |
| | Gantry Carriage | cutter | 2 |
| | Andesite Funnel | cutter | 4 |
| | Andesite Tunnel | cutter | 4 |

### Era 2: Copper Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| | Mechanical Pump | Rubber | 1 |
| | Fluid Tank | barrel | 4 |
| | Spout | hopper | 1 |
| | Item Drain | iron bars | 1 |
| | Copper Backtank | copper block | 1 |
| | Steam Engine | golden sheet | 1 |
| | Empty Blaze Burner | magma block | 1 |
| | Wine Cellar (Winery) | glass bottle | 1 |
| | Sap Extractor | Hearth and Harvest Tree Tapper | 1 |
| | Hose Pulley | cutter | 1 |
| | Smart Fluid Pipe | cutter | 2 |
| | Portable Fluid Interface | cutter | 2 |

### Era 3: Foundry Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| | Foundry Basin | refractory mortar (block) | 1 |
| | Foundry Mixer | Sturdy Whisk | 1 |
| | Industrial Crucible | cauldron | 1 |
| | Mechanical Belt Grinder | Sandpaper Belt | 1 |
| | Crushing Wheel | andesite alloy block | 2 |

### Era 4: Brass Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| | Deployer | brass hand | 1 |
| | Mechanical Crafter | crafting table | 3 |
| | Mechanical Roller | crushing wheel | 1 |
| | Smart Chute | chute | 2 |
| | Packager | cardboard block | 1 |
| | Package Frogport | slimeball | 1 |
| | Stock Link | transmitter | 1 |
| | Chain Conveyor | chain | 4 |
| | Track Station | compass | 1 |
| | Train Controls | lever | 1 |
| | Elevator Pulley | dried kelp block | 1 |
| | Clockwork Bearing | clock | 1 |
| | Display Link | sign (`#signs`) | 1 |
| | Schematicannon | dispenser | 1 |
| | Contraption Controls | button | 1 |
| | Robo Bee Port | honeycomb | 1 |
| | Mechanical Generator (Create Cobblestone) | mechanical drill | 1 |
| | Vacuum Harvester (Integrated Farming) | mechanical harvester | 1 |
| | Flywheel Bearing (Bits 'n' Bobs) | large cogwheel | 1 |
| | Mechanical Arm | cutter | 1 |
| | Brass Funnel | cutter | 4 |
| | Brass Tunnel | cutter | 4 |
| | Sequenced Gearshift | cutter | 2 |
| | Rotation Speed Controller | cutter | 1 |
| | Stockpile Switch | cutter | 2 |
| | Content Observer | cutter | 2 |
| | Track Signal | cutter | 4 |

### Era 5: Electric Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| | Alternator Rotor | copper wire spool | 1 |
| | Stator | magnet | 1 |
| | Alternator Brushes | commutator | 1 |
| | Electric Motor (white; dye afterwards) | andesite alloy block | 1 |
| | Electric Pump | mechanical pump | 1 |
| | Resistive Heater | coal block | 1 |
| | Transformer | transformer core lamination | 1 |
| | Voltage Regulator | transformer core | 1 |
| | Converter | redstone block | 1 |
| | Accumulator | zinc block | 1 |
| | Capacitor | cutter | 2 |
| | Pantograph | cutter | 1 |

### Keep the original recipe
Chute, Clutch, Gearshift, Encased Chain Drive, Fluid Valve, Roost, Fishing Net, Andesite/Brass Depositor, Vendor, Bank Terminal, Salepoint, Repackager, Stock Ticker, Factory Gauge, Track Observer, Display Board, Extra Gauges blocks, Gigantic Cogwheel, Nixie Board, Headlamp, Catenary Holder, Rail Contact Shoe, Electrical Panel, Electro Energetics meters and connectors.
