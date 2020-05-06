import { v4 as uuidv4 } from 'uuid'
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

const dna = Config.dna(dnaPath, 'columns-test')
// const conductorConfig = Config.gen({columns: dna})
const conductorConfig = Config.gen({columns: dna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Generate config and key for Alice & Bob", async (s, t) => {
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  await alice.call("columns", "columns", "create_column", {"base": "test", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
  await alice.call("columns", "columns", "create_column", {"base": "test", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  await alice.call("columns", "columns", "create_column", {"base": "test", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 1}})
})

orchestrator.run()
