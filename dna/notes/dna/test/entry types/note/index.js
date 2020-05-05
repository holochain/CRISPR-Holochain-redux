module.exports = (scenario, conductorConfig) => {
  scenario("create_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title first note", "content": "Content"}})
    await s.consistency()
    console.log('create_note_result', create_note_result)
    const read_note_result = await alice.call("notes", "notes", "read_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt})
    t.deepEqual(create_note_result, read_note_result)
    t.deepEqual(read_note_result.Ok.title, 'Title first note')
    t.deepEqual(read_note_result.Ok.content, 'Content')
  })

  scenario("list_notes", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title first note", "content": "Content"}})
	  await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title second note", "content": "Content"}})
   	await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title third note", "content": "Content"}})
	  await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title fourth note", "content": "Content"}})
    await s.consistency()
    const list_notes_result = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(list_notes_result.Ok.length, 4)
  })

  scenario("author-only-update-note", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title first note", "content": "Content"}})
    console.log('create_note_result', create_note_result)
    const update_note_result = await bob.call("notes", "notes", "update_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt, "address": create_note_result.Ok.address, "note_input" : {"title":"Updated title first note", "content": "Content"}})
    t.deepEqual(JSON.parse(update_note_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
  })

  scenario("author-only-delete-note", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const createNoteResult = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title first note", "content": "Content"}})
    await s.consistency()
    const listNotesResult = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(listNotesResult.Ok.length, 1)
    const deleteResult = await bob.call("notes", "notes", "delete_note", { "base": "testbase", "id": createNoteResult.Ok.id, "created_at": createNoteResult.Ok.createdAt, "address": createNoteResult.Ok.address })
    t.deepEqual(JSON.parse(deleteResult.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to delete' })
    const listNotesResult2 = await alice.call("notes", "notes", "list_notes", {"base": "testbase"})
    t.deepEqual(listNotesResult2.Ok.length, 1)
  })

}