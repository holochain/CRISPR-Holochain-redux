const { v4: uuidv4 } = require('uuid')
const fs = require('fs');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

const createParams = {"base": "testbase", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": "String for testing","value": base64_encode('/Users/philipbeadle/holochain/CRISPR/dna/personalinformation/dna/test/entry types/personafield/assets/philip.beadle.png')}}
module.exports = (scenario, conductorConfig) => {
  scenario.only("create_personafield", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_personafield_result = await alice.call("personafields", "personafields", "create_personafield", createParams)
    console.log('create_personafield_result', create_personafield_result)
    await s.consistency()
    console.log('create_personafield_result', create_personafield_result)
    const read_personafield_result = await alice.call("personafields", "personafields", "read_personafield", {"id": create_personafield_result.Ok.id, "created_at": create_personafield_result.Ok.createdAt})
    t.deepEqual(create_personafield_result, read_personafield_result)
  })

  scenario("rebase_personafield", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_personafield_result = await alice.call("personafields", "personafields", "create_personafield", createParams)
    await s.consistency()
    console.log('create_personafield_result', create_personafield_result)
    const read_personafield_result = await alice.call("personafields", "personafields", "rebase_personafield", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_personafield_result.Ok.id, "created_at": create_personafield_result.Ok.createdAt})
    await s.consistency()
    const list_personafields_result_1 = await alice.call("personafields", "personafields", "list_personafields", {"base": "testbase"})
    t.deepEqual(list_personafields_result_1.Ok.length, 0)
    const list_personafields_result_2 = await alice.call("personafields", "personafields", "list_personafields", {"base": "testbase_rebase"})
    t.deepEqual(list_personafields_result_2.Ok.length, 1)  
  })

  scenario("list_personafields", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("personafields", "personafields", "create_personafield", createParams)
	  await alice.call("personafields", "personafields", "create_personafield", createParams)
    await alice.call("personafields", "personafields", "create_personafield", createParams)
    await alice.call("personafields", "personafields", "create_personafield", createParams)
    await s.consistency()
    const list_personafields_result = await alice.call("personafields", "personafields", "list_personafields", {"base": "testbase"})
    t.deepEqual(list_personafields_result.Ok.length, 4)
  })

  scenario("anyone-update-personafield", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_personafield_result = await alice.call("personafields", "personafields", "create_personafield", createParams)
    const update_personafield_result = await alice.call("personafields", "personafields", "update_personafield", {"id": create_personafield_result.Ok.id, "created_at": create_personafield_result.Ok.createdAt, "address": create_personafield_result.Ok.address, "personafield_input" : {"uuid": create_personafield_result.Ok.uuid, "fieldsFieldId": "Update string for testing","value": "Update string for testing"}})
    await s.consistency()
    const read_personafield_result = await alice.call("personafields", "personafields", "read_personafield", {"id": update_personafield_result.Ok.id, "created_at": update_personafield_result.Ok.createdAt})
    t.deepEqual(update_personafield_result, read_personafield_result)

    const update_personafield_result_2 = await bob.call("personafields", "personafields", "update_personafield", {"id": update_personafield_result.Ok.id, "created_at": update_personafield_result.Ok.createdAt, "address": update_personafield_result.Ok.address, "personafield_input" : {"uuid": update_personafield_result.Ok.uuid, "fieldsFieldId": "Update string for testing","value": "Update string for testing"}})
    await s.consistency()
    const read_personafield_result_2 = await alice.call("personafields", "personafields", "read_personafield", {"id": update_personafield_result_2.Ok.id, "created_at": update_personafield_result_2.Ok.createdAt})
    t.deepEqual(update_personafield_result_2, read_personafield_result_2)
  })

  scenario("anyone-delete-personafield", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_personafield_result = await alice.call("personafields", "personafields", "create_personafield", createParams)
    await s.consistency()
    const list_personafields_result = await alice.call("personafields", "personafields", "list_personafields", {"base": "testbase"})
    t.deepEqual(list_personafields_result.Ok.length, 1)
    await bob.call("personafields", "personafields", "delete_personafield", {"base": "testbase", "id": create_personafield_result.Ok.id, "created_at": create_personafield_result.Ok.createdAt, "address": create_personafield_result.Ok.address })
    await s.consistency()
    const list_personafields_result_2 = await alice.call("personafields", "personafields", "list_personafields", {"base": "testbase"})
    t.deepEqual(list_personafields_result_2.Ok.length, 0)
  })

}