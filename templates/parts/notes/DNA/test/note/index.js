const { v4: uuidv4 } = require('uuid')

module.exports = (scenario, conductorConfig) => {
  scenario("create_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title first note", "content": "Content", "order": 1}})
    await s.consistency()
    console.log('create_note_result', create_note_result)
    const read_note_result = await alice.call("notes", "notes", "read_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt})
    t.deepEqual(create_note_result, read_note_result)
    t.deepEqual(read_note_result.Ok.title, 'Title first note')
    t.deepEqual(read_note_result.Ok.content, 'Content')
  })

  scenario("rebase_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title first note", "content": "Content", "order": 1}})
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
    await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title first note", "content": "Content", "order": 1}})
	  await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title second note", "content": "Content", "order": 1}})
    await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title third note", "content": "Content", "order": 1}})
    await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"uuid":uuidv4(), "title":"Title fourth note", "content": "Content", "order": 1}})
    await s.consistency()
    const list_notes_result = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result.Ok.length, 4)
  })

