const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const port = 33000;
const { connect } = require('@holochain/hc-web-client')
const holochainConnection = connect({ url: `ws://localhost:${port}` })
const net = require('net')
const client = new net.Socket()


let startedConductor = false
const tryConnection = () => {
  client.connect({ port }, () => {
      client.end()
      if (!startedConductor) {
        console.log('starting ui, connect to:' + port)
        startedConductor = true
        holochainConnection.then(({ callZome }) => {
          // Mates
          callZome('164449a2-e7d4-47dc-acc8-2fe317b8d9fe', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>This origin</h1><p>is in the Mates instance</p>' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})          
          callZome('164449a2-e7d4-47dc-acc8-2fe317b8d9fe', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Control who accesses the network</h1><p>using the permissions and invites</p>' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          // Broadcast Origins
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Phil wrote this</h1> Some friendly origin in 57c01ed8-30ae-4fca-b6f9-40192821fed2' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Phil wrote this</h1>Another origin in 57c01ed8-30ae-4fca-b6f9-40192821fed2' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Phil wrote this</h1>3rd origin in 57c01ed8-30ae-4fca-b6f9-40192821fed2' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
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
