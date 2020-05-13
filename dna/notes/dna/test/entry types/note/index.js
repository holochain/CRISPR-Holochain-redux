const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title": "String for testing","content": "String for testing","order": 0}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", createParams)
    await s.consistency()
    console.log('create_note_result', create_note_result)
    const read_note_result = await alice.call("notes", "notes", "read_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt})
    t.deepEqual(create_note_result, read_note_result)
  })

  scenario("rebase_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", createParams)
    await s.consistency()
    console.log('create_note_result', create_note_result)
    const read_note_result = await alice.call("notes", "notes", "rebase_note", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt})
    await s.consistency()
    const list_notes_result_1 = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result_1.Ok.length, 0)
    const list_notes_result_2 = await alice.call("notes", "notes", "list_notes", {"base": "testbase_rebase"})
    t.deepEqual(list_notes_result_2.Ok.length, 1)  
  })

  scenario("list_notes", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("notes", "notes", "create_note", createParams)
	  await alice.call("notes", "notes", "create_note", createParams)
    await alice.call("notes", "notes", "create_note", createParams)
    await alice.call("notes", "notes", "create_note", createParams)
    await s.consistency()
    const list_notes_result = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result.Ok.length, 4)
  })

  scenario("anyone-update-note", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", createParams)
    const update_note_result = await alice.call("notes", "notes", "update_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt, "address": create_note_result.Ok.address, "note_input" : {"uuid": create_note_result.Ok.uuid, "title":"Updated title first note", "content": "Content", "order": 1}})
    await s.consistency()
    const read_note_result = await alice.call("notes", "notes", "read_note", {"id": update_note_result.Ok.id, "created_at": update_note_result.Ok.createdAt})
    t.deepEqual(update_note_result, read_note_result)

    const update_note_result_2 = await bob.call("notes", "notes", "update_note", {"id": update_note_result.Ok.id, "created_at": update_note_result.Ok.createdAt, "address": update_note_result.Ok.address, "note_input" : {"uuid": update_note_result.Ok.uuid, "title":"Updated again title first note", "content": "Content", "order": 1}})
    await s.consistency()
    const read_note_result_2 = await alice.call("notes", "notes", "read_note", {"id": update_note_result_2.Ok.id, "created_at": update_note_result_2.Ok.createdAt})
    t.deepEqual(update_note_result_2, read_note_result_2)
  })

  scenario("anyone-delete-note", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", createParams)
    await s.consistency()
    const list_notes_result = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result.Ok.length, 1)
    await bob.call("notes", "notes", "delete_note", {"base": "testbase", "id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt, "address": create_note_result.Ok.address })
    await s.consistency()
    const list_notes_result_2 = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result_2.Ok.length, 0)
  })

}