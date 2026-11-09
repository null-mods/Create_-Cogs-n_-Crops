# Priorities (needs a new world)
Settle these before creating the **final world**. Test worlds can be thrown away until then.

| Done | Priority | Why |
|---|---|---|
| | Final IDs and namespace of every new item/block (mechanisms, machines, fertilizer, liquid fertilizer...), and whether each lives in KubeJS or the Java addon. Done for the materials: `kubejs:plant_glue`, `makeshift_andesite_alloy`, `raw_rubber`, `rubber`, `sulfur_dust`, `torn_journal_page` | changing an ID later deletes those items from existing worlds |
| | Ores: turn off Inferium Ore (`mysticalagriculture-common.toml` → `generateInferiumOre`, now `true`); decide on Prosperity Ore (now `true`); Soulstone only spawns in the Nether | ore generation only applies to unexplored chunks |
| | Ores: keep Sulfur Caves on (`vanillabackport-common.toml` → `has_sulfur_caves = true`); wolframite in deepslate already done | sulfur source; biomes only change in new chunks |
| | Game start: starting farm with half-built machines, spawn point, letter and journal given on first join | only happens when the world is created / first joined |
| | Starting season (`starting_sub_season = 1`) | Serene Seasons only applies it to new worlds |
| | Village: builds, shops, Order Boards and Trade Crates (Merchant Orders), vendors, Mayor's contract block | the dimension can be added later, but the content would have to be placed by hand |
| | Final mod list (removing a mod deletes its blocks from the world; disabling only recipes is safe) | removing mods with placed blocks breaks existing worlds |

