const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { connect } = require('@holochain/hc-web-client')
const holochainConnection = connect({ url: 'ws://localhost:33003' })
const net = require('net')
const port = 33000;
const client = new net.Socket()

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

let startedConductor = false
const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedConductor) {
        console.log('starting ui, connect to:' + port)
        startedConductor = true
        holochainConnection.then(({ callZome }) => {
          // callZome('notes', 'notes', 'create_note')({ base: '', note_input: { uuid: uuidv4(), title: 'lucys Note 2', content: 'Get this from demo again', order: 1 } }).then((result) => {
          //   const res = JSON.parse(result)
          //   console.log('ok_demo_setup_lucy', res)
          //   callZome('tasks', 'tasks', 'create_task')({ base: res.Ok.id, task_input: { uuid: uuidv4(), title: 'lucys Task', "done":false } }).then((result) => {
          //     const res = JSON.parse(result)
          //     console.log('ok_demo_setup_lucy_task', res)
          //   })
          // })
          callZome('0098d2a1-5668-4a5a-8ef8-503d58dd38ce', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), content: `<h1>Mark's first freckle??</h1><p>So Rad</p>` }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('0098d2a1-5668-4a5a-8ef8-503d58dd38ce', 'freckles', 'create_freckle')({ base: '', freckle_input : {uuid:uuidv4(), content: `<h1>How good are Mark's freckles 💋!</h1><p>Metal</p>` } })
          .then((result) => {
            console.log(JSON.parse(result))
          })
        })
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  console.log('Waiting for Holochain to configure and boot')
  setTimeout(tryConnection, 5000)
})