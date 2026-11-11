# Priorities (needs a new world)
Settle these before creating the **final world**. Test worlds can be thrown away until then.

| Done | Priority | Why |
|---|---|---|
| | Final IDs and namespace of every new item/block (mechanisms, machines, fertilizer, liquid fertilizer...), and whether each lives in KubeJS or the Java addon. Done for the materials: `kubejs:rough_rock_candy`, `polished_rock_candy`, `kubejs:plant_glue`, `makeshift_andesite_alloy`, `raw_rubber`, `rubber`, `sulfur_dust` | changing an ID later deletes those items from existing worlds |
| X | Ores: Inferium Ore and Prosperity Ore off (`generateInferiumOre = false`, `generateProsperityOre = false`); Soulstone only spawns in the Nether | ore generation only applies to unexplored chunks |
| | Ores: keep Sulfur Caves on (`vanillabackport-common.toml` → `has_sulfur_caves = true`); wolframite in deepslate already done | sulfur source; biomes only change in new chunks |
| X | No wild farm animals: pig, chicken, cow, sheep, bee, goat, horse, donkey and mule removed from natural spawns in every biome (`kubejs/data/kubejs/neoforge/biome_modifier/remove_farm_animals.json`); Icy's Better Horses breeds disabled by overriding its `horse_biome_spawns` biome modifier with `neoforge:none`; beehives removed from the 15 vanilla tree features (`kubejs/data/minecraft/worldgen/configured_feature/`), so grown trees have no nests either. Productive Bees nests stay. Vanilla villages disabled (`kubejs/server_scripts/worldgen.js` empties the 5 `has_structure/village_*` biome tags). Animals come from the village (Contrapeso) | needs a restart; only new chunks |
| X | No wild food plants: Croptopia crops and fruit trees, Farmer's Delight wild crops, Hearth & Harvest bushes and wild crops, Create Winery grapes disabled (their biome modifiers overridden with `neoforge:none` in `kubejs/data/<mod>/neoforge/biome_modifier/`); vanilla pumpkin, melon, sugar cane and sweet berry patches removed (`remove_wild_vanilla_crops.json`); cocoa removed from jungle trees. Grass and ferns drop wheat seeds (12.5%), carrot (3%) and potato (3%) only (`kubejs/data/minecraft/loot_table/blocks/`). Croptopia salt, mushrooms and flowers stay. Every other crop comes from buying or AgriCraft breeding | needs a restart; only new chunks |
| X | Croptopia mutation tree: 58 mutations in `kubejs/data/croptopia/agricraft/mutations/` plus beetroot (carrot + pumpkin) in `kubejs/data/minecraft/agricraft/mutations/`. Everything starts from wheat, carrot, potato and wild flowers; both parents always share a season; no pair repeats an existing one and wheat + carrot stays free for Inferium. Chance 50% up to depth 2, 35% deeper, 25% for exotic crops (tea, coffee, black pepper, vanilla, saguaro, kiwi, pineapple). Generator: scratchpad `croptopia_tree.py`. Sugar cane path: carrot + potato → pumpkin, carrot + pumpkin → beetroot, wheat + beetroot → sugar cane (relevant for the Prologue sugar cane quest). FD chest loot can still give seeds | needs a restart |
| | Game start: the player **spawns in Contrapeso's square**, talks to the Mayor (condolences, hands over Anselmo's letter, mentions the tools in the shed) and takes the stagecoach to the farm; the farm has half-built machines. Spawn point in the village depends on how the village is placed in the world (custom structure or prebuilt map): to be decided. The Mayor NPC does not exist yet, so the Prologue quest "Chegada a Contrapeso" is a checkmark | only happens when the world is created / first joined |
| | Starting season (`starting_sub_season = 1`) | Serene Seasons only applies it to new worlds |
| | Village: builds, shops, Order Boards and Trade Crates (Merchant Orders), vendors, Mayor's contract block | the dimension can be added later, but the content would have to be placed by hand |
| | Final mod list (removing a mod deletes its blocks from the world; disabling only recipes is safe) | removing mods with placed blocks breaks existing worlds |

