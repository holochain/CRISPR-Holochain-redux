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

const columnsDnaPath = path.join(__dirname, "../kanban/dna/dist/dna.dna.json")
const notesDnaPath = path.join(__dirname, "../notes/dna/dist/dna.dna.json")
const tasksDnaPath = path.join(__dirname, "../tasks/dna/dist/dna.dna.json")

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

const columnsDna = Config.dna(columnsDnaPath, 'columns-test')
const notesDna = Config.dna(notesDnaPath, 'notes-test')
const tasksDna = Config.dna(tasksDnaPath, 'tasks-test')

// const conductorConfig = Config.gen({notes: dna})
const conductorConfig = Config.gen({columns: columnsDna, notes: notesDna, tasks: tasksDna}, {
  network: {
    type: 'sim2h',
    sim2h_url: 'ws://localhost:9000'
  }
})

orchestrator.registerScenario("Generate config and key for Alice & Bob", async (s, t) => {
  const {phil, bob, alice, lucy} = await s.players({phil: conductorConfig, bob: conductorConfig, alice: conductorConfig, lucy: conductorConfig}, true)

  const columnNotesDo = await phil.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
  console.log('columnNotesDo', columnNotesDo)
  await s.consistency()
  const columnNotesDoing = await phil.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  console.log('columnNotesDoing', columnNotesDoing)
  await s.consistency()
  const columnNotesDone = await phil.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
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

  const columnKanbanDo = await phil.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 0}})
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

  const columnKanbanDoNote2 = await bob.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Drag & Drop columns", "content":"An agent should be able to reorder columns", "order": 1}})
  console.log('columnKanbanDoNote1', columnKanbanDoNote1)
  await s.consistency()
  const columnKanbanDoNote2Task1 = await bob.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Enable Drag & Drop", "done":true}})
  console.log('columnKanbanDoNote2Task1', columnKanbanDoNote2Task1)
  const columnKanbanDoNote2Task2 = await bob.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update column order on drop", "done":true}})
  console.log('columnKanbanDoNote2Task2', columnKanbanDoNote2Task2)
  const columnKanbanDoNote2Task3 = await bob.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update base on drop", "done":true}})
  console.log('columnKanbanDoNote2Task3', columnKanbanDoNote2Task3)
  const columnKanbanDoNote2Task4 = await bob.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add new handler to move link to new base", "done":true}})
  console.log('columnKanbanDoNote2Task24', columnKanbanDoNote2Task4)
  await s.consistency()

  const columnKanbanDoNote3 = await phil.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Reorder Notes", "content":"An agent should be able to drag Notes in a column to reorder them", "order": 2}})
  console.log('columnKanbanDoNote3', columnKanbanDoNote3)
  await s.consistency()
  const columnKanbanDoNote3Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnKanbanDoNote3.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update order of notes in column on drop", "done":false}})
  console.log('columnKanbanDoNote3Task1', columnKanbanDoNote3Task1)
  await s.consistency()

  const columnKanbanDoing = await phil.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
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

  const columnKanbanDone = await phil.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  console.log('columnKanbanDone', columnKanbanDone)

  const columnTasksDo = await alice.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
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

  const columnTasksDoing = await lucy.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 1}})
  console.log('columnTasksDoing', columnTasksDoing)

  const columnTasksDone = await phil.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 2}})
  console.log('columnTasksDone', columnTasksDone)
})

orchestrator.run()
