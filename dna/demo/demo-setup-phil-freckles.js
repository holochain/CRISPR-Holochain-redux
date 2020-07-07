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
          // My Personal Freckles
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), title: 'Updated DNA', content: '<h1>A new freckle</h1><p>That has a title and an emoji field</p>' }})
          .then((result) => {
            const res = JSON.parse(result)
            console.log(JSON.parse(result))
            // callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'update_freckle')({ id: res.Ok.id, created_at: res.Ok.createdAt, address: res.Ok.address, freckle_input: { uuid:res.Ok.uuid, content: 'updated content' } })
            // .then((result) => {
            //   console.log(JSON.parse(result))
            // }).catch(err =>{console.log(err)})   
          }).catch(err =>{console.log(err)})          
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), title: 'Should start getting real content', content: '<h1>Context friend list??</h1><p>Pretty cool how each DHT has its own list of friends.</p>', emoji: '🎧' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          // My Friends Freckles
          callZome('0098d2a1-5668-4a5a-8ef8-503d58dd38ce', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), title: 'And start using freckles', content: '<h1>Phil wrote this</h1> Some friendly freckle in 0098d2a1-5668-4a5a-8ef8-503d58dd38ce', emoji: '🎧' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('0098d2a1-5668-4a5a-8ef8-503d58dd38ce', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), title: 'Run it on my Holoport', content: '<h1>Phil wrote this</h1>Another freckly freckle in 0098d2a1-5668-4a5a-8ef8-503d58dd38ce', emoji: '🎧' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('0098d2a1-5668-4a5a-8ef8-503d58dd38ce', 'freckles', 'create_freckle')({ base: '', freckle_input : { uuid:uuidv4(), title: 'Thatd be cool', content: '<h1>Phil wrote this</h1>3rd freckle in 0098d2a1-5668-4a5a-8ef8-503d58dd38ce', emoji: '🎧' }})
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
