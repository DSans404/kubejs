Platform.mods.kubejs.name = "Create - Tech"

function item(path) {
    if (Array.isArray(path)) return "kubejs:item/" + path.join("/")
    else return "kubejs:item/" + path
}
function block(path) {
    if (Array.isArray(path))return "kubejs:block/" + path.join("/")
    else return "kubejs:block/" + path
}

function fluid(path) {
    if (Array.isArray(path)) return "kubejs:fluid/" + path.join("/")
    else return "kubejs:fluid/" + path
}

StartupEvents.registry("item", event => {

    //Processor
    let processors = ["Calculation", "Logic", "Engineering"]
    processors.forEach(name => {
        let id = name.toLowerCase()
        event.create("incomplete_" + id + "_processor", "create:sequenced_assembly")
        .texture(item(["processor", "incomplete_" + id + "_processor"]))
    })

    //Math
    let Numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    Numbers.forEach(id => {
        event.create("number_" + id).texture(item(["math", "number", "number_" + id])).glow(true)
    })
    let Operator = ["plus", "minus", "divide", "multiply"]
    Operator.forEach(id => {
        event.create(id).texture(item(["math", "operator", id])).glow(true)
    })
    let Casts = ["three", "eight", "plus", "minus", "divide", "multiply"]
    Casts.forEach(id => {
        event.create(id + "_cast").texture(item(["math", "cast", id + "_cast"])).unstackable()
    })
    event.create("nan").texture(item(["math", "nan"]))

    //Fern
    let fern = (type, color) => ({type: type, color: color})
    let Ferns = [fern("earth", 0x8FDB84), fern("ender", 0x00F9DE), fern("sky", 0xAC2EFC)]
    Ferns.forEach(fern => {
        let {type, color} = fern
        event.create(type + "slime_fern_leaf").texture(item(["fern", "slime_fern_leaf"])).color(0, color).displayName("Slimy Fern Leaf")
        event.create(type + "slime_fern_paste").texture(item(["fern", "slime_fern_paste"])).color(0, color).displayName("Slimy Fern Paste")
    })

    //Mechanism
    let mechanism = (name, rarity) => ({name: name, rarity: rarity})
    let Mechanisms = [mechanism("Kinetic"), mechanism("Sealed"), mechanism("Sturdy"), mechanism("Infernal", "uncommon"), mechanism("Inductive", "uncommon"), mechanism("Abstruse", "rare"),mechanism("Calculation", "rare")]
    Mechanisms.forEach(mechanism => {
        let {name, rarity} = mechanism
        let id = name.toLowerCase()
        event.create(id + "_mechanism").texture(item(["mechanism", id + "_mechanism"])).displayName(name + " Mechanism").rarity(rarity ? rarity : "common")
        event.create("incomplete_" + id + "_mechanism", "create:sequenced_assembly").texture(item(["mechanism", "incomplete", "incomplete_" + id + "_mechanism"])).displayName("Incomplete " + name + " Mechanism")
    })

    //Metal
    let Metals = ["Zinc", "Cobalt", "Calorite", "Desh", "Ostrum"]
    Metals.forEach(name => {
        let id = name.toLowerCase()
        event.create(id + "_dust").texture(item(["dust", id + "_dust"])).displayName(name + " Dust").tag("forge:dusts/" + id).tag("forge:dusts")
        id != "zinc" ? event.create("crushed_raw_" + id).texture(item(["crushed_raw_material", "crushed_raw_" + id])).displayName("Crushed Raw " + name).tag("create:crushed_raw_materials") : ""
    })

    //Radiant
    event.create("radiant_coil").texture(item("radiant_coil")).displayName("Radiant Induction Coil").glow(true)
    event.create("radiant_sheet").texture(item("radiant_sheet")).displayName("Radiant Sheet").glow(true)

    //Misc | Integration
    event.create("pipe_module_utility").texture(item(["pipe", "pipe_module_utility"])).displayName("Utility Pipe Module")
    event.create("pipe_module_tier_1").texture(item(["pipe", "pipe_module_tier_1"])).displayName("Brass Pipe Module")
    event.create("pipe_module_tier_2").texture(item(["pipe", "pipe_module_tier_2"])).displayName("Invar Pipe Module")
	event.create("pipe_module_tier_3").texture(item(["pipe", "pipe_module_tier_3"])).displayName("Enderium Pipe Module")

    event.create("circuit_scrap").texture(item("circuit_scrap")).displayName("Circuit Scrap")

    event.create("zinc_sheet").texture(item("zinc_sheet")).displayName("Zinc Sheet").tag("forge:plates/zinc").tag("forge:plates")

    event.create("sand_ball").texture(item("sand_ball")).displayName("Sand Ball").unstackable()
    event.create("rough_sand").texture(item("rough_sand")).displayName("Rough Sand")
    event.create("purified_sand").texture(item("purified_sand")).displayName("Purified Sand")
    event.create("silicon_compound").texture(item("silicon_compound")).displayName("Silicon Compound")

    event.create("coke_chunk").texture(item("coke_chunk")).displayName("Coke Chunk")
    event.create("incomplete_coke_chunk", "create:sequenced_assembly").texture(item("incomplete_coke_chunk")).displayName("Cut Coke")

    event.create("matter_plastics").texture(item("matter_plastics")).displayName("Matter Plastics")

    event.create("nickel_compound").texture(item("nickel_compound")).displayName("Nickel Compound")
    event.create("invar_compound", "create:sequenced_assembly").texture(item("invar_compound")).displayName("Unprocessed Invar Ingot")

    event.create("dye_entangled_singularity").texture(item("dye_entangled_singularity")).displayName("Chromatic Singularity").unstackable()

    event.create("chromatic_resonator").texture(item("chromatic_resonator")).displayName("Chromatic Resonator").maxDamage(512)

    event.create("flash_drive").texture(item("boot_medium")).displayName("Flash Drive").maxDamage(512)

    event.create("computation_matrix").parentModel(block("computation_matrix")).displayName("Computation Matrix").rarity("uncommon")
})

