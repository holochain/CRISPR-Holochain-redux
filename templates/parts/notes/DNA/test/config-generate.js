/// NB: The tryorama config patterns are still not quite stabilized.
/// See the tryorama README [https://github.com/holochain/tryorama]
/// for a potentially more accurate example
const path = require('path')

const { Orchestrator, Config, combine, singleConductor, localOnly, tapeExecutor } = require('@holochain/tryorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/dna.dna.json")

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

const dna = Config.dna(dnaPath, 'notes-test')
// const conductorConfig = Config.gen({notes: dna})
const conductorConfig = Config.gen({notes: dna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Generate config and key for Alice & Bob", async (s, t) => {
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  await alice.call("notes", "notes", "create_note", {"base":"demoAlice", "note_input": {"title":"Set up 2 hour deep dive on CRISPR with community leaders.", "content":"Content for the note"}})
  await alice.call("notes", "notes", "create_note", {"base":"demoAlice", "note_input": {"title":"Stepper for add new entry", "content":"Content for the note"}})
  await alice.call("notes", "notes", "create_note", {"base":"demoAlice", "note_input": {"title":"Scale the zome model surface", "content":"Content for the note"}})
  await alice.call("notes", "notes", "create_note", {"base":"demoAlice", "note_input": {"title":"Get theme colours", "content":"Content for the note"}})
  await s.consistency()

  await bob.call("notes", "notes", "create_note", {"base":"demoBob", "note_input": {"title":"Agent Id Link", "content":"Content for the note"}})
  await bob.call("notes", "notes", "create_note", {"base":"demoBob", "note_input": {"title":"Entry type code viewer", "content":"Content for the note"}})
  await s.consistency()

  await phil.call("notes", "notes", "create_note", {"base":"demoPhil", "note_input": {"title":"DNA Modeller toolbar", "content":"Content for the note"}})
  await phil.call("notes", "notes", "create_note", {"base":"demoPhil", "note_input": {"title":"Show profile information on each installed app", "content":"Content for the note"}})
  await phil.call("notes", "notes", "create_note", {"base":"demoPhil", "note_input": {"title":"Be able to workflowe any entry", "content":"Content for the note"}})
  await s.consistency()

  await lucy.call("notes", "notes", "create_note", {"base":"demoLucy", "note_input": {"title":"Finish off tasks", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"demoLucy", "note_input": {"title":"Deep dive", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"demoLucy", "note_input": {"title":"Another note", "content":"Content for the note"}})
  await lucy.call("notes", "notes", "create_note", {"base":"demoLucy", "note_input": {"title":"Awesome.", "content":"Content for the note"}})
  await s.consistency()
})

orchestrator.run()