## Scope changes
| Done | Change | Detail |
|---|---|---|
| | **Era 5 back (planned)** | was removed when Create Electro Energetics left the pack; now planned again after Brass, with reasons to need energy (winter greenhouse, MA tier 5, year-3 debt). See "Era 5: Electric Machine" |
| X | Clean up `alloys_without_ores.js` (server and client) | still references `electroenergetics:electrum_wire` and `electrum_wire_spool`; harmless now, remove when scripting |
| | **Village trip by Stagecoach, always** (Feelix's Stagecoach) | no train to the village at any point. Coach stops at the farm and in the village; check if the fare can be Numismatics coins (mod allows XP or items) |
| | Trains | Create trains stay in era 4 for farm logistics only (not for reaching the village) |
| | Fishing (Starcatcher + Hybrid Aquatic) | collectible fish, rods, aquarium, fisherman's hat: material for Joca's questline and fish sales |
| | Tom's Livestock Overhaul | genetics for sheep, chickens, cows, pigs, wolves; animals stay vanilla, so Inferium from farm animals still works. Test overlap with Salt's Animal Farm |
| X | **Bountiful replaced by Merchant Orders** (Bountiful and Create: Numismatic Bounties left the pack; `config/bountiful/` deleted) | the village sales channel ("one Bountiful board per shop") moves to Merchant Orders |
| | Merchant Orders: Order Board | catalog of villager trades grouped in 5 tiers (Novice to Master), unlocked by XP thresholds (`TIER_XP_THRESHOLDS`); purchases arrive in an Order Sack |
| X | Merchant Orders: Trade Crate | **recreated in KubeJS** as `kubejs:trade_crate` (`startup_scripts/trade_crate.js`, `server_scripts/trade_crate.js`): same look, 27-slot inventory that Create Packagers, funnels and hoppers can fill (only `#kubejs:sellable` items). Every minute it sells what it holds and pays **Numismatics coins** into its own slots. First price table: raw 16 = 1 spur, flour/dough 4 = 1, other food 1 spur, cake 16 (tune later). The original Merchant Orders crate is hidden from JEI. Recipe: Andesite Machine + barrel |
| | Merchant Orders: custom trades | config file accepts any item as `cost` / `cost_b` / `result`, with `level` and `max_uses`: shop trades in **Numismatics coins** go here (e.g. food → coins, coins → seeds) |
| | Merchant Orders: currency | **decided: Numismatics coins only, no emeralds.** Every shop trade is a custom trade priced in coins; selling goes only through custom trades (Trade Crate removed). Anti-spam: `max_uses` per trade and `restockDays` (now 3) |
| | Merchant Orders: villager trades | the Order Board also lists real villager trades (paid in emeralds): exclude them (`EXCLUDED_PROFESSIONS` / `EXCLUDED_MODS`, IDs listed in `config/merchant_orders-professions.txt` after startup) so only the custom coin trades show |
| | Merchant Orders: world generation | `config/merchant_orders-common.toml` → `[worldgen] spawnInVillages = true` now; set to `false` (the village is custom) |
| | Merchant Orders: wandering trader | the trader sells the Order Board for `terminalPrice = 48` emeralds; the config has no off switch (minimum 1 use). Remove or gate the board some other way |
| | Merchant Orders: profession list | `config/merchant_orders-professions.txt` is only written when a world loads; open a world once to get the IDs to exclude |
| | Merchant Orders: missing model | log on 09/11: `Failed to load model merchant_orders:models/block/order_board.json`; check how the Order Board looks in game |
| X | Kambrik | was only a Bountiful dependency; removed from the pack |
| | **Tom's Simple Storage + Create: Simple Storage Recipes** | storage network (terminals, connectors, cables). The recipes pack swaps Tom's recipes for Create ones: Storage Terminal = brass + Precision Mechanism + Smart Observer + glowstone + comparator (era 4); Inventory Connector = brass + chute + chests + ender pearl; Inventory Cable = superheated Mixer (brass sheet + copper sheet + dried kelp) → 8; Crafting Terminal = sequenced assembly on the Storage Terminal |
| X | Simple Storage Recipes was **not loading** | it is a datapack (`.zip`, only `data/`), and NeoForge does not load datapacks from `mods/`. Its files now live in `kubejs/data/toms_storage/recipe/` and `kubejs/data/create/advancement/` (load in every world); the zip and its `.pw.toml` left `mods/`. Not tested in game yet |
| | Simple Storage Recipes: Nether / End | Inventory Connector uses ender pearls; check if pearls are reachable without the End, otherwise swap them |
| | **Selling Bin = the village's "sell everything cheap" channel** | wd's Selling Bin 1.6, bundled inside Starcatcher (jar-in-jar, mod id `selling_bin`). Replaces the removed Trade Crate. Merchant Orders custom trades stay for shop purchases and better-paying deals |
| | Selling Bin: how it works | block `selling_bin:selling_bin` (2-block wide, center + side). Sell, Sell All and **Auto-Sell**; slot for a **Numismatics Bank Card** (money goes straight to the account). Global "Selling Bin Multiplier" in its config |
| | Selling Bin: coins | built-in datapack `selling_bin_currency_numismatics_coins`: spur 10, bevel 80, sprocket 160, cog 640, crown 5120, sun 40960 value points (1 spur = 10 points). Keep `selling_bin_currency_emeralds` and Starcatcher's `selling_bin_emeralds` off |
| | Selling Bin: prices | data map `selling_bin:selling_bin_value` (item or tag → `base_value` + processors). Built-in `selling_bin_sellable_foods`: `#c:foods` base 10 with `food_processor` (price grows with hunger and saturation), cake 200, golden apple 200, honey bottle 150. Starcatcher adds fish values. Processors also exist for durability, enchantments, wine age |
| X | **Selling Bin: packages only** | nothing goes in by hand, funnel or hopper: the `selling_bin:selling_bin_value` data map is emptied (`kubejs/data/selling_bin/data_maps/item/selling_bin_value.json`, `replace: true`), and the bin only accepts items with a value. Sales come from a Create **Packager** attached to the bin: a custom unpacking handler (Create API `UnpackingHandler.REGISTRY`, `startup_scripts/selling_bin.js`) prices the package contents with the Trade Crate table (`trade_crate.js`, in spurs; 1 spur = 10 bin points), adds the total to the bin's stored value and voids the items. A package with any unpriced item stays in the Packager. To test: the handler registers (log line "Selling Bin: package unpacking handler registered"), the data map is really empty (built-in packs may load above KubeJS), and the stored value turns into coins / bank card. JEI/EMI no longer shows bin prices |
| | Selling Bin: our price table | write our own `selling_bin_value` (kubejs/data) from the recipe-depth tiers already decided (raw 16 = 1 coin ... special 16–64 coins), instead of the generic food processor |
| | Selling Bin: enabling | built-in datapacks are off by default: pick them at world creation or `/datapack enable`; or ship our own data maps in `kubejs/data` so they load in every world |
| | Selling Bin: placement | **decided: craftable, the player can sell from the farm.** Keep the original recipe (barrel + wool carpets + wooden slabs). With Auto-Sell and the bank card it also works as the end of an automated production line |
| | Selling Bin: seasonal prices | data maps are static; seasonal changes would need a script that rewrites the values and reloads. Decide if the seasonal idea stays |

**Can wait (works on an existing world):** recipes (Machine + X, mechanisms, alloys, ores in furnace, rubber, makeshift alloy), quests, prices, contracts and debt, season length, Inferium from farm animals, AgriCraft mutations, soil addon (untracked farmland starts at 7), disabling sprinklers and MA crops.

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
| | Fertilizer | sack or pile of dark compost; `bone_meal` shape with manure palette |
| | Liquid Fertilizer (still and flowing fluid + bucket) | brownish-green, muddy; Create fluid textures as base |

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

### Story
| Done | Item | Reference |
|---|---|---|
| X | Anselmo's Journal (item and cover) | the FTB Quests book **is** Anselmo's Journal (no Patchouli book): retexture `ftbquests:book` as worn leather with a cog or wheat ear engraved on the cover |

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
Blockbench. The four Machines are **placeable decorative blocks** (KubeJS `cardinal` type: face the player, not solid, mined with a pickaxe, no function), with 3D models inspired by V2/V4/V6/V8 engines, made mechanical: Create cogwheels instead of cylinders. They reuse existing textures only (Create casings, axis, cogwheel, pipes, framed glass, electron tube; Metallurgy iron, crucible, refractory mortar; vanilla spruce and lava; our Rubber). Models in `kubejs/assets/kubejs/models/block/machines/`, registered in `startup_scripts/machines.js` with `parentModel` and a collision box sized to each model.

| Done | Model | Reference |
|---|---|---|
| X | Andesite Machine (`kubejs:andesite_machine`) | V2: andesite casing with recessed panels on spruce skids, one pair of cogs sunk into the top, cog output at the back; no window |
| X | Copper Machine (`kubejs:copper_machine`) | V4: sealed round copper tank (`fluid_tank` texture) on spruce cradles with rubber pads, two rubber seal rings, rubber-sealed pipe outlet, cog output at the back; no cogs on top |
| X | Foundry Machine (`kubejs:foundry_machine`) | V6: refractory mortar base, industrial iron body, glowing furnace door, crucible of molten metal on top; no cogs |
| X | Brass Machine (`kubejs:brass_machine`) | V8: brass casing on brass rails, four electron tubes, wire coil and cables; no cogs |
| | Sap Extractor: static housing | `mechanical_drill` (attached to a block, driven from the back) + `tree_tapper` (spout and bucket) |
| | Sap Extractor: rotating blade (separate part, for animation) | rubber tapper's knife (spiral cut in the bark); Mechanical Drill head for the fitting |
| | Sap Extractor: item model | block model in item pose, like Create's items |
| | Sap Extractor: Ponder scene | Ponder scenes of the Mechanical Drill and the Spout |

# Recipes

**Status**: `Done` = script exists in `kubejs/` (not yet tested in game). Empty = to do.

## Already scripted
| Done | Change | Script |
|---|---|---|
| X | Ores and raw ores **cannot be smelted**: right-click a Grindstone holding the ore to get 1 crushed ore (1 per ore), with a 25% chance of 1 XP. Only crushed ore smelts, into **3 nuggets** (iron, gold, copper, zinc, tungsten); full ingots come from the Foundry. JEI info on the Grindstone, ores and crushed ores | `server_scripts/ores_on_furnace.js`, `client_scripts/grindstone_info.js` |
| X | Iron ore needs a **copper pickaxe** or better (Vanilla Backport copper tools); a stone pickaxe breaks it without dropping anything. `#c:ores/iron` added to `minecraft:incorrect_for_stone_tool` | `server_scripts/mining_tiers.js` |
| X | No ore from washing: Create washing of gravel gives only flint (no iron nugget), red sand only dead bush (no gold nugget), soul sand only quartz (no gold nugget) | `server_scripts/washing.js` |
| X | Alloys only from the foundry: remove `mixing/brass_ingot` | `server_scripts/alloys_on_foundry.js` |
| X | Remove and hide metals with no source in the pack (bronze, invar, constantan, electrum, aluminum, lead, lithium, nickel, osmium, silver, tin, netherite, necromium, void steel) | `server_scripts/alloys_without_ores.js`, `client_scripts/alloys_without_ores.js` |
| X | Wolframite generates in Overworld deepslate; crushing it gives cobbled deepslate instead of netherrack | `data/createmetallurgy/...`, `server_scripts/volframite_overworld.js` |
| X | New items registered in the `kubejs` namespace (names in `en_us` / `pt_br`) and their recipes | `startup_scripts/items.js`, `assets/kubejs/lang/`, `server_scripts/new_items.js` |
| X | One wheat flour: `create:wheat_flour`. Croptopia flour recipe removed and hidden; Hearth and Harvest flour hidden, its recipes and Bag of Flour use / give the Create flour; both removed from the flour tags | `server_scripts/flour.js`, `client_scripts/hide_croptopia_flour.js` |
| X | Wheat on the cutting board (knife) → 1 flour; Create Central Kitchen turns it into Deployer and Saw recipes on its own (no extra saw recipe, it showed twice in JEI) | `server_scripts/flour.js` |
| X | Wheat in the Millstone → 2 flour + 10% chance of 1 more + 1 seed; Crushing Wheel → 2 flour + 25% chance of 1 more + 1 seed | `server_scripts/flour.js` |

## New items
| Done | Item | Recipe | Yield |
|---|---|---|---|
| X | Plant Glue (`kubejs:plant_glue`) | crafting: 2 wheat flour + water bucket | 2 |
| X | Plant Glue | Mixer: 1 wheat flour + 100 mB water | 2 |
| X | Makeshift Andesite Alloy (`kubejs:makeshift_andesite_alloy`) | crafting: 5 andesite + 4 Plant Glue (checkerboard, andesite in the corners and center) | 2 |
| X | Sugar Cane Juice (`kubejs:sugar_cane_juice`, fluid + bucket, "Caldo de Cana") | Press over a Basin (compacting): 2 sugar cane → 250 mB + 1 Bagasse | 250 mB |
| X | Bagasse (`kubejs:bagasse`, "Bagaço de Cana") | by-product of the cane juice; furnace fuel (400 ticks); Millstone → paper (sandpaper, books); in `#create:pulpifiable` (pulp → cardboard for Packagers) | 1 |
| X | Vegetable Oil (`kubejs:vegetable_oil`, fluid + bucket, "Óleo Vegetal") | compacting: 2 olives, 4 soybeans or 1 sunflower → 250 mB. Spout fills a glass bottle → `croptopia:olive_oil`; Item Drain empties it back. Blaze Burner fuel via Create Liquid Fuel (heated, not superheated) | 250 mB |
| X | Ethanol (`kubejs:ethanol`, fluid + bucket, "Etanol") | Brewin' and Chewin' Keg (fermenting): 1000 mB Sugar Cane Juice + sugar + bagasse → 1000 mB. Blaze Burner fuel that **superheats** (Create Liquid Fuel). Check in game that pipes can pull it out of the keg | 1000 mB |
| X | Rough Rock Candy (`kubejs:rough_rock_candy`) | heated Mixer: 1000 mB Sugar Cane Juice + 1 stick (Copper era, Blaze Burner) | 1 |
| X | Polished Rock Candy (`kubejs:polished_rock_candy`) | Rough Rock Candy polished with sandpaper (by hand or Deployer) or in the Metallurgy Belt Grinder | 1 |
| X | Raw Rubber (`kubejs:raw_rubber`) | Mixer: 250 mB sap (`hearthandharvest:sap`) | 1 |
| X | Raw Rubber | Compacting: 250 mB water + 4 vines | 1 |
| X | Raw Rubber | Compacting: 250 mB water + 4 `#flowers` | 1 |
| X | Sulfur Dust (`kubejs:sulfur_dust`, tags `c:dusts`, `c:dusts/sulfur`) | Crushing: `sulfur` → 2 + 50% chance of 2 more; Milling: `sulfur` → 2 | 2–4 |
| X | Rubber (`kubejs:rubber`) | heated Mixer: Raw Rubber + Sulfur Dust | 1 |
| X | Kinetic Mechanism (manual) | crafting: knife (`#c:tools/knife`, kept with damage) + cogwheel + andesite alloy or Makeshift Andesite Alloy (`#kubejs:andesite_alloys`) + log | 1 |
| X | Kinetic Mechanism (automated, era 4) | sequenced assembly on wooden slab: deploy andesite alloy, deploy andesite alloy, deploy knife | 1 |
| X | Sealed Mechanism | crafting: Rubber + Kinetic Mechanism + Rubber (row), with a bottle of oil (`croptopia:olive_oil`) under the Kinetic Mechanism | 1 |
| X | Incomplete Refractory Mechanism | crafting: Sealed Mechanism + refractory mortar + graphite | 1 |
| X | Refractory Mechanism | sequenced assembly: Spout 1000 mB lava, Spout 1000 mB lava, Press | 1 |
| X | Andesite Machine | Andesite Casing surrounded by 8 Kinetic Mechanisms (`server_scripts/machines.js`) | 1 |
| X | Copper Machine | Copper Casing surrounded by 8 Sealed Mechanisms | 1 |
| X | Foundry Machine | Industrial Iron Block surrounded by 8 Refractory Mechanisms | 1 |
| X | Brass Machine | Brass Casing surrounded by 8 Precision Mechanisms (`server_scripts/machines.js`) | 1 |
| | Sap Extractor | Copper Machine + `tree_tapper` | 1 |

## Changed recipes
| Done | Recipe | Change |
|---|---|---|
| X | Andesite Alloy | remove `crafting/materials/andesite_alloy` and `..._from_zinc` (no real alloy by hand; `server_scripts/makeshift_alloy.js`) |
| | Andesite Alloy | Mixer (`mixing/andesite_alloy`, `..._from_zinc`): output 1 → **2** |
| X | Makeshift accepted everywhere | **Every** crafting recipe that uses Andesite Alloy also accepts Makeshift Andesite Alloy (tag `kubejs:andesite_alloys`): crafting table, Mechanical Crafter and item application (e.g. Andesite Casing). Mixer, press, saw, stonecutter, sequenced assembly and alloying keep the real alloy. The alloy block is excluded so makeshift cannot be turned into real alloy. `server_scripts/makeshift_alloy.js` |
| X | Shafts from Makeshift | 2 Makeshift Andesite Alloy (vertical) → **2** shafts (`kubejs:crafting/shaft_from_makeshift_alloy`); the Create shaft recipe is left out of the conversion and keeps 2 Andesite Alloy → 8 |
| X | Mechanical Belt from rubber | `create:crafting/kinetics/belt_connector`: 6 Rubber instead of 6 dried kelp (same 3x2 shape, 1 belt). Belts become a Copper-era item, after the rubber line. `server_scripts/belts.js` |
| X | Sails from canvas or wool | White Sail takes `#kubejs:sail_cloth` = any wool or Farmer's Delight Canvas (straw), since there are no sheep. `server_scripts/sails.js` |
| X | Graphite: charcoal or coal | already the case: the Metallurgy graphite recipe uses `#minecraft:coals` (coal and charcoal); nothing changed |
| X | Farm → Create links | bagasse, vegetable oil, ethanol and the liquid fuels in `server_scripts/farm_industry.js` and `kubejs/data/createliquidfuel/data_maps/fluid/liquid_fuel.json` |
| X | Rock Candy replaces Polished Rose Quartz | every recipe that takes `create:polished_rose_quartz` as an ingredient takes `kubejs:polished_rock_candy` instead: Electron Tube, Rose Quartz Lamp, Nixie Board and Large Nixie Tube (Bits 'n' Bobs), drawer Capacity Upgrade T3, Rose Quartz Sheet pressing (Things and Misc, so also the Vibration Mechanism). Stonecutting to rose quartz tiles is untouched (decoration); rose quartz itself stays craftable for decoration. Sugar Cubes keep their H&H recipe. `server_scripts/rock_candy.js` |
| X | **Metallurgy in the Copper era** | melting and casting start in era 2: Foundry Basin is a Copper Machine recipe, heated by a Blaze Burner made with a lava bucket. Casting table, casting basin, foundry lid and graphite molds were already plain crafting. Era 3 (Foundry Machine) keeps the Foundry Mixer (alloys: brass, steel), Industrial Crucible, Belt Grinder and Crushing Wheel. Copper Age and Brass Age chapters have no quests yet, so nothing had to move; The Pack text now says melting and casting start in Copper Age |
| X | Precision Mechanism | rebuilt as `kubejs:sequenced_assembly/precision_mechanism`: starts from the Kinetic Mechanism; deploy cogwheel, large cogwheel, iron nugget, **Polished Rock Candy**; 3 loops (was 5), no scrap outputs (`server_scripts/mechanisms.js`) |
| | Empty Blaze Burner | netherrack replaced; now Copper Machine + magma block |
| X | Blaze Burner | shapeless: Empty Blaze Burner + lava bucket + coal block + 2 Sulfur Dust → `blaze_burner` (bucket returned); Copper era, so the Foundry Basin can be heated early (`server_scripts/blaze_burner.js`) |
| | Cinder Flour uses | replace `cinder_flour` with Sulfur Dust in Blaze Cake and in Create filling recipes (gunpowder, redstone, glowstone) |
| | Merchant Orders | `order_terminal` (Order Board) and Trade Crate only in the village: remove or gate their recipes (`merchant_orders:order_terminal`) |
| | Nether Wart | sell in the village or remove the recipes that use it (to be decided) |
| | Soul sand / soul soil | alternative recipe or give up haunting (to be decided) |

## Removed recipes (no Nether / End)
| Done | What |
|---|---|
| | Everything netherite: Create backtank and diving gear, Farmer's Delight knife, Hearth and Harvest cleaver, Sophisticated Backpacks netherite backpack and tier 4 stack upgrades, Vanilla Backport netherite armour |
| | Wither: `entity_melting/wither_skeleton`, Brewin' Withering Dross |
| | Dragon egg, dragon breath, nether star ( Peaceful tier III essence); Croptopia dragon egg dishes; Confectionery Ruby Chocolate |

## Mystical Agriculture
Own tier progression (tiers still used for MA tools, armour and augments). Resource seeds come only from AgriCraft mutations (see AgriCraft), with no era gate.

| Done | Change | Detail |
|---|---|---|
| | Infusion Altar | remove the altar, the pedestals and every `seed/infusion/*` recipe |
| | Seed crafting at the table | keep the MA option `seed_crafting_recipes_enabled` **off** |
| | Inferium sources | only the Inferium plant and **farm animals** (cow, pig, chicken, sheep, rabbit, goat; adjust list) |
| | Inferium ore | disable its world generation |
| | Farm animal drops | loot modifier: chance of Inferium Essence (balance chance and amount) |
| | MA mob drops | check if MA makes mobs drop Inferium by config; if so, limit to farm animals (no hostile mobs) |
| X | Iron, gold, copper essence | `essence/minecraft/{iron,gold,copper}_ingot`: 8 essence → **4 raw ore** instead of 4 ingots |
| X | Zinc essence | `essence/common/zinc_ingot`: 8 essence → **4 `raw_zinc`** |
| X | Tungsten seed (new) | `config/mysticalcustomization/crops/tungsten.json` (tier 4, resource, color 7A7C66); crop id `mysticalcustomization:tungsten`, but seeds/essence/crop are `mysticalagriculture:tungsten_*`, so AgriCraft's built-in `mysticalagriculture:tungsten` plant matches. Name via lang key `crop.mysticalcustomization.tungsten`. 8 essence → 4 `createmetallurgy:raw_tungsten`; iron, gold, copper and zinc essence also give 4 raw ores, all in `kubejs/server_scripts/mystical.js` |
| X | Sulfur seed | add Sulfur Dust to `c:dusts/sulfur` (the MA crop only turns on when this tag has an item) |
| | Year-round growth | add `#mysticalagriculture:crops` to `sereneseasons:year_round_crops` |
| | Active seeds | iron, copper, gold, zinc, tungsten, coal, redstone, lapis lazuli, nether quartz, diamond, emerald, sulfur |
| X | Other crops | **changed:** elements/blocks, farm animals and hostile mobs now have mutations (table below) and Fields quests, so the plant route also gives animal and mob drops without killing. Still enabled without mutation: brass, steel, graphite, netherite, soulium. Disabled (no material in the pack): the 66 listed below plus apatite, basalz, blitz, blizz, limestone, marble, menril, saltpeter, silicon, rubber. AgriCraft had no plant definition for sculk, armadillo, phantom and breeze: added in `kubejs/data/mysticalagriculture/agricraft/plants/` (copied from zombie). PT name override: earth = "Elemento Terra" (dirt and earth were both "Terra") |
| X | Disable crops whose material is not in the pack | 66 crops (aluminum, tin, silver, lead, nickel, osmium, uranium, bronze, electrum, invar, ruby, sapphire, mod alloys...) set to `enabled: false` in `config/mysticalcustomization/configure-crops.json`. Still enabled besides the active seeds: brass, steel, graphite, netherite, soulium and the non-ore crops (elements, mobs, stone, dirt, Nether/End...) |

## AgriCraft

| Done | Change | Detail |
|---|---|---|
| | Normal crops | AgriCraft optional: breed to improve seeds; normal planting stays |
| | Mystical Agriculture | resource seeds only by mutation; Inferium stays plantable normally and is the root of the tree |
| | Plants in AgriCraft | vanilla, Farmer's Delight, Croptopia, Hearth and Harvest, Mystical Agriculture (check if JSON plant definitions are needed) |
| X | Crop sticks | wooden crop sticks only from the Mechanical Saw (`create:cutting`, 1 plank → 4); crafting recipe removed. Iron crop sticks only from `kubejs:iron_rod` (2x2 rods → 1), and the rod only from the Create Metallurgy casting table with the graphite rod mold (45 mB molten iron), so iron sticks are a Copper-age item (Foundry Basin + Blaze Burner). `kubejs/server_scripts/crop_sticks.js` |
| X | MA needs iron crop sticks | `crop_sticks.js` blocks planting MA seeds (also `agricraft:seed` carrying an MA plant) on non-iron sticks, and blocks right-click harvest of an MA plant on non-iron sticks (it can appear there by mutation, e.g. Inferium from wheat × carrot); clipper, trowel and magnifying glass still work, breaking still drops the seed. Mechanical harvesting is not blocked. MA therefore starts in the Copper age |
| X | Jade crop growth | vanilla `crop_progress` off in `config/jade/plugins.json`: it showed a fixed 100% on every AgriCraft crop (crop sticks are in `minecraft:maintains_farmland` and sit on farmland). The AgriCraft line is the real one. Side effect: non-AgriCraft blocks with an age (fruit trees, bushes) no longer show growth in Jade |
| X | Right-click harvest | AgriCraft's own right-click harvest did not fire in game (cause not found). `crop_sticks.js` harvests a mature AgriCraft crop on main-hand right click with an empty hand or holding a seed (`AgriCrop.harvest`, drops popped at the block, crop resets to its after-harvest stage). MA plants on non-iron sticks stay blocked. Right Click Harvest 4.6.1 (+ jamlib) is installed for the other crops; it only handles `CropBlock`s and blocks with an `age` property, so it never touches `agricraft:crop` |
| | Seed analyzer | era 0 (no gate) |
| X | AgriCraft irrigation disabled | irrigation tank, channel, hollow channel, channel valve and AgriCraft sprinkler: recipes removed (`kubejs/server_scripts/disabled_irrigation.js`) and hidden from JEI. Water reaches the fields through Create pipes and the Create: Things and Misc sprinkler |
| | Test: Serene Seasons | do season rules still apply to crops on crop sticks? |
| X | Mutation format (checked in the 4.0.24 jar) | `{ chance, child, parent1, parent2 }` only, in `data/<ns>/agricraft/mutations/`. **No condition for a block under the crop sticks.** A pair can have several children (one is picked). AgriCraft already ships plant definitions for MA crops (`datapacks/mysticalagriculture`) but **no MA mutations**: every MA mutation has to be written by us |
| X | "Resource block below" for MA mutations | **discarded**: MA mutations only need the two parent plants |
| X | Disable AgriCraft's own ore plants | done: the 18 mutations that create AgriCraft resource plants (Ferranium, Aurigold, Cuprosia, Lapender, Redstodendron, Diamahlia, Emeryllis, Quartzanthemum, Plombean, Niccissus, Osmonium, Platiolus, Jaslumine, Petinia, Nitor Wart, Nethereed, Carbonation, Amathyllis) are overridden with **chance 0** in `kubejs/data/agricraft/agricraft/mutations/`. The datapack can't delete registry entries, so they may still show in JEI with 0%. Ore only comes from MA |
| X | Seasons on crop sticks | AgriCraft ships its 58 Croptopia plants allowing all four seasons. Overridden in `kubejs/data/croptopia/agricraft/plants/` with the same seasons as the Serene Seasons tags (only `requirement.seasons` changes). Croptopia tea/pepper/vanilla, Create Winery grapes and H&H pips were missing from Serene Seasons: added in `kubejs/server_scripts/seasons.js` (tea spring, pepper and vanilla summer, grapes autumn, pips spring+summer) |

### MA mutation tree
Mutations only need the two parents (no block under the crop sticks: discarded). No parent pair repeats. Files in `kubejs/data/mysticalagriculture/agricraft/mutations/`. **Inferium = Wheat × Carrot (10%)**, done. To test: AgriCraft with the same plant as both parents (Inferium × Inferium, Coal × Coal).

| Done | Seed | Parents |
|---|---|---|
| X | Coal | Inferium × Inferium (25%) |
| X | Copper | Inferium × Coal (25%) |
| X | Sulfur | Coal × Coal (25%) |
| X | Iron | Coal × Copper (15%) |
| X | Redstone | Iron × Coal (15%) |
| X | Zinc | Copper × Iron (15%) |
| X | Nether Quartz | Iron × Sulfur (15%) |
| X | Lapis Lazuli | Redstone × Copper (10%) |
| X | Gold | Iron × Zinc (10%) |
| X | Tungsten | Zinc × Gold (10%) |
| X | Diamond | Gold × Lapis Lazuli (5%) |
| X | Emerald | Gold × Nether Quartz (5%) |
| X | Dirt | inferium × potato (25%) |
| X | Stone | dirt × coal (25%) |
| X | Earth | dirt × stone (20%) |
| X | Water | inferium × seagrass (25%) |
| X | Air | inferium × oxeye daisy (25%) |
| X | Fire | coal × sulfur (20%) |
| X | Nature | earth × water (15%) |
| X | Ice | water × air (15%) |
| X | Deepslate | stone × iron (15%) |
| X | Basalt | fire × stone (15%) |
| X | Wood | nature × dirt (15%) |
| X | Dye | nature × dandelion (15%) |
| X | Mystical Flower | nature × poppy (15%) |
| X | Honey | nature × sweet berries (10%) |
| X | Coral | water × nature (15%) |
| X | Prismarine | coral × lapis lazuli (10%) |
| X | Amethyst | stone × lapis lazuli (10%) |
| X | Glowstone | fire × redstone (10%) |
| X | Experience | inferium × lapis lazuli (10%) |
| X | Obsidian | fire × water (10%) |
| X | Nether | fire × earth (10%) |
| X | End | obsidian × air (5%) |
| X | Sculk | deepslate × experience (5%) |
| X | Cow | inferium × wheat (20%) |
| X | Pig | inferium × carrot (20%) |
| X | Chicken | inferium × corn (20%) |
| X | Sheep | inferium × white tulip (20%) |
| X | Rabbit | inferium × dandelion (20%) |
| X | Fish | water × seagrass (20%) |
| X | Squid | fish × water (15%) |
| X | Turtle | fish × sea pickle (10%) |
| X | Armadillo | turtle × earth (10%) |
| X | Zombie | cow × dirt (15%) |
| X | Skeleton | zombie × stone (15%) |
| X | Spider | zombie × nature (15%) |
| X | Creeper | zombie × sulfur (15%) |
| X | Slime | water × zombie (10%) |
| X | Phantom | air × skeleton (10%) |
| X | Blaze | fire × nether (5%) |
| X | Ghast | blaze × air (5%) |
| X | Enderman | end × zombie (5%) |
| X | Wither Skeleton | skeleton × nether (5%) |
| X | Breeze | air × ghast (5%) |

## Soil depletion
Own Java mod. One value per farmland block: **fertility**.

| Done | Rule | Detail |
|---|---|---|
| | Depletion | -1 fertility per mature harvest (by hand, Mechanical Harvester, AgriCraft crop sticks) |
| | Visible states | fertility 4–10: farmland; 1–3: **dirt**; 0: **coarse dirt**. Changes on harvest |
| | Crops on depleted soil | existing crops **stay planted** on tracked dirt and coarse dirt; they grow on dirt, **don't grow on coarse dirt**. New seeds only on farmland |
| | Recovery | only fertilizers (solid and liquid); no fallow, no rotation |
| | Dirt (1–3) | any fertilizer raises it; hoe / Create plough only works at 4+ |
| | Coarse dirt (0) | only Fertilizer or Liquid Fertilizer recover it (becomes dirt); block the vanilla hoe conversion on tracked coarse dirt |
| | Exempt | perennials that don't use farmland (berry bushes, sugar cane, bamboo, trees). Rich Soil and MA crops **do** deplete |
| | Max / new farmland | 10 / 7 (4 harvests before turning into dirt; not 10 so replacing the block doesn't pay off) |
| | Bone meal | +1 |
| | Manure (Hearth and Harvest) | +3 |
| | Organic Compost (Farmer's Delight) | +5 |
| X | Fertilizer = Hearth & Harvest Fertilizer Bag (`hearthandharvest:fertilizer_bag`, a durability tool that instantly grows a crop) | Farmer's Delight's two organic compost crafting recipes (dirt, straw, bone meal + tree bark or rotten flesh) now output the Fertilizer Bag; H&H's own bag recipe and its manure → organic compost recipe are removed (also gone from the Create mixer, which only auto-mixes crafting recipes). Organic Compost now only comes from the bag on dirt. Right-click a dirt block with the bag: the dirt becomes an Organic Compost block and the bag loses 1 durability. The compost ages into Rich Soil on its own (Farmer's Delight); as an item, Create washing (fan + water) turns Organic Compost into Rich Soil. `kubejs/server_scripts/fertilizer.js`. Soil-mod value still +10. Shown in JEI as a Create Manual Item Application (dirt + bag → compost, `keep_held_item`) |
| X | Grindstone in JEI | `create:item_application` recipes (grindstone + ore or raw ore → grindstone + crushed ore), one per metal and per tag, in `ores_on_furnace.js`. They also work in the world and with deployers. KubeJS and Create both handle the right-click at normal priority: to test which runs first (crushed in inventory = KubeJS, with the 25% XP; crushed dropped = Create, no XP) |
| X | Liquid Fertilizer = Things and Misc `diluted_bonemeal`, renamed Diluted Fertilizer / Fertilizante Diluído (lang override in `kubejs/assets/create_things_and_misc/lang/`) | Mixer: Fertilizer Bag + 1000 mB water → 1000 mB; bone meal recipe removed (`kubejs/server_scripts/sprinkler.js`). Reusing the fluid means the sprinkler accepts it with no mixin. Soil-mod value still +1 per sprinkler pass |
| | Automation | solid: Deployer right-click; liquid: sprinkler from Create: Things and Misc 4.1.1 |
| | Sprinkler mixin | its tank only accepts `diluted_bonemeal` (hardcoded). Mixin: accept Liquid Fertilizer too; spraying it adds +1 fertility to tracked soil in its 5x5 area; diluted bonemeal growth must not work on coarse dirt. Pin the mod at 4.1.1 |
| X | Other sprinklers | `agricraft:sprinkler` and `hearthandharvest:sprinkler`: recipes removed and hidden from JEI (`kubejs/server_scripts/disabled_irrigation.js`) |
| | Sprinkler era | proposal: era 2, Copper Machine + `sprinkler_head` (original recipe already uses copper casing) |
| X | Sprinkler head | rubber instead of dried kelp (rubber over copper ingot), `kubejs/server_scripts/sprinkler.js` |
| | Jade | show fertility when looking at farmland |
| | Test | interaction with AgriCraft soil properties; Create plough creates farmland at 5 |

## Two paths: plants or animals, killing optional
Goal: the whole pack can be finished focusing on **plants** or on **animals**, and **without killing any animal** (killing stays possible, never required). Rule for every new recipe and quest: no step may require a drop that only comes from killing.

### Where killing is required today
| Done | Item / system | Why it needs killing now | Plant route | Animal route (no killing) |
|---|---|---|---|---|
| | Inferium Essence (start of MA) | planned source: drops when farm animals die | **decided:** AgriCraft mutation **Wheat × Carrot → Inferium**, 10% chance (tune in testing). The pair is free in the pack (no other mutation uses it). Inferium only grows on wet, high-nutrient soil (farmland, Rich Soil farmland, MA farmlands), so the first plant needs irrigated farmland. File: `kubejs/data/mysticalagriculture/agricraft/mutations/inferium.json` | chance of Inferium Essence when **shearing, milking, collecting eggs from a roost or brushing** (script/loot modifier on those actions, not on death) |
| | Create: Peaceful essences (tier 1 to 3: blaze rod, ender pearl, gunpowder, bone, string...) | only drop when animals die (`create_peaceful` loot modifiers) | Mixer: Inferium Essence + organic compost → tier 1 essence | Mixer: Inferium Essence + wool / egg / milk bottle → tier 1 essence. Tier 2 and 3 keep Peaceful's crafting from tier 1 |
| X | Blaze Burner | no longer needs blaze rods: lava bucket recipe (see Recipes) | — | same |
| | Leather (backpacks, books, item frames) | cows and rabbits only drop it on death | new: Tree Bark (Farmer's Delight) + Plant Glue pressed → leather | same plant recipe (no animal-only leather) |
| | Feather (Schematic and Quill, arrows) | chickens only drop it on death; the Create Integrated Farming roost gives only eggs | none needed (both items optional) | add feathers to the chicken roost loot (low chance) |
| | Gunpowder | creepers; Create filling uses cinder flour | Mixer: Sulfur Dust + charcoal → gunpowder | same |
| | Ender pearl | Endermen; no End | via Peaceful tier 2 essence (now killing-free) | same |
| | String | spiders | already killing-free: wool → string (Create: Peaceful) and Create milling of wool | shearing |
| | Bone meal | skeletons | already killing-free: composting, Create milling of calcite | same |
| | Meat and fish dishes | killing | every food quest, contract and price tier must have a vegetarian option | eggs, milk, cheese, honey |
| | MA mob crops | seeds made from mob essences | already disabled (see Mystical Agriculture) | same |

### Quests
| Done | Rule |
|---|---|
| | Fields and Barn both open from the Prologue (today Barn opens from the Fields quest "Esterco"; add a second way in from the Prologue, `dependency_requirement: "one_completed"`) |
| | The MA part of Fields needs **one** Inferium quest: the plant one (Fields) **or** the animal one (Barn), with `dependency_requirement: "one_completed"` |
| | Barn quest "Essência de Inferium" changes its text: essence comes from caring for animals (shearing, milking, eggs), not from killing |
| | No quest task asks for meat, leather from animals, feathers or any kill-only drop; Challenges may have an optional "never killed an animal" goal |
| | Era quests (Andesite, Copper, Foundry, Brass) stay neutral: they only need machines, metals and rubber, all reachable on both routes |

## Machine recipes (Machine + X)
Machine + X in a crafting table (shapeless) and in the Mechanical Crafter. **Cutter** = Machine in the stonecutter, no X. The original recipe of each machine is removed. Implemented in `server_scripts/machine_recipes.js` (shapeless crafting, Mechanical Crafter `MX`, stonecutter); the Sap Extractor waits for its block.

### Era 1: Andesite Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| X | Mechanical Press | iron block | 1 |
| X | Mechanical Mixer | whisk | 1 |
| X | Millstone | stone (`#c:stones`) | 1 |
| X | Encased Fan | propeller | 1 |
| X | Mechanical Saw | iron sheet | 1 |
| X | Mechanical Drill | iron ingot | 1 |
| X | Mechanical Piston | piston | 1 |
| X | Mechanical Bearing | wooden slab | 1 |
| X | Rope Pulley | Farmer's Delight rope | 1 |
| X | Cart Assembler | rail | 1 |
| X | Portable Storage Interface | cutter (as in CAB) | 2 |
| X | Weighted Ejector | depot | 1 |
| X | Chain Pulley (Bits 'n' Bobs) | chain | 1 |
| X | Packager | cardboard block | 1 |
| X | Package Frogport | slimeball | 1 |
| X | Stock Link | transmitter | 1 |
| X | Chain Conveyor | chain | 4 |
| X | Trade Crate (KubeJS) | barrel | 1 |
| X | Mechanical Harvester | cutter | 2 |
| X | Mechanical Plough | cutter | 2 |
| X | Gantry Carriage | cutter | 2 |
| X | Andesite Funnel | cutter | 4 |
| X | Andesite Tunnel | cutter | 4 |

### Era 2: Copper Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| X | Mechanical Pump | Rubber | 1 |
| X | Fluid Tank | barrel | 4 |
| X | Spout | hopper | 1 |
| X | Item Drain | iron bars | 1 |
| X | Copper Backtank | copper block | 1 |
| X | Steam Engine | golden sheet | 1 |
| X | Empty Blaze Burner | magma block | 1 |
| X | Wine Cellar (Winery) | glass bottle | 1 |
| X | Foundry Basin (Metallurgy, moved from era 3) | refractory mortar (block) | 1 |
| | Sap Extractor | Hearth and Harvest Tree Tapper | 1 |
| X | Hose Pulley | cutter | 1 |
| X | Smart Fluid Pipe | cutter | 2 |
| X | Portable Fluid Interface | cutter | 2 |

### Era 3: Foundry Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| X | Foundry Mixer | Sturdy Whisk | 1 |
| X | Industrial Crucible | cauldron | 1 |
| X | Mechanical Belt Grinder | Sandpaper Belt | 1 |
| X | Crushing Wheel | andesite alloy block | 2 |

### Era 4: Brass Machine
| Done | Machine | X | Yield |
|---|---|---|---|
| X | Deployer | brass hand | 1 |
| X | Mechanical Crafter | crafting table | 3 |
| X | Mechanical Roller | crushing wheel | 1 |
| X | Smart Chute | chute | 2 |
| X | Track Station | compass | 1 |
| X | Train Controls | lever | 1 |
| X | Elevator Pulley | dried kelp block | 1 |
| X | Clockwork Bearing | clock | 1 |
| X | Display Link | sign (`#signs`) | 1 |
| X | Schematicannon | dispenser | 1 |
| X | Contraption Controls | button | 1 |
| X | Mechanical Generator (Create Cobblestone) | mechanical drill | 1 |
| X | Vacuum Harvester (Integrated Farming) | mechanical harvester | 1 |
| X | Flywheel Bearing (Bits 'n' Bobs) | large cogwheel | 1 |
| X | Mechanical Arm | cutter | 1 |
| X | Brass Funnel | cutter | 4 |
| X | Brass Tunnel | cutter | 4 |
| X | Sequenced Gearshift | cutter | 2 |
| X | Rotation Speed Controller | cutter | 1 |
| X | Stockpile Switch | cutter | 2 |
| X | Content Observer | cutter | 2 |
| X | Track Signal | cutter | 4 |

### Era 5: Electric Machine (planned, after Brass)

**Decided:** Create: Electro Energetics comes back as era 5. Energy must unlock things rotation cannot, for three reasons: winter greenhouse, the end of Mystical Agriculture, and the year-3 debt.

| Done | Item | Plan |
|---|---|---|
| | Mod | re-add Create: Electro Energetics; first find out why it left the pack, and list its 1.21.1 blocks (motor, pump, wires, magnet, generators) |
| | Inductive Mechanism (+ incomplete) | Precision Mechanism + copper wire spool coils + magnet (sequenced assembly) |
| | Electric Machine | casing to be decided (suggestion: Metallurgy steel block) surrounded by 8 Inductive Mechanisms |
| | Machine + X | Electric Motor (andesite alloy block), Electric Pump (mechanical pump), Greenhouse Monitor (daylight detector); more once the mod's block list is known |

| Done | Reason | Plan |
|---|---|---|
| | 1. Winter greenhouse | AgriCraft greenhouses already ignore seasons (`agricraft.jsonc` → `greenhouse.ignores_seasons = true`), created with the **Greenhouse Monitor** (sneak + use in an enclosed space with ≥ 40% glass ceiling). Today its recipe is cheap (redstone, lapis, 2 glass bottles): remove it and make the monitor **Electric Machine + daylight detector** ("grow lamps"). For winter to really need it, close the other bypasses: Serene Seasons `out_of_season_crop_behavior` 0 (grows slowly) → 1 (can't grow); `underground_fertility_level` 48 → below the world (crops underground grow all year today); Serene's own "glass above the crop" rule (code, no config: test whether it affects `agricraft:crop`). Test whether AgriCraft season requirements and Serene's checks both apply to AgriCraft crops |
| | 2. End of Mystical Agriculture | tier 5 needs the Inductive Mechanism: Supremium Essence crafting, Master Infusion Crystal and the Awakening Altar recipes take Inductive Mechanisms. Tier 1–4 seeds stay as they are (AgriCraft mutations) |
| | 3. Year-3 debt | baskets that only era 5 can fill (see "Debt: paid in products", installments 9–12): out-of-season crops (greenhouse), tier 5 MA products, electric-made goods |

### Keep the original recipe
Chute, Clutch, Gearshift, Encased Chain Drive, Fluid Valve, Roost, Fishing Net, Andesite/Brass Depositor, Vendor, Bank Terminal, Salepoint, Repackager, Stock Ticker, Factory Gauge, Track Observer, Display Board, Extra Gauges blocks, Gigantic Cogwheel, Nixie Board, Headlamp.

# Quests
FTB Quests. 9 tabs, already created in game (order as in the book).

| Tab | Role | Unlocks |
|---|---|---|
| The Pack | description of the modpack and general info | start |
| Tips n' Tricks | non-essential items that help day to day (e.g. backpacks) | start |
| Debt | where installments are paid in product baskets (see "Debt: paid in products"), with a timer until the next due date | start |
| Prologue | start of the pack: first resources up to the first Create machine (Millstone), including the Andesite Machine | start |
| Andesite Age | automation and machines of the andesite era | Millstone (end of Prologue) |
| Copper Age | automation and machines of the copper era | end of Andesite Age |
| Brass Age | automation and machines of the foundry (alloys) and brass eras, in one tab; melting and casting are in Copper Age | Copper Machine |
| Fields ("Campos", ex Mystical Plants tab) | AgriCraft (crop sticks, crossbreeding, seed analyzer, journal, better seeds, clipper, trowel), compost and rich soil (by hand, then in bulk), field automation (harvester, plough, deployer planting, 256 wheat), rubber (Tree Tapper sap, raw rubber, sulfur dust, rubber), then copper-age irrigation after the rubber (pump, AgriCraft tanks and channels, sprinkler, iron crop sticks) and, at the end, Mystical Agriculture (Inferium seeds, coal and copper mutations). The Manure quest (gear) opens the Barn; the MA part needs the Barn quest "Essência de Inferium" | Prologue quest "Trigo" |
| Fields additions (done) | Seeds from the grass (wheat, carrot, potato); Depleted soil and Restoring the soil (checkmarks, soil mod still to be written); Tilled rich soil; Sealed Mechanism after Rubber (gear, opens Copper Age; Rubber is no longer a gear); Sprinkler head before the Sprinkler and Diluted bone meal after it; MA line: Inferium seeds now need Crossbreeding + Automatic field (no Barn dependency), Soil for Inferium, Iron, Essence into ore, Zinc, Gold, Tungsten, Diamond | — |
| Barn ("Celeiro", ex Animals tab) | animals, manure and Inferium Essence from farm animals (gates MA in Fields) | Fields quest "Esterco" |
| Village | village progression (residents, shops, Harvest Festival) and the Mayor's contracts; secondary | Prologue quest "O padeiro de Contrapeso" (sell 16 wheat to Bento, gear) |
| Challenges | hard or long side quests (e.g. collect every seed in the game) | start |

- In game the tab is spelled "Challanges"; fix to "Challenges".
- Kitchen and Fishing have no tab: their quests go into the era tabs, Tips n' Tricks or Challenges (see table below).
- Debt timer: FTB Quests has no countdown task; needs a script that reads the Serene Seasons date and shows the days left (quest description, title or chat message).

## Debt: paid in products

**Decided:** the Baron's installments are paid in **product baskets**, not coins. One installment at the end of each season (36 days); each basket asks for what the current phase teaches and what grows in that season. Coins stay only in the village (shops, Selling Bin, contracts).

| Done | # | Due | Phase | Basket (draft) | Why |
|---|---|---|---|---|---|
| | 1 | end of spring, year 1 | Prologue | 32 potatoes, 32 carrots, 16 baked potatoes | grass drops and the furnace; wheat only grows in autumn |
| | 2 | end of summer | Andesite | 32 tomatoes, 32 sugar (sugar cane in the millstone), 8 tomato sauce | first machines (millstone, mixer) and summer crops |
| | 3 | end of autumn | Copper | 64 wheat, 32 bread, 8 bottles of wine | first wheat harvest; the Copper era wine cellar |
| | 4 | end of winter | Foundry | 8 aged cheeses, 16 jams or preserves, 32 iron ingots | no harvest in winter: only stored food, plus foundry metal |
| | 5 | end of spring, year 2 | Brass | 256 baked potatoes, 64 bottles of vegetable oil, 32 Polished Rock Candy | potato line, oil press and the candy chain, all automated |
| | 6 | end of summer, year 2 | Brass | 128 tomato sauce, 256 sugar, 64 strawberry or melon jams | cooking at scale (mixer, Spout, Packager) |
| | 7 | end of autumn, year 2 | Brass | 512 wheat, 256 bread, 32 bottles of wine | full grain line: harvester, millstone, mixer, oven |
| | 8 | end of winter, year 2 | Brass | 64 aged cheeses, 128 preserves, 16 brass ingots, 8 Precision Mechanisms | stockpiled food plus the brass workshop |
| | 9 | end of spring, year 3 | Electric | 256 pumpkins and 256 corn (autumn crops) | out of season: only a greenhouse grows them |
| | 10 | end of summer, year 3 | Electric | 64 Supremium Essence, 32 Inductive Mechanisms | tier 5 MA and the electric workshop |
| | 11 | end of autumn, year 3 | Electric | 256 tomatoes and 256 strawberries (summer crops) | out of season again |
| | 12 | end of winter, year 3 | Electric | 512 fresh vegetables (any spring/summer crop), 8 Electric Machines | winter harvest from greenhouses; last installment |

| Done | Rule | Detail |
|---|---|---|
| | Vegetarian | every basket stays meat-free (see "Two paths") |
| | Late payment | the next basket grows by 50% ("interest"); needs a script |
| | Item IDs | to confirm: which wine (Create Winery or Hearth and Harvest), which cheese (Brewin' and Chewin'), tomato sauce from Farmer's Delight, jam/preserve tag |
| | Prologue quest 15 | "Primeira parcela" asks for basket 1 instead of 1 `numismatics:cog` |
| | Debt tab | one quest per installment (item tasks, consumed), still the source of truth; quest 15 depends on it |

## Where each topic goes
| Topic | Tab |
|---|---|
| Soil fertility and solid fertilizers (bone meal, manure, compost) | Prologue |
| AgriCraft crop sticks and seed analyzer | Prologue |
| Manual cooking (cutting board, cooking pot, first dishes) | Prologue |
| Selling Bin, first coins, Stagecoach | Prologue |
| Inferium from farm animals, Inferium seeds, first MA mutations (coal, copper) | Andesite Age |
| Fertilizer (new item), Create cooking automation (mixer, press) | Andesite Age |
| Liquid Fertilizer, sprinkler, rubber chain, Blaze Burner, melting and casting (Foundry Basin, iron rods, iron crop sticks, MA start) | Copper Age |
| Alloys in the Foundry Mixer, ore processing, brass and steel, metal mutations (iron, zinc, gold...) and essence → raw ore | Brass Age |
| Late mutations (diamond, emerald, tungsten), logistics, trains for the farm | Brass Age |
| Residents' questlines, Harvest Festival, Mayor's contracts (repeatable) | Village |
| Numismatics bank and card, Merchant Orders shops | Village |
| Backpacks, utility items, fishing gear | Tips n' Tricks |
| Collect every seed, every fish (Starcatcher + Hybrid Aquatic), every dish, max soil / max seed stats | Challenges |

## Prologue: The Inheritance
Quest titles and texts are player-facing, in Portuguese, written as notes from Anselmo's journal. Quest shapes: **hexagon** = story quest, **circle** = normal quest (chapter default), **gear** = opens another questline, **diamond** = challenge (default of Challenges). Secondary quests and the village (secondary) use circles too. Text colors: **green** (`&a`) = spoken lines, **gray** (`&7`) = written in the journal or a letter, default color for everything else. Tasks use real IDs; `<pack>:` marks new items whose final namespace is still open (see Priorities).

**Before building the tab:** tasks that accept "any hoe / any meal / any knife" need tags, and FTB Quests 1.21 only filters by tag with **FTB Filter System** (not in the pack). Either add it or use the specific items listed below.

| Done | # | Title | Text (journal) | Task | Reward |
|---|---|---|---|---|---|
| | 1 | A carta | "Se você está lendo isto, eu já não estou aí para explicar. O Barão vai cobrar, e vai cobrar caro. Guarde este caderno: está tudo aqui, das sementes às máquinas." | Checkmark (read the Baron's letter, given on first join) | — (the quest book itself is Anselmo's Journal) |
| | 2 | Ferramentas do avô | "Antes de qualquer máquina, enxada e faca. A faca corta legume, carne e, acredite, vai cortar engrenagem também." | Have 1 `minecraft:wooden_hoe` (or any hoe with Filter System) and 1 `farmersdelight:flint_knife` (or `#c:tools/knife`) | 8 `minecraft:wheat_seeds` |
| | 3 | Primeiros sulcos | "Terra boa a gente faz com as próprias mãos. Are, plante e espere. Trigo é o começo de quase tudo por aqui." | Have 16 `minecraft:wheat` (not consumed) | 4 `minecraft:bone_meal` |
| | 4 | Terra cansada | "Cada colheita leva um pouco da força do chão. Quando a terra arada vira terra comum, ela está pedindo comida. Esterco resolve; farinha de osso ajuda pouco." | Have 4 `hearthandharvest:manure` | 1 `farmersdelight:organic_compost` |
| | 5 | Tábua e panela | "Comida de verdade precisa de duas coisas: uma tábua para cortar e uma panela para juntar tudo." | Have 1 `farmersdelight:cutting_board` and 1 `farmersdelight:cooking_pot` | — |
| | 6 | Primeira refeição | "Barriga vazia não levanta moinho. Faça uma sopa e coma sentado, pelo menos hoje." | Have 1 `farmersdelight:vegetable_soup` (or `#farmersdelight:meals` with Filter System) | — |
| | 7 | Seiva | "Os abetos do morro choram seiva quando a gente pede com jeito. Ela vira xarope na cozinha e, mais tarde, borracha nas máquinas." | Have 1 `hearthandharvest:tree_tapper` and 1 `hearthandharvest:sap_bucket` | — |
| | 8 | Cola de amido | "Trigo e água fazem uma cola que segura quase qualquer coisa. Fica feio e segura bem." | Have 4 `kubejs:plant_glue` | — |
| | 9 | Liga improvisada | "Andesito colado segura as pontas por um tempo. Quando tiver um misturador, faça a liga direito." | Have 4 `kubejs:makeshift_andesite_alloy` | — |
| | 10 | Primeiro movimento | "Um eixo, uma engrenagem e uma manivela. Gire e sinta: é assim que tudo começa a se mexer." | Have 1 `create:shaft`, 1 `create:cogwheel`, 1 `create:hand_crank` | — |
| | 11 | Roda d'água | "O riacho trabalha de graça, dia e noite. Ponha uma roda nele e deixe a água girar por você." | Have 1 `create:water_wheel` | — |
| | 12 | Suportes de cultivo | "Duas plantas lado a lado, um suporte vazio no meio, e às vezes nasce uma semente melhor que as duas. Paciência é adubo também." | Have 4 `agricraft:wooden_crop_sticks` and 1 `agricraft:seed_analyzer` | 1 `agricraft:magnifying_glass` |
| | 13 | Caixa de venda | "O que sobra vira moeda. Ponha a produção na caixa e espere o pagamento." | Have 1 `selling_bin:selling_bin`, then have 1 `numismatics:spur` | 4 `numismatics:spur` |
| | 14 | A diligência | "Contrapeso fica do outro lado da estrada. Pegue a diligência e conheça a vila; o povo de lá precisa da gente tanto quanto a gente precisa deles." | Dimension task: enter the village dimension (ID still to be defined) | unlocks the village tabs |
| | 15 | Primeira parcela | "O escritório do Barão fica na praça. Pague antes do fim da primavera, ou os juros vêm junto." | Deliver basket 1 (32 potatoes, 32 carrots, 16 baked potatoes; consumed) at the Baron's office (Task Screen); was 1 `numismatics:cog` | — (the Debt tab is the source of truth) |
| | 16 | Mecanismo Cinético | "Faca, engrenagem, liga e um pedaço de tronco. Este é o coração das minhas máquinas. Faça o primeiro com as mãos." | Have 1 `<pack>:kinetic_mechanism` | — |
| | 17 | Carcaça de andesito | "Liga no tronco descascado e pronto: uma carcaça. Toda máquina boa começa com uma caixa firme em volta." | Have 1 `create:andesite_casing` | — |
| | 18 | Máquina de Andesito | "Oito mecanismos em volta de uma carcaça. Dá trabalho, eu sei. Mas dessa base saem todas as máquinas desta época." | Have 1 `<pack>:andesite_machine` | — |
| | 19 | O moinho | "Era isso que eu queria terminar. Com um moinho, o trigo vira farinha sem precisar de braço, e a padaria do Bento volta a ter o que assar." | Have 1 `create:millstone` | unlocks the Andesite Age tab |

Notes:
- The Prologue ends at the **Millstone** (first Create machine). Since the Millstone is Andesite Machine + stone, the Prologue also covers the Andesite Casing and the Andesite Machine (quests 17–18). Quest 19 unlocks the Andesite Age tab; the installment no longer unlocks anything.
- Quest 15 mirrors the first installment of the Debt tab; the Debt tab is the source of truth and quest 15 depends on it.
- **The chapter is a hub ("What's left").** Each branch teaches the basics and ends in a gear that opens another questline:
  - Wheat → Fields
  - Board and Knife → Kitchen
  - Makeshift Alloy → Andesite Age
  - Talk to the Mayor About Betsy → Barn
  - Homemade Bread → Town and Mayor Contracts
  - The ore line (Copper → Grind before smelting → Nuggets → Copper pickaxe → Iron) teaches that iron needs a copper pickaxe and that the furnace only gives 3 nuggets.
  - Open from the start, no gate: Tips n' Tricks, The Pack, Rusty Store, Challenges and Debt.
  - Automation Timeline opens from inside the Andesite Age, not from the hub.
  - Story quests in the hub (hexagon): **Anselmo's grave** after Tools in the shed (hand in 1 flower, `#minecraft:small_flowers`) and **The Baron's visit** after Homemade bread (checkmark; the Baron sets the first installment for the end of spring).
