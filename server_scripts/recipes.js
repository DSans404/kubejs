var seed
var log = []

let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let AE2 = (id, x) => MOD("ae2", id, x)
let TE  = (id, x) => MOD("thermal", id, x)
let CR  = (id, x) => MOD("create", id, x)
let AP  = (id, x) => MOD("architects_palette", id, x)
let TC  = (id, x) => MOD("tconstruct", id, x)
let MC  = (id, x) => MOD("minecraft", id, x)
let KJ  = (id, x) => MOD("kubejs", id, x)

let donutCraft = (event, output, center, ring) => {
    return event.shaped(output, [
        'SSS',
        'SCS',
        'SSS'
    ], {
        C: center,
        S: ring,
    })
}

function ifiniDeploying(output, input, tool) {
    return {
        "type": "create:deploying",
        "ingredients": [
            Ingredient.of(input).toJson(),
            Ingredient.of(tool).toJson()
        ],
        "results": [
            Item.of(output).toJson()
        ],
        "keepHeldItem": true
    }
}

ServerEvents.recipes(event => {
    algalAndesite(event)    
})

function AndesiteThread(event) {
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: CR('crafting/materials/andesite_alloy') })
	event.remove({ id: CR('crafting/materials/andesite_alloy_from_zinc') })
	event.remove({ id: CR('mixing/andesite_alloy') })
	event.remove({ id: CR('mixing/andesite_alloy_from_zinc') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TC('compat/create/andesite_alloy_zinc') })
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })

    event.remove({ output: AP("algal_brick") })
    event.smelting(AP("algal_brick"), AP("algal_blend")).cookingTime(120).xp(0)
    event.remove({ output: AP("algal_blend") })

    event.shaped(AP("algal_blend", 4), [
        'SS',
        'AA'
    ], {
        S: MC("clay_ball"),
        A: [MC("kelp"), MC("seagrass")]
    })
    event.shaped(AP("algal_blend", 4), [
        'AA',
        'SS'
    ], {
        S: MC("clay_ball"),
        A: [MC("kelp"), MC("seagrass")]
    })

    event.shaped(CR("andesite_alloy", 2), [
        'SS',
        'AA'
    ], {
        S: MC("andesite"),
        A: AP("algal_brick")
    })
    event.shaped(CR("andesite_alloy", 2), [
        'AA',
        'SS'
    ], {
        S: MC("andesite"),
        A: AP("algal_brick")
    })

    event.recipes.create.mixing(AP('algal_blend', 2), [MC("clay_ball"), [MC("kelp"), MC("seagrass")]])
    event.recipes.create.mixing(CR('andesite_alloy', 2), [MC("andesite"), AP("algal_brick")])
}