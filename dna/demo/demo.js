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
  const {alice, bob, phil, lucy} = await s.players({alice: conductorConfig, bob: conductorConfig, phil: conductorConfig, lucy: conductorConfig}, true)
  const columnKanbanDo = await alice.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
  console.log('columnKanbanDo', columnKanbanDo)
  await s.consistency()
  const doNote1 = await alice.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Drag & Drop Notes", "content":"An agent should be able to drag Notes between columns", "order": 1}})
  console.log('doNote1', doNote1)
  await s.consistency()
  const doTask1 = await alice.call("tasks", "tasks", "create_task", {"base": doNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Enable Drag & Drop", "done":false}})
  console.log('doTask1', doTask1)
  const doTask2 = await alice.call("tasks", "tasks", "create_task", {"base": doNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update column in Note on drop", "done":false}})
  console.log('doTask2', doTask2)
  const doTask3 = await alice.call("tasks", "tasks", "create_task", {"base": doNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update order of notes in column on drop", "done":false}})
  console.log('doTask3', doTask3)
  await s.consistency()

  const doNote2 = await bob.call("notes", "notes", "create_note", {"base":columnKanbanDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Drag & Drop columns", "content":"An agent should be able to reorder columns", "order": 2}})
  console.log('doNote1', doNote1)
  await s.consistency()
  const doNote2Task1 = await bob.call("tasks", "tasks", "create_task", {"base": doNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Enable Drag & Drop", "done":true}})
  console.log('doNote2Task1', doNote2Task1)
  const doNote2Task2 = await bob.call("tasks", "tasks", "create_task", {"base": doNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update column order on drop", "done":true}})
  console.log('doNote2Task2', doNote2Task2)
  const doNote2Task3 = await bob.call("tasks", "tasks", "create_task", {"base": doNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update base on drop", "done":true}})
  console.log('doNote2Task3', doNote2Task3)
  const doNote2Task4 = await bob.call("tasks", "tasks", "create_task", {"base": doNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add new handler to move link to new base", "done":true}})
  console.log('doNote2Task24', doNote2Task4)
  await s.consistency()

  const columnKanbanDoing = await alice.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 2}})
  console.log('columnKanbanDoing', columnKanbanDoing)
  await s.consistency()
  const doingNote1 = await alice.call("notes", "notes", "create_note", {"base":columnKanbanDoing.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Demo Setup", "content":"Work out how to write try-o-rama test to setup all the demo data for multiple DNAs", "order": 1}})
  console.log('doingNote1', doingNote1)
  await s.consistency()
  const doingTask1 = await alice.call("tasks", "tasks", "create_task", {"base": doingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Create new Demo folder", "done":false}})
  console.log('doingTask1', doingTask1)
  const doingTask2 = await alice.call("tasks", "tasks", "create_task", {"base": doingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add Notes, Tasks and Kanban dnas", "done":false}})
  console.log('doingTask2', doingTask2)
  const doingTask3 = await alice.call("tasks", "tasks", "create_task", {"base": doingNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Write a scenario that adds columns, notes and tasks", "done":false}})
  console.log('doingTask3', doingTask3)
  await s.consistency()

  const columnKanbanDone = await alice.call("columns", "columns", "create_column", {"base": "QmHashyKanban", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 3}})
  console.log('columnKanbanDone', columnKanbanDone)


  const columnTasksDo = await phil.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
  console.log('columnTasksDo', columnTasksDo)
  await s.consistency()
  const columnTasksDoNote1 = await phil.call("notes", "notes", "create_note", {"base":columnTasksDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Edit a task", "content":"An agent should be able to edit a task", "order": 1}})
  console.log('columnTasksDoNote1', columnTasksDoNote1)
  await s.consistency()
  const columnTasksDoNote1Task1 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add Edit icon where tick is", "done":false}})
  console.log('columnTasksDoNote1Task1', columnTasksDoNote1Task1)
  const columnTasksDoNote1Task2 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Click edit shows text-field and edit changes to Save", "done":false}})
  console.log('columnTasksDoNote1Task2', columnTasksDoNote1Task2)
  const columnTasksDoNote1Task3 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update task on save", "done":false}})
  console.log('columnTasksDoNote1Task3', columnTasksDoNote1Task3)  
  const columnTasksDoNote1Task4 = await phil.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update task on check", "done":false}})
  console.log('columnTasksDoNote1Task4', columnTasksDoNote1Task4)
  await s.consistency()

  const columnTasksDoNote2 = await alice.call("notes", "notes", "create_note", {"base":columnTasksDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Delete a task", "content":"An agent should be able to delete a task", "order": 2}})
  console.log('columnTasksDoNote2', columnTasksDoNote2)
  await s.consistency()
  const columnTasksDoNote2Task1 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add delete icon right of edit", "done":false}})
  console.log('columnTasksDoNote2Task1', columnTasksDoNote2Task1)
  const columnTasksDoNote2Task2 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Click delete shows confirmation dialog", "done":false}})
  console.log('columnTasksDoNote2Task2', columnTasksDoNote2Task2)
  const columnTasksDoNote2Task3 = await alice.call("tasks", "tasks", "create_task", {"base": columnTasksDoNote2.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Delete on confirm", "done":false}})
  console.log('columnTasksDoNote2Task3', columnTasksDoNote2Task3)
  await s.consistency()

  const columnTasksDoing = await alice.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 2}})
  console.log('columnTasksDoing', columnTasksDoing)

  const columnTasksDone = await alice.call("columns", "columns", "create_column", {"base": "QmmorehashyTasks", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 3}})
  console.log('columnTasksDone', columnTasksDone)


  const columnNotesDo = await alice.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Do", "order": 1}})
  console.log('columnNotesDo', columnNotesDo)
  await s.consistency()
  const columnNotesDoNote1 = await alice.call("notes", "notes", "create_note", {"base":columnNotesDo.Ok.id, "note_input": {"uuid":uuidv4(), "title":"Add order field", "content":"Notes should be orderable so they need an order field", "order": 1}})
  console.log('columnNotesDoNote1', columnNotesDoNote1)
  await s.consistency()
  const columnNotesDoNote1Task1 = await alice.call("tasks", "tasks", "create_task", {"base": columnNotesDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Add order field", "done":true}})
  console.log('columnNotesDoNote1Task1', columnNotesDoNote1Task1)
  const columnNotesDoNote1Task2 = await alice.call("tasks", "tasks", "create_task", {"base": columnNotesDoNote1.Ok.id, "task_input" : {"uuid":uuidv4(), "title":"Update listNotes to be ordered", "done":true}})
  console.log('columnNotesDoNote1Task2', columnNotesDoNote1Task2)
  await s.consistency()
  const columnNotesDoing = await alice.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Doing", "order": 2}})
  console.log('columnNotesDoing', columnNotesDoing)
  await s.consistency()
  const columnNotesDone = await alice.call("columns", "columns", "create_column", {"base": "Qmmorebighashes333", "column_input" : {"uuid":uuidv4(), "title":"Done", "order": 3}})
  console.log('columnNotesDone', columnNotesDone)
  await s.consistency()
})

orchestrator.run()
