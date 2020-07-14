const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "bubble_input" : {"uuid":uuidv4(), "title": "String for testing","content": "String for testing","emoji": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_bubble", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_bubble_result = await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await s.consistency()
    console.log('create_bubble_result', create_bubble_result)
    const read_bubble_result = await alice.call("bubbles", "bubbles", "read_bubble", {"id": create_bubble_result.Ok.id, "created_at": create_bubble_result.Ok.createdAt})
    t.deepEqual(create_bubble_result, read_bubble_result)
  })

  scenario("rebase_bubble", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_bubble_result = await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await s.consistency()
    console.log('create_bubble_result', create_bubble_result)
    const read_bubble_result = await alice.call("bubbles", "bubbles", "rebase_bubble", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_bubble_result.Ok.id, "created_at": create_bubble_result.Ok.createdAt})
    await s.consistency()
    const list_bubbles_result_1 = await alice.call("bubbles", "bubbles", "list_bubbles", {"base": "testbase"})
    t.deepEqual(list_bubbles_result_1.Ok.length, 0)
    const list_bubbles_result_2 = await alice.call("bubbles", "bubbles", "list_bubbles", {"base": "testbase_rebase"})
    t.deepEqual(list_bubbles_result_2.Ok.length, 1)  
  })

  scenario("list_bubbles", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("bubbles", "bubbles", "create_bubble", createParams)
	  await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await s.consistency()
    const list_bubbles_result = await alice.call("bubbles", "bubbles", "list_bubbles", {"base": "testbase"})
    t.deepEqual(list_bubbles_result.Ok.length, 4)
  })

  scenario("author-only-update-bubble", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_bubble_result = await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    console.log('create_bubble_result', create_bubble_result)
    const update_bubble_result = await bob.call("bubbles", "bubbles", "update_bubble", {"id": create_bubble_result.Ok.id, "created_at": create_bubble_result.Ok.createdAt, "address": create_bubble_result.Ok.address, "bubble_input" : {"uuid": create_bubble_result.Ok.uuid, "title": "Update string for testing","content": "Update string for testing","emoji": "Update string for testing"}})
    t.deepEqual(JSON.parse(update_bubble_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
  })

  scenario("author-only-delete-bubble", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const createNoteResult = await alice.call("bubbles", "bubbles", "create_bubble", createParams)
    await s.consistency()
    const listNotesResult = await alice.call("bubbles", "bubbles", "list_bubbles", {"base": "testbase"})
    t.deepEqual(listNotesResult.Ok.length, 1)
    const deleteResult = await bob.call("bubbles", "bubbles", "delete_bubble", { "base": "testbase", "id": createNoteResult.Ok.id, "created_at": createNoteResult.Ok.createdAt, "address": createNoteResult.Ok.address })
    t.deepEqual(JSON.parse(deleteResult.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to delete' })
    const listNotesResult2 = await alice.call("bubbles", "bubbles", "list_bubbles", {"base": "testbase"})
    t.deepEqual(listNotesResult2.Ok.length, 1)
  })

}