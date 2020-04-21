module.exports = (scenario, conductorConfig) => {
  scenario("create_note", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Title first note", "content":"Content first note"}})
    await s.consistency()
    console.log(create_note_result)
    const read_note_result = await alice.call("notes", "notes", "read_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt})
    t.deepEqual(create_note_result, read_note_result)
    t.deepEqual(read_note_result.Ok.title, 'Title first note')
    t.deepEqual(read_note_result.Ok.content, 'Content first note')
  })

  scenario("list_notes", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Title first note", "content":"Content first note"}})
    await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Title second note", "content":"Content second note"}})
    await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Title third note", "content":"Content third note"}})
    await alice.call("notes", "notes", "create_note", {"note_input" : {"title":"Title fourth note", "content":"Content fourth note"}})
    await s.consistency()
    const result = await alice.call("notes", "notes", "list_notes", {})
    t.deepEqual(result.Ok.length, 4)
  })