## Scope changes
| Done | Change | Detail |
|---|---|---|
| X | **Era 5 removed** (Create Electro Energetics left the pack; its leftover configs deleted) | 4 eras now: Andesite, Copper, Foundry, Brass. Brass Machine is the top tier. Inductive Mechanism, Electric Machine and the era 5 machine table were dropped from this file |
| X | Clean up `alloys_without_ores.js` (server and client) | still references `electroenergetics:electrum_wire` and `electrum_wire_spool`; harmless now, remove when scripting |
| | **Village trip by Stagecoach, always** (Feelix's Stagecoach) | no train to the village at any point. Coach stops at the farm and in the village; check if the fare can be Numismatics coins (mod allows XP or items) |
| | Trains | Create trains stay in era 4 for farm logistics only (not for reaching the village) |
| | Fishing (Starcatcher + Hybrid Aquatic) | collectible fish, rods, aquarium, fisherman's hat: material for Joca's questline and fish sales |
| | Tom's Livestock Overhaul | genetics for sheep, chickens, cows, pigs, wolves; animals stay vanilla, so Inferium from farm animals still works. Test overlap with Salt's Animal Farm |
| X | **Bountiful replaced by Merchant Orders** (Bountiful and Create: Numismatic Bounties left the pack; `config/bountiful/` deleted) | the village sales channel ("one Bountiful board per shop") moves to Merchant Orders |
| | Merchant Orders: Order Board | catalog of villager trades grouped in 5 tiers (Novice to Master), unlocked by XP thresholds (`TIER_XP_THRESHOLDS`); purchases arrive in an Order Sack |
| | Merchant Orders: Trade Crate | **remove it.** Checked in the bytecode (`TradeCrateValuation`): payouts are hardcoded — emeralds, plus items from vanilla tags (saplings, planks, piglin food, coals), fallbacks bone meal / oak planks / bread / coal, and experience bottles. No config or tag can turn them into coins |
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
| | Sap Extractor: static housing | `mechanical_drill` (attached to a block, driven from the back) + `tree_tapper` (spout and bucket) |
| | Sap Extractor: rotating blade (separate part, for animation) | rubber tapper's knife (spiral cut in the bark); Mechanical Drill head for the fitting |
| | Sap Extractor: item model | block model in item pose, like Create's items |
| | Sap Extractor: Ponder scene | Ponder scenes of the Mechanical Drill and the Spout |

# Recipes

**Status**: `Done` = script exists in `kubejs/` (not yet tested in game). Empty = to do.

## Already scripted
| Done | Change | Script |
|---|---|---|
| X | Ore, raw ore and crushed ore in furnace/blast furnace give **3 nuggets** instead of 1 ingot (iron, gold, copper, zinc, tungsten) | `server_scripts/ores_on_furnace.js` |
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
| X | Plant Glue (`kubejs:plant_glue`) | crafting: 2 wheat + water bucket | 2 |
| X | Plant Glue | Mixer: 1 wheat + 100 mB water | 2 |
| X | Makeshift Andesite Alloy (`kubejs:makeshift_andesite_alloy`) | crafting: 2 andesite + 2 Plant Glue (diagonal) | 1 |
| X | Raw Rubber (`kubejs:raw_rubber`) | Mixer: 250 mB sap (`hearthandharvest:sap`) | 1 |
| X | Raw Rubber | Compacting: 250 mB water + 4 vines | 1 |
| X | Raw Rubber | Compacting: 250 mB water + 4 `#flowers` | 1 |
| X | Sulfur Dust (`kubejs:sulfur_dust`, tags `c:dusts`, `c:dusts/sulfur`) | Crushing: `sulfur` → 2 + 50% chance of 2 more; Milling: `sulfur` → 2 | 2–4 |
| X | Rubber (`kubejs:rubber`) | heated Mixer: Raw Rubber + Sulfur Dust | 1 |
| X | Torn Journal Page (`kubejs:torn_journal_page`) | none (story item, given by quests) | — |
| | Kinetic Mechanism (manual) | crafting: knife (`#c:tools/knife`, kept with damage) + cogwheel + andesite alloy + log | 1 |
| | Kinetic Mechanism (automated, era 4) | sequenced assembly on wooden slab: deploy andesite alloy, deploy andesite alloy, deploy knife | 1 |
| | Sealed Mechanism | crafting: Rubber + Kinetic Mechanism + Rubber (row) | 1 |
| | Incomplete Refractory Mechanism | crafting: Sealed Mechanism + refractory mortar + graphite | 1 |
| | Refractory Mechanism | sequenced assembly: Spout 1000 mB lava, Spout 1000 mB lava, Press | 1 |
| | Andesite Machine | Andesite Casing surrounded by 8 Kinetic Mechanisms | 1 |
| | Copper Machine | Copper Casing surrounded by 8 Sealed Mechanisms | 1 |
| | Foundry Machine | Industrial Iron Block surrounded by 8 Refractory Mechanisms | 1 |
| | Brass Machine | Brass Casing surrounded by 8 Precision Mechanisms | 1 |
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
| | Iron, gold, copper essence | `essence/minecraft/{iron,gold,copper}_ingot`: 8 essence → **4 raw ore** instead of 4 ingots |
| | Zinc essence | `essence/common/zinc_ingot`: 8 essence → **4 `raw_zinc`** |
| | Tungsten seed (new) | create with MysticalCustomization; 8 essence → 4 `raw_tungsten` |
| X | Sulfur seed | add Sulfur Dust to `c:dusts/sulfur` (the MA crop only turns on when this tag has an item) |
| | Year-round growth | add `#mysticalagriculture:crops` to `sereneseasons:year_round_crops` |
| | Active seeds | iron, copper, gold, zinc, tungsten, coal, redstone, lapis lazuli, nether quartz, diamond, emerald, sulfur |
| | Disable every other crop | alloys (brass, steel, bronze, invar, constantan, electrum, rose gold...), Nether/End (blaze, ghast, wither skeleton, netherite, nether, end, enderman, glowstone, basalt...), mobs, rubber |

## AgriCraft

| Done | Change | Detail |
|---|---|---|
| | Normal crops | AgriCraft optional: breed to improve seeds; normal planting stays |
| | Mystical Agriculture | resource seeds only by mutation; Inferium stays plantable normally and is the root of the tree |
| | Plants in AgriCraft | vanilla, Farmer's Delight, Croptopia, Hearth and Harvest, Mystical Agriculture (check if JSON plant definitions are needed) |
| | Crop sticks and seed analyzer | era 0 (no gate) |
| | Irrigation (tanks, channels, sprinklers) | era 2: Copper Machine + X (to be defined) |
| | Test: Serene Seasons | do season rules still apply to crops on crop sticks? |
| | Test: mutation format | check AgriCraft Reloaded mutation/condition JSON and that it recognises MA plants |

### MA mutation tree
Each mutation needs the **resource block under the crop sticks**. Once obtained, the seed multiplies without it. No parent pair repeats.

| Done | Seed | Parents | Block below |
|---|---|---|---|
| | Coal | Inferium × Inferium | coal block |
| | Copper | Inferium × Coal | copper block |
| | Sulfur | Coal × Coal | `sulfur` (Vanilla Backport) |
| | Iron | Coal × Copper | iron block |
| | Redstone | Iron × Coal | redstone block |
| | Zinc | Copper × Iron | `zinc_block` |
| | Nether Quartz | Iron × Sulfur | quartz block |
| | Lapis Lazuli | Redstone × Copper | lapis block |
| | Gold | Iron × Zinc | gold block |
| | Tungsten | Zinc × Gold | `tungsten_block` (foundry only, so it comes after era 3) |
| | Diamond | Gold × Lapis Lazuli | diamond block |
| | Emerald | Gold × Nether Quartz | emerald block |

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
| | Fertilizer (new item) | Mixer: manure + compost + Sulfur Dust; +10  |
| | Liquid Fertilizer (new fluid) | Mixer: Fertilizer + 1000 mB water; +1 per sprinkler pass  |
| | Automation | solid: Deployer right-click; liquid: sprinkler from Create: Things and Misc 4.1.1 |
| | Sprinkler mixin | its tank only accepts `diluted_bonemeal` (hardcoded). Mixin: accept Liquid Fertilizer too; spraying it adds +1 fertility to tracked soil in its 5x5 area; diluted bonemeal growth must not work on coarse dirt. Pin the mod at 4.1.1 |
| | Other sprinklers | disable: remove recipe and hide `hearthandharvest:sprinkler` and `agricraft:sprinkler` (AgriCraft tanks and channels stay) |
| | Sprinkler era | proposal: era 2, Copper Machine + `sprinkler_head` (original recipe already uses copper casing) |
| | Jade | show fertility when looking at farmland |
| | Test | interaction with AgriCraft soil properties; Create plough creates farmland at 5 |

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

### Keep the original recipe
Chute, Clutch, Gearshift, Encased Chain Drive, Fluid Valve, Roost, Fishing Net, Andesite/Brass Depositor, Vendor, Bank Terminal, Salepoint, Repackager, Stock Ticker, Factory Gauge, Track Observer, Display Board, Extra Gauges blocks, Gigantic Cogwheel, Nixie Board, Headlamp.

# Quests
FTB Quests. 9 tabs, already created in game (order as in the book).

| Tab | Role | Unlocks |
|---|---|---|
| The Pack | description of the modpack and general info | start |
| Tips n' Tricks | non-essential items that help day to day (e.g. backpacks) | start |
| Debt | where installments are paid, with a timer until the next due date | start |
| Prologue | start of the pack: first resources up to the first Create machine (Millstone), including the Andesite Machine | start |
| Andesite Age | automation and machines of the andesite era | Millstone (end of Prologue) |
| Copper Age | automation and machines of the copper era | end of Andesite Age |
| Brass Age | automation and machines of the metallurgy (foundry) and brass eras, in one tab | Copper Machine |
| Village | village progression (residents, shops, Harvest Festival) and the Mayor's contracts | first Stagecoach trip |
| Challenges | hard or long side quests (e.g. collect every seed in the game) | start |

- In game the tab is spelled "Challanges"; fix to "Challenges".
- Kitchen and Fishing have no tab: their quests go into the era tabs, Tips n' Tricks or Challenges (see table below).
- Debt timer: FTB Quests has no countdown task; needs a script that reads the Serene Seasons date and shows the days left (quest description, title or chat message).

## Where each topic goes
| Topic | Tab |
|---|---|
| Soil fertility and solid fertilizers (bone meal, manure, compost) | Prologue |
| AgriCraft crop sticks and seed analyzer | Prologue |
| Manual cooking (cutting board, cooking pot, first dishes) | Prologue |
| Selling Bin, first coins, Stagecoach | Prologue |
| Inferium from farm animals, Inferium seeds, first MA mutations (coal, copper) | Andesite Age |
| Fertilizer (new item), Create cooking automation (mixer, press) | Andesite Age |
| AgriCraft irrigation, Liquid Fertilizer, sprinkler, rubber chain | Copper Age |
| Foundry, ore processing, brass and steel, metal mutations (iron, zinc, gold...) and essence → raw ore | Brass Age |
| Late mutations (diamond, emerald, tungsten), logistics, trains for the farm | Brass Age |
| Residents' questlines, Harvest Festival, Mayor's contracts (repeatable) | Village |
| Numismatics bank and card, Merchant Orders shops | Village |
| Backpacks, utility items, fishing gear | Tips n' Tricks |
| Collect every seed, every fish (Starcatcher + Hybrid Aquatic), every dish, max soil / max seed stats | Challenges |

## Prologue: The Inheritance
Quest titles and texts are player-facing, in Portuguese, written as notes from Anselmo's journal. Tasks use real IDs; `<pack>:` marks new items whose final namespace is still open (see Priorities).

**Before building the tab:** tasks that accept "any hoe / any meal / any knife" need tags, and FTB Quests 1.21 only filters by tag with **FTB Filter System** (not in the pack). Either add it or use the specific items listed below.

| Done | # | Title | Text (journal) | Task | Reward |
|---|---|---|---|---|---|
| | 1 | A carta | "Se você está lendo isto, eu já não estou aí para explicar. O Barão vai cobrar, e vai cobrar caro. Guarde este caderno: está tudo aqui, das sementes às máquinas." | Checkmark (read the Baron's letter, given on first join) | Anselmo's Journal (Patchouli book) |
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
| | 15 | Primeira parcela | "O escritório do Barão fica na praça. Pague antes do fim da primavera, ou os juros vêm junto." | Deliver 1 `numismatics:cog` (consumed) at the Baron's office (Task Screen) | — (the Debt tab is the source of truth) |
| | 16 | Mecanismo Cinético | "Faca, engrenagem, liga e um pedaço de tronco. Este é o coração das minhas máquinas. Faça o primeiro com as mãos." | Have 1 `<pack>:kinetic_mechanism` | — |
| | 17 | Carcaça de andesito | "Liga no tronco descascado e pronto: uma carcaça. Toda máquina boa começa com uma caixa firme em volta." | Have 1 `create:andesite_casing` | — |
| | 18 | Máquina de Andesito | "Oito mecanismos em volta de uma carcaça. Dá trabalho, eu sei. Mas dessa base saem todas as máquinas desta época." | Have 1 `<pack>:andesite_machine` | — |
| | 19 | O moinho | "Era isso que eu queria terminar. Com um moinho, o trigo vira farinha sem precisar de braço, e a padaria do Bento volta a ter o que assar." | Have 1 `create:millstone` | unlocks the Andesite Age tab |

Notes:
- The Prologue ends at the **Millstone** (first Create machine). Since the Millstone is Andesite Machine + stone, the Prologue also covers the Andesite Casing and the Andesite Machine (quests 17–18). Quest 19 unlocks the Andesite Age tab; the installment no longer unlocks anything.
- Quest 15 mirrors the first installment of the Debt tab; the Debt tab is the source of truth and quest 15 depends on it.
