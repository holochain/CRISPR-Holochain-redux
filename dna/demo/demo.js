const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { Orchestrator, Config, combine, singleConductor, localOnly, tapeExecutor } = require('@holochain/tryorama')
const fs = require('fs');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${new Buffer(bitmap).toString('base64')}`
}

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const kanbanDnaPath = path.join(__dirname, "../kanban/dna/dist/dna.dna.json")
const notesDnaPath = path.join(__dirname, "../notes/dna/dist/dna.dna.json")
const tasksDnaPath = path.join(__dirname, "../tasks/dna/dist/dna.dna.json")
const frecklesDnaPath = path.join(__dirname, "../freckles/dna/dist/dna.dna.json")
const curatedfieldsDnaPath = path.join(__dirname, "../fields/dna/dist/dna.dna.json")
const personalInformationDnaPath = path.join(__dirname, "../personalinformation/dna/dist/dna.dna.json")

const logger = {
  type: 'debug',
  rules: {
    rules: [
      {
        exclude: true,
        pattern: '.*parity.*'
      },
      {
        exclude: true,
        pattern: '.*mio.*'
      },
      {
        exclude: true,
        pattern: '.*tokio.*'
      },
      {
        exclude: true,
        pattern: '.*hyper.*'
      },
      {
        exclude: true,
        pattern: '.*rusoto_core.*'
      },
      {
        exclude: true,
        pattern: '.*want.*'
      },
      {
        exclude: true,
        pattern: '.*rpc.*'
      }
    ]
  },
  state_dump: true
}
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

const kanbanDna = Config.dna(kanbanDnaPath, 'kanban-test')
const notesDna = Config.dna(notesDnaPath, 'notes-test')
const tasksDna = Config.dna(tasksDnaPath, 'tasks-test')
const fieldsDna = Config.dna(curatedfieldsDnaPath, 'fields-test')
const philsPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })
const philsFrecklesDna = Config.dna(frecklesDnaPath, 'freckles-test', { uuid: uuidv4() })
const lucysPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })
const marksPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })
const rudysPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })
const arthursPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })
const alicesPersonalInformationDna = Config.dna(personalInformationDnaPath, 'personalinformation-test', { uuid: uuidv4() })

const philsConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: philsPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

const lucysConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: lucysPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

const rudysConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: rudysPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

const arthursConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: arthursPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

const alicesConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: alicesPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

const marksConductorConfig = Config.gen({kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: marksPersonalInformationDna, freckles: philsFrecklesDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  },
  logger: logger
})

orchestrator.registerScenario("Set up Holochain for all players, DHTs and entries", async (s, t) => {
  const {phil, lucy, rudy, arthur, alice, mark} = await s.players({phil: philsConductorConfig, lucy: lucysConductorConfig, rudy: rudysConductorConfig, arthur: arthursConductorConfig, alice: alicesConductorConfig, mark: marksConductorConfig}, true)
  console.log("started_ok_demo")
  const chimeraDo = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyChimera", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
  await s.consistency()
  const chimeraDoing = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyChimera", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  await s.consistency()
  const chimeraDone = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyChimera", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  await s.consistency()
  const chimeraDoNote1 = await phil.call("notes", "notes", "create_note", {"base":chimeraDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"DNA Model for Personas & Profiles", "content":"Create the DNA Model", "order": 0}})
  await s.consistency()
  const chimeraDoNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Build & test DNA", "done":false}})
  console.log('chimeraDoNote1Task1', chimeraDoNote1Task1)
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern templates code files", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern zome", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Project zome section", "done":false}})
  await s.consistency()
  
  await phil.call("notes", "notes", "create_note", {"base": chimeraDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Create Profile form for Chimera", "content":"Needs to have avatar and handle", "order": 1}})
  await s.consistency()
  const chimeraDoNote2 = await phil.call("notes", "notes", "create_note", {"base":chimeraDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"DNA for Chimera Parts and invites", "content":"Currently hard coded into the vuex store. Needs to be editable", "order": 1}})
  await s.consistency()
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Build & test DNA", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern templates code files", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern zome", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": chimeraDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Project zome section", "done":false}})
  await s.consistency()

  const crisprDo = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyCRSIPR", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
  await s.consistency()
  const crisprDoing = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyCRSIPR", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  await s.consistency()
  const crisprDone = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyCRSIPR", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  await s.consistency()
  const crisprDoNote1 = await phil.call("notes", "notes", "create_note", {"base":crisprDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Model for CRISPR", "content":"Create the DNA Model to store all the information in a project including the zome model", "order": 0}})
  await s.consistency()
  await phil.call("tasks", "tasks", "create_task", {"base": crisprDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Build & test DNA", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": crisprDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern templates code files", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": crisprDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Pattern zome", "done":false}})
  await phil.call("tasks", "tasks", "create_task", {"base": crisprDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Project zome section", "done":false}})
  await s.consistency()

  await phil.call("notes", "notes", "create_note", {"base":crisprDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Promote project to Parts library", "content":"When a Part is ready to be used promote it to the Parts list.", "order": 1}})
  await s.consistency()

  const columnNotesDo = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
  console.log('columnNotesDo', columnNotesDo)
  await s.consistency()
  const columnNotesDoing = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  console.log('columnNotesDoing', columnNotesDoing)
  await s.consistency()
  const columnNotesDone = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  console.log('columnNotesDone', columnNotesDone)
  await s.consistency()
  const columnNotesDoneNote1 = await phil.call("notes", "notes", "create_note", {"base":columnNotesDone.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Add order field", "content":"Notes should be orderable so they need an order field", "order": 0}})
  console.log('columnNotesDoneNote1', columnNotesDoneNote1)
  await s.consistency()
  const columnNotesDoneNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnNotesDoneNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add order field", "done":true}})
  console.log('columnNotesDoneNote1Task1', columnNotesDoneNote1Task1)
  const columnNotesDoneNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnNotesDoneNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update listNotes to be ordered", "done":true}})
  console.log('columnNotesDoneNote1Task2', columnNotesDoneNote1Task2)
  await s.consistency()
  const columnNotesDoneNote2 = await phil.call("notes", "notes", "create_note", {"base":columnNotesDone.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Add a note", "content":"An agent can add new notes", "order": 1}})
  console.log('columnNotesDoneNote2', columnNotesDoneNote2)
  await s.consistency()
  const columnNotesDoneNote3 = await phil.call("notes", "notes", "create_note", {"base":columnNotesDone.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Edit a note", "content":"An agent can add edit", "order": 2}})
  console.log('columnNotesDoneNote3', columnNotesDoneNote3)
  await s.consistency()

  const columnKanbanDo = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
  console.log('columnKanbanDo', columnKanbanDo)
  await s.consistency()
  const columnKanbanDoNote1 = await phil.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Drag & Drop Notes", "content":"An agent should be able to drag Notes between columns", "order": 0}})
  console.log('columnKanbanDoNote1', columnKanbanDoNote1)
  await s.consistency()
  const columnKanbanDoNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Enable Drag & Drop", "done":false}})
  console.log('columnKanbanDoNote1Task1', columnKanbanDoNote1Task1)
  const columnKanbanDoNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update column in Note on drop", "done":false}})
  console.log('columnKanbanDoNote1Task2', columnKanbanDoNote1Task2)
  const columnKanbanDoNote1Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update order of notes in column on drop", "done":false}})
  console.log('columnKanbanDoNote1Task3', columnKanbanDoNote1Task3)
  await s.consistency()

  const columnKanbanDoNote2 = await arthur.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Drag & Drop columns", "content":"An agent should be able to reorder columns", "order": 1}})
  console.log('columnKanbanDoNote1', columnKanbanDoNote1)
  await s.consistency()
  const columnKanbanDoNote2Task1 = await arthur.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Enable Drag & Drop", "done":true}})
  console.log('columnKanbanDoNote2Task1', columnKanbanDoNote2Task1)
  const columnKanbanDoNote2Task2 = await arthur.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update column order on drop", "done":true}})
  console.log('columnKanbanDoNote2Task2', columnKanbanDoNote2Task2)
  const columnKanbanDoNote2Task3 = await arthur.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update base on drop", "done":true}})
  console.log('columnKanbanDoNote2Task3', columnKanbanDoNote2Task3)
  const columnKanbanDoNote2Task4 = await arthur.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add new handler to move link to new base", "done":true}})
  console.log('columnKanbanDoNote2Task24', columnKanbanDoNote2Task4)
  await s.consistency()

  const columnKanbanDoNote3 = await phil.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Reorder Notes", "content":"An agent should be able to drag Notes in a column to reorder them", "order": 2}})
  console.log('columnKanbanDoNote3', columnKanbanDoNote3)
  await s.consistency()
  const columnKanbanDoNote3Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote3.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update order of notes in column on drop", "done":false}})
  console.log('columnKanbanDoNote3Task1', columnKanbanDoNote3Task1)
  await s.consistency()

  const columnKanbanDoing = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  console.log('columnKanbanDoing', columnKanbanDoing)
  await s.consistency()
  const columnKanbanDoingNote1 = await phil.call("notes", "notes", "create_note", {"base":columnKanbanDoing.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Demo Setup", "content":"Work out how to write try-o-rama test to setup all the demo data for multiple DNAs", "order": 0}})
  console.log('columnKanbanDoingNote1', columnKanbanDoingNote1)
  await s.consistency()
  const columnKanbanDoingNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Create new Demo folder", "done":false}})
  console.log('columnKanbanDoingNote1Task1', columnKanbanDoingNote1Task1)
  const columnKanbanDoingNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add Notes, Tasks and Kanban dnas", "done":false}})
  console.log('columnKanbanDoingNote1Task2', columnKanbanDoingNote1Task2)
  const columnKanbanDoingNote1Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Write a scenario that adds columns, notes and tasks", "done":false}})
  console.log('columnKanbanDoingNote1Task3', columnKanbanDoingNote1Task3)
  await s.consistency()

  const columnKanbanDone = await phil.call("kanban", "kanban", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  console.log('columnKanbanDone', columnKanbanDone)

  const columnTasksDo = await alice.call("kanban", "kanban", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
  console.log('columnTasksDo', columnTasksDo)
  await s.consistency()
  const columnTasksDoNote1 = await alice.call("notes", "notes", "create_note", {"base":columnTasksDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Edit a task", "content":"An agent should be able to edit a task", "order": 0}})
  console.log('columnTasksDoNote1', columnTasksDoNote1)
  await s.consistency()
  const columnTasksDoNote1Task1 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add Edit icon where tick is", "done":false}})
  console.log('columnTasksDoNote1Task1', columnTasksDoNote1Task1)
  const columnTasksDoNote1Task2 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Click edit shows text-field and edit changes to Save", "done":false}})
  console.log('columnTasksDoNote1Task2', columnTasksDoNote1Task2)
  const columnTasksDoNote1Task3 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update task on save", "done":false}})
  console.log('columnTasksDoNote1Task3', columnTasksDoNote1Task3)  
  const columnTasksDoNote1Task4 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update task on check", "done":false}})
  console.log('columnTasksDoNote1Task4', columnTasksDoNote1Task4)
  await s.consistency()

  const columnTasksDoNote2 = await phil.call("notes", "notes", "create_note", {"base":columnTasksDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Delete a task", "content":"An agent should be able to delete a task", "order": 1}})
  console.log('columnTasksDoNote2', columnTasksDoNote2)
  await s.consistency()
  const columnTasksDoNote2Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add delete icon right of edit", "done":false}})
  console.log('columnTasksDoNote2Task1', columnTasksDoNote2Task1)
  const columnTasksDoNote2Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Click delete shows confirmation dialog", "done":false}})
  console.log('columnTasksDoNote2Task2', columnTasksDoNote2Task2)
  const columnTasksDoNote2Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Delete on confirm", "done":false}})
  console.log('columnTasksDoNote2Task3', columnTasksDoNote2Task3)
  await s.consistency()

  const columnTasksDoNote3 = await lucy.call("notes", "notes", "create_note", {"base":columnTasksDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Rename task to Checklist", "content":"Checklist seems to be a more appropriate name", "order": 2}})
  console.log('columnTasksDoNote3', columnTasksDoNote3)

  const columnTasksDoing = await lucy.call("kanban", "kanban", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  console.log('columnTasksDoing', columnTasksDoing)

  const columnTasksDone = await phil.call("kanban", "kanban", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  console.log('columnTasksDone', columnTasksDone)


  const columnFrecklesDraft = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebigfrecklehashes333", "column_input" : {"uuid":uuidv4(), "title":"Draft", "order": 0}})
  console.log('columnFrecklesDraft', columnFrecklesDraft)
  const columnFrecklesDraftNote1 = await phil.call("notes", "notes", "create_note", {"base":columnFrecklesDraft.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Software creation, collaboration & sharing at the edge.", "content":"Chimera will foster its own creation as the people’s networks of DHTs, software creation, collaboration & sharing at the edge. Anyone can build a simple Chimera part, and those parts make up the whole.", "order": 0}})
  console.log('columnFrecklesDraftNote1', columnFrecklesDraftNote1)
  const columnFrecklesDraftNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnFrecklesDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"http://mhairi.rocks", "done":false}})
  console.log('columnFrecklesDraftNote1Task1', columnFrecklesDraftNote1Task1)
  const columnFrecklesDraftNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnFrecklesDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"http://mittens.rocks", "done":false}})
  console.log('columnFrecklesDraftNote1Task2', columnFrecklesDraftNote1Task2)
  const columnFrecklesDraftNote1Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnFrecklesDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"http://rayman.rocks", "done":false}})
  console.log('columnFrecklesDraftNote1Task3', columnFrecklesDraftNote1Task3)
  const columnFrecklesDraftNote1Task4 = await phil.call("tasks", "tasks", "create_task", {"base": columnFrecklesDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"http://missjade.rocks", "done":false}})
  console.log('columnFrecklesDraftNote1Task4', columnFrecklesDraftNote1Task4)

  const columnFrecklesDraftNote2 = await phil.call("notes", "notes", "create_note", {"base":columnFrecklesDraft.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Chimera", "content":"Chimera: In Greek mythology, the Chimera was a creature composed of body parts from many other creatures. In biomimicry, we talk of a Chimera approach as a combination of different biomimetic designs into one application.", "order": 1}})
  console.log('columnFrecklesDraftNote2', columnFrecklesDraftNote2)

  const columnFrecklesReview = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebigfrecklehashes333", "column_input" : {"uuid":uuidv4(), "title":"Review", "order": 1}})
  console.log('columnFrecklesReview', columnFrecklesReview)  
  const columnFrecklesReviewNote1 = await phil.call("notes", "notes", "create_note", {"base":columnFrecklesReview.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Chimera: Is this the name", "content":"I like it, been working with it for a few weeks now and it still holds up well. Might write something about that.", "order": 0}})
  console.log('columnFrecklesReviewNote1', columnFrecklesReviewNote1)

  const columnFrecklesPublish = await phil.call("kanban", "kanban", "create_column", {"base": "Qmmorebigfrecklehashes333", "column_input" : {"uuid":uuidv4(), "title":"Ready to Publish", "order": 2}})
  console.log('columnFrecklesPublish', columnFrecklesPublish)


  const columnAgentsOfAnarchyDraft = await phil.call("kanban", "kanban", "create_column", {"base": "QmmorebigfAgentsOfAnarchyhash", "column_input" : {"uuid":uuidv4(), "title":"Draft It", "order": 0}})
  console.log('columnAgentsOfAnarchyDraft', columnAgentsOfAnarchyDraft)
  const columnAgentsOfAnarchyDraftNote1 = await phil.call("notes", "notes", "create_note", {"base":columnAgentsOfAnarchyDraft.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Ghost the System", "content":`
  They have stolen your mind
  Enslaved you with deceit
  Sold your privacy for profit
  And made you think it was free
  
  If you fight the System,
  The System fights back,
  If you Ghost the System
  We get our freedom back
  `, "order": 0}})
  console.log('columnAgentsOfAnarchyDraftNote1', columnAgentsOfAnarchyDraftNote1)
  const columnAgentsOfAnarchyDraftNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnAgentsOfAnarchyDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Write the story", "done":true}})
  console.log('columnAgentsOfAnarchyDraftNote1Task1', columnAgentsOfAnarchyDraftNote1Task1)
  const columnAgentsOfAnarchyDraftNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnAgentsOfAnarchyDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Sketch up panels", "done":false}})
  console.log('columnAgentsOfAnarchyDraftNote1Task2', columnAgentsOfAnarchyDraftNote1Task2)
  const columnAgentsOfAnarchyDraftNote1Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnAgentsOfAnarchyDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Speech bubbbles", "done":false}})
  console.log('columnAgentsOfAnarchyDraftNote1Task3', columnAgentsOfAnarchyDraftNote1Task3)
  const columnAgentsOfAnarchyDraftNote1Task4 = await phil.call("tasks", "tasks", "create_task", {"base": columnAgentsOfAnarchyDraftNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Panel footers", "done":false}})
  console.log('columnAgentsOfAnarchyDraftNote1Task4', columnAgentsOfAnarchyDraftNote1Task4)
  
  const columnAgentsOfAnarchyDraftNote2 = await phil.call("notes", "notes", "create_note", {"base":columnAgentsOfAnarchyDraft.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Website", "content":"Update the website to be generated by Profile Website builder", "order": 1}})
  console.log('columnAgentsOfAnarchyDraftNote2', columnAgentsOfAnarchyDraftNote2)
  const columnAgentsOfAnarchyDraftNote2Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnAgentsOfAnarchyDraftNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Check Crazy Domains", "done":true}})
  console.log('columnAgentsOfAnarchyDraftNote2Task1', columnAgentsOfAnarchyDraftNote2Task1)
  
  const columnAgentsOfAnarchyReview = await phil.call("kanban", "kanban", "create_column", {"base": "QmmorebigfAgentsOfAnarchyhash", "column_input" : {"uuid":uuidv4(), "title":"Animate It", "order": 1}})
  console.log('columnAgentsOfAnarchyReview', columnAgentsOfAnarchyReview)  
  
  const columnAgentsOfAnarchyPublish = await phil.call("kanban", "kanban", "create_column", {"base": "QmmorebigfAgentsOfAnarchyhash", "column_input" : {"uuid":uuidv4(), "title":"Publish It", "order": 2}})
  console.log('columnAgentsOfAnarchyPublish', columnAgentsOfAnarchyPublish)


  // managed fields list
  const fullNameId = await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Full Name", "ui": "text-field"}})
  console.log('fullNameId', fullNameId)
  const avatarId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Avatar","ui": "thumbnail"}})
  console.log('avatarId', avatarId)
  const bioId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Bio","ui": "text-area"}})
  console.log('bioId', bioId)
  const handleId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Handle","ui": "text-field"}})
  console.log('handleId', handleId)
  const profilePicId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Profile Picture","ui": "image"}})
  console.log('profilePicId', profilePicId)
  const urlProfileField =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"uuid":uuidv4(), "name": "Url","ui": "text-field"}})
  console.log('urlProfileField', urlProfileField)
  
  // Phil's Personal persona
  const philPersonalFullName = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Philip Beadle"}})
  console.log('philPersonalFullName', philPersonalFullName)
  const philPersonalHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "philip.beadle"}})
  console.log('philPersonalHandle', philPersonalHandle)
  const philPersonalAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philip.beadle.png')}})
  console.log('philPersonalAvatar', philPersonalAvatar)
  const philHolochainProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philip.beadle.profile.jpg')}})
  console.log('philHolochainProfilePic', philHolochainProfilePic)

  // Phil's Music persona
  const philMusicHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "@philt3r"}})
  console.log('philMusicHandle', philMusicHandle)
  const philMusicAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philt3r.png')}})
  console.log('philMusicAvatar', philMusicAvatar)
  const philMusicUrl = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": urlProfileField.Ok.id, "value": "http://philt3r.rocks"}})
  console.log('philMusicUrl', philMusicUrl)

  // Phil's freckles
  const philFreckle1 = await phil.call("freckles", "freckles", "create_freckle",  {"base": "", "freckle_input" : {"uuid":uuidv4(), "content": `<h1>Hows this for a freckle??</h1><p>Rad</p>`}})
  console.log('philFreckle1', philFreckle1)
  const philFreckle2 = await phil.call("freckles", "freckles", "create_freckle",  {"base": "", "freckle_input" : {"uuid":uuidv4(), "content": `<h1>Context friend list??</h1><p>Pretty cool how each DHT has its own list of friends.</p>`}})
  console.log('philFreckle2', philFreckle2)

  // Lucy's Personal persona
  const lucyPersonalFullName = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Lucy Beadle"}})
  console.log('lucyPersonalFullName', lucyPersonalFullName)
  const lucyPersonalHandle = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "lucy.beadle"}})
  console.log('lucyPersonalHandle', lucyPersonalHandle)
  const lucyPersonalAvatar = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/lucy.jpg')}})
  console.log('lucyPersonalAvatar', lucyPersonalAvatar)

  const lucyPhilFreckle1 = await lucy.call("freckles", "freckles", "list_freckles",  {"base": ""})
  console.log('lucyPhilFreckle1', lucyPhilFreckle1)

  // Rudy's Personal persona
  const rudyPersonalFullName = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Rudy"}})
  console.log('rudyPersonalFullName', rudyPersonalFullName)
  const rudyPersonalHandle = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "rudy.beadle"}})
  console.log('rudyPersonalHandle', rudyPersonalHandle)
  const rudyPersonalAvatar = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/rudy.jpeg')}})
  console.log('rudyPersonalAvatar', rudyPersonalAvatar)
  const rudyPhilFreckle1 = await rudy.call("freckles", "freckles", "list_freckles",  {"base": ""})
  console.log('rudyPhilFreckle1', rudyPhilFreckle1)


   // Arthur's Personal persona
   const arthurPersonalFullName = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Arthur Brock"}})
   console.log('arthurPersonalFullName', arthurPersonalFullName)
   const arthurPersonalHandle = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "Art"}})
   console.log('arthurPersonalHandle', arthurPersonalHandle)
   const arthurPersonalAvatar = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/arthur.brock.png')}})
   console.log('arthurPersonalAvatar', arthurPersonalAvatar)
   const artPhilFreckle1 = await rudy.call("freckles", "freckles", "list_freckles",  {"base": ""})
   console.log('artPhilFreckle1', artPhilFreckle1)

   // Arthur's Holochain persona
   const arthurHolochainHandle = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "arthur.brock"}})
   console.log('arthurHolochainHandle', arthurHolochainHandle)
   const arthurHolochainAvatar = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/arthur.brock.png')}})
   console.log('arthurHolochainAvatar', arthurHolochainAvatar)
   const arthurHolochainProfilePic = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/art.profile.jpeg')}})
   console.log('arthurHolochainProfilePic', arthurHolochainProfilePic)

   const philProfile = await phil.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philt3r.png'), "handle": "philip.beadle"}})
   console.log('philProfile', philProfile)
   const rudyProfile = await rudy.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/rudy.jpeg'), "handle": "Rudy"}})
   console.log('rudyProfile', rudyProfile)
   const lucyProfile = await lucy.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/lucy.jpg'), "handle": "Lucy"}})
   console.log('lucyProfile', lucyProfile)
   const aliceProfile = await alice.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mhairi.jpg'), "handle": "Mha Iri"}})
   console.log('aliceProfile', aliceProfile)
   const artProfile = await arthur.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/arthur.brock.png'), "handle": "arthur.brock"}})
   console.log('artProfile', artProfile)

   const philKanbanProfile = await phil.call("kanban", "kanban", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philip.beadle.png'), "handle": "Phil"}})
   console.log('philKanbanProfile', philKanbanProfile)
   const markProfile = await mark.call("kanban", "kanban", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mark.keenan.jpg'), "handle": "Mark"}})
   console.log('markProfile', markProfile)

   await s.consistency()
})

orchestrator.run()
