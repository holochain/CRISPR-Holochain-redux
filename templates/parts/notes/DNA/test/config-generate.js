const { v4: uuidv4 } = require('uuid')
/// NB: The tryorama config patterns are still not quite stabilized.
/// See the tryorama README [https://github.com/holochain/tryorama]
/// for a potentially more accurate example
const path = require('path')

const { Orchestrator, Config, combine, singleConductor, localOnly, tapeExecutor } = require('@holochain/tryorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const notesDnaPath = path.join(__dirname, "../dist/dna.dna.json")
const tasksDnaPath = path.join(__dirname, "/Users/philipbeadle/holochain/CRISPR/dna/tasks/dna/dist/dna.dna.json")

const orchestrator = new Orchestrator({
  middleware: combine(
    // use the tape harness to run the tests, injects the tape API into each scenario
    // as the second argument
    tapeExecutor(require('tape')),

    // specify that all "players" in the test are on the local machine, rather than
    // on remote machines
    localOnly,

    // squash all instances from all conductors down into a single conductor,
    // for in-memory testing purposes.
    // Remove this middleware for other "real" network types which can actually
    // send messages across conductors
    // singleConductor,
  )
})

const notesDna = Config.dna(dnaPath, 'notes-test')
const tasksDna = Config.dna(tasksDnaPath, 'notes-test')

// const conductorConfig = Config.gen({notes: dna})
const conductorConfig = Config.gen({notes: notesDna}, {tasks: tasksDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Demo mode for Workflow Notes with Tasks", async (s, t) => {
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  let taskBase = await alice.call("notes", "notes", "create_note", {"base":"NotesDo", "note_input": {"uuid":uuidv4(), "title":"Set up 2 hour deep dive on CRISPR with community leaders.", "content":"Content for the note"}})
  await alice.call("tasks", "tasks", "create_task", {"base": taskBase.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Locate a Zoom room.", "done":"false"}})
  await alice.call("tasks", "tasks", "create_task", {"base": taskBase.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Invite enthusiastic peopole.", "done":"false"}})
  await alice.call("tasks", "tasks", "create_task", {"base": taskBase.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Demo script.", "done":"false"}})

  await alice.call("notes", "notes", "create_note", {"base":"NotesDoing", "note_input": {"uuid":uuidv4(), "title":"Stepper for add new entry", "content":"Content for the note"}})
  await alice.call("notes", "notes", "create_note", {"base":"NotesDo", "note_input": {"uuid":uuidv4(), "title":"Scale the zome model surface", "content":"Content for the note"}})
  await alice.call("notes", "notes", "create_note", {"base":"TasksDo", "note_input": {"uuid":uuidv4(), "title":"Get theme colours", "content":"Content for the note"}})
  await s.consistency()

  await bob.call("notes", "notes", "create_note", {"base":"TasksDo", "note_input": {"uuid":uuidv4(), "title":"Agent Id Link", "content":"Content for the note"}})
  await bob.call("notes", "notes", "create_note", {"base":"NotesDo", "note_input": {"uuid":uuidv4(), "title":"Entry type code viewer", "content":"Content for the note"}})
  await s.consistency()

  await phil.call("notes", "notes", "create_note", {"base":"TasksDoing", "note_input": {"uuid":uuidv4(), "title":"DNA Modeller toolbar", "content":"Content for the note"}})
  await phil.call("notes", "notes", "create_note", {"base":"NotesDoing", "note_input": {"uuid":uuidv4(), "title":"Show profile information on each installed app", "content":"Content for the note"}})
  await phil.call("notes", "notes", "create_note", {"base":"TasksDoing", "note_input": {"uuid":uuidv4(), "title":"Be able to workflowe any entry", "content":"Content for the note"}})
  await s.consistency()

  await lucy.call("notes", "notes", "create_note", {"base":"NotesDo", "note_input": {"uuid":uuidv4(), "title":"Finish off tasks", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"TasksDone", "note_input": {"uuid":uuidv4(), "title":"Deep dive", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"TasksDone", "note_input": {"uuid":uuidv4(), "title":"Another note", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"NotesDone", "note_input": {"uuid":uuidv4(), "title":"Awesome.", "content":"Content for the note"}})
  await s.consistency()
})

orchestrator.run()

