const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "event_input" : {"uuid":uuidv4(), "title": "String for testing","location": "String for testing","order": 0}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_event", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_event_result = await alice.call("events", "events", "create_event", createParams)
    await s.consistency()
    console.log('create_event_result', create_event_result)
    const read_event_result = await alice.call("events", "events", "read_event", {"id": create_event_result.Ok.id, "created_at": create_event_result.Ok.createdAt})
    t.deepEqual(create_event_result, read_event_result)
  })

  scenario("rebase_event", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_event_result = await alice.call("events", "events", "create_event", createParams)
    await s.consistency()
    console.log('create_event_result', create_event_result)
    const read_event_result = await alice.call("events", "events", "rebase_event", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_event_result.Ok.id, "created_at": create_event_result.Ok.createdAt})
    await s.consistency()
    const list_events_result_1 = await alice.call("events", "events", "list_events", {"base": "testbase"})
    t.deepEqual(list_events_result_1.Ok.length, 0)
    const list_events_result_2 = await alice.call("events", "events", "list_events", {"base": "testbase_rebase"})
    t.deepEqual(list_events_result_2.Ok.length, 1)  
  })

  scenario("list_events", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("events", "events", "create_event", createParams)
	  await alice.call("events", "events", "create_event", createParams)
    await alice.call("events", "events", "create_event", createParams)
    await alice.call("events", "events", "create_event", createParams)
    await s.consistency()
    const list_events_result = await alice.call("events", "events", "list_events", {"base": "testbase"})
    t.deepEqual(list_events_result.Ok.length, 4)
  })

  scenario("author-only-update-event", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_event_result = await alice.call("events", "events", "create_event", createParams)
    console.log('create_event_result', create_event_result)
    const update_event_result = await bob.call("events", "events", "update_event", {"id": create_event_result.Ok.id, "created_at": create_event_result.Ok.createdAt, "address": create_event_result.Ok.address, "event_input" : {"uuid": create_event_result.Ok.uuid, "title": "Update string for testing","location": "Update string for testing","order": 1}})
    t.deepEqual(JSON.parse(update_event_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
  })

  scenario("author-only-delete-event", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const createNoteResult = await alice.call("events", "events", "create_event", createParams)
    await s.consistency()
    const listNotesResult = await alice.call("events", "events", "list_events", {"base": "testbase"})
    t.deepEqual(listNotesResult.Ok.length, 1)
    const deleteResult = await bob.call("events", "events", "delete_event", { "base": "testbase", "id": createNoteResult.Ok.id, "created_at": createNoteResult.Ok.createdAt, "address": createNoteResult.Ok.address })
    t.deepEqual(JSON.parse(deleteResult.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to delete' })
    const listNotesResult2 = await alice.call("events", "events", "list_events", {"base": "testbase"})
    t.deepEqual(listNotesResult2.Ok.length, 1)
  })

}