const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { connect } = require('@holochain/hc-web-client')
const devHolochainConnection = connect({ url: 'ws://localhost:33003' })
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
        devHolochainConnection.then(({ callZome }) => {
          console.log('started_demo_setup_lucy')
          callZome('notes', 'notes', 'create_note')({ base: '', note_input: { uuid: uuidv4(), title: 'lucys Note 2', content: 'Get this from demo again', order: 1 } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_lucy', res)
            callZome('tasks', 'tasks', 'create_task')({ base: res.Ok.id, task_input: { uuid: uuidv4(), title: 'lucys Task', "done":false } }).then((result) => {
              const res = JSON.parse(result)
              console.log('ok_demo_setup_lucy_task', res)
            })
          })
          callZome('freckles', 'freckles', 'create_freckle')({ base: '', freckle_input : {uuid:uuidv4(), content: `<h1>Lucy's first freckle??</h1><p>So Rad</p>` } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_lucy_freckle', res)
          })
          callZome('freckles', 'freckles', 'create_freckle')({ base: '', freckle_input : {uuid:uuidv4(), content: `<h1>How good are freckles 💋!</h1><p>So Rad</p>` } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_lucy_freckle', res)
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