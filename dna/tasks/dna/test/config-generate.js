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

const dna = Config.dna(dnaPath, 'tasks-test')
// const conductorConfig = Config.gen({tasks: dna})
const conductorConfig = Config.gen({tasks: dna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Generate config and key for Alice & Bob", async (s, t) => {
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Set up 2 hour deep dive on CRISPR with community leaders.", "content":"Find out who creates invite and room\nScript out what to deep dive on"}})
  await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Stepper for add new entry", "content":"Setup- for existing"}})
  await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Scale the zome model surface", "content":"Set it up so the model fits exactly."}})
  await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Get theme colours", "content":"Use Holochain brand colours."}})
  await s.consistency()

  await bob.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Agent Id Link", "content":"Add list tasks by agent"}})
  await bob.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Entry type code viewer", "content":"decide on DNA pattern to use for Notes hApp."}})
  await s.consistency()

  await phil.call("tasks", "tasks", "create_task", {"task_input" : {"title":"DNA Modeller toolbar", "content":"Add the buttons"}})
  await phil.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Show profile information on each installed app", "content":"Makes it easy to see where your personal data is."}})
  await phil.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Be able to workflowe any entry", "content":"Worflow as a feature you add to existing app."}})
  await s.consistency()

  await lucy.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Lucy Title first task", "content":"Content first task"}})
  await lucy.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Lucy Title second task", "content":"Content second task"}})
  await lucy.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Lucy Title third task", "content":"Content third task"}})
  await lucy.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Lucy Title fourth task", "content":"Content fourth task"}})
  await s.consistency()
})

orchestrator.run()