StartupEvents.registry("block", event => {

    //Casing
    let Casings = ["Enderium", "Zinc", "Invar", "Fluix"]
    Casings.forEach(name => {
        let id = name.toLowerCase()
        event.create(id + "_casing")
        .model(block(["casing", id + "_casing"]))
        .material("metal")
        .tagBlock("mineable/pickaxe").tagBlock("create:wrench_pickup")
        .requiresTool(true)
        .hardness(name != "Enderium" ? 3.0 : 4.0)
        .displayName(name != "Enderium" ? (name + " Casing") : "Ender Casing")
    })

    //Machine
    let machine = (name, layer) => ({name: name, layer: layer})
    let Machines = [machine("Andesite", "solid"), machine("Brass", "translucent"), machine("Copper", "cutout"), machine("Obsidian", "translucent"), machine("Zinc", "cutout"), machine("Enderium", "cutout")]
    Machines.forEach(machine => {
        let {name, layer} = machine
        let id = name.toLowerCase()
        let axe = ["Andesite", "Brass", "Copper"]
        event.create(id + "_machine")
        .model(block(["machine", id + "_machine"]))
        .material("lantern")
        .hardness(3.0)
        .tagBlock("mineable/pickaxe")
        .tagBlock("create:wrench_pickup")
        .requiresTool(true)
        .notSolid()
        .renderType(layer)
        .displayName(name + " Machine")
        .tagBlock(name != axe ? "" : "mineable/axe")
    })
})

StartupEvents.registry("fluid", event => {
    
    //Matrix
    event.create("raw_logic").stillTexture(fluid(["raw_logic", "raw_logic_still"])).flowingTexture(fluid(["raw_logic", "raw_logic_flowing"])).noBucket().displayName("Liquefied Logic (Unprocessed)")
    let number = (id, color) => ({id: id, color: color})
    let Numbers = [number("0", 0xCBE827), number("1", 0xAEE827), number("2", 0x68E827), number("3", 0x27E86E), number("4", 0x27E8B1),
        number("5", 0x27DEE8), number("6", 0x27B5E8), number("7", 0x2798E8), number("8", 0x2778E8), number("9", 0x2748E8)]
    Numbers.forEach(number => {
        let {id, color} = number
        event.create("number_" + id).stillTexture(fluid(["number", "number_still"])).flowingTexture(fluid(["number", "number_flowing"])).noBucket().color(color)
    })
    event.create("matrix").stillTexture(fluid(["matrix", "matrix_still"])).flowingTexture(fluid(["matrix", "matrix_flowing"])).noBucket().displayName("Liquefied Computation Matrix")

    //Metals
    let metal = (name, color) => ({name: name, color: color})
    let Metals = [metal("Calorite", 0x931d3b), metal("Desh", 0xC88448), metal("Ostrum", 0x6C4C59)]
    Metals.forEach(metal => {
        let {name, color} = metal
        let id = name.toLowerCase()
        event.create("molten_" + id).stillTexture(fluid(["molten_metal", "molten_metal_still"])).flowingTexture(fluid(["molten_metal", "molten_metal_flowing"])).color(color).displayName("Molten " + name).tag("tconstruct:molten_" + id).tag("forge:molten_" + id)
    })

    event.create("coke").stillTexture(fluid(["coke", "coke_still"])).flowingTexture(fluid(["coke", "coke_flowing"])).displayName("Coke")
    event.create("sky_stone").stillTexture(fluid(["sky_stone", "sky_stone_still"])).flowingTexture(fluid(["sky_stone", "sky_stone_flowing"])).displayName("Sky Stone")
    event.create("fine_sand").stillTexture(fluid(["fine_sand", "fine_sand_still"])).flowingTexture(fluid(["fine_sand", "fine_sand_flowing"])).displayName("Fine Sand")
    event.create("waste").stillTexture(fluid(["waste", "waste_still"])).flowingTexture(fluid(["waste", "waste_flowing"])).displayName("Waste")
})

ItemEvents.modification(event => {
    let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
    colors.forEach(element => {
        event.modify('ae2:' + element + '_paint_ball', item => {
            item.maxStackSize = 1
        })
    })
})