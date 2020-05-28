const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { connect } = require('@holochain/hc-web-client')
const devHolochainConnection = connect({ url: 'ws://localhost:33000' })
const net = require('net')
const port = 33000;
const client = new net.Socket()

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${new Buffer(bitmap).toString('base64')}`
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
          console.log('started_demo_setup_phil')
          callZome('origins', 'origins', 'create_profile')({ base: '', profile_input : {agentId:'', avatar: base64_encode('./assets/philt3r.png'), handle: 'philip.beadle'}}).then((result) => {
            const res = JSON.parse(result)
          })
          callZome('kanban', 'kanban', 'create_profile')({ base: '', profile_input : {agentId:'', avatar: base64_encode('./assets/philt3r.png'), handle: 'philip.beadle'}}).then((result) => {
            const res = JSON.parse(result)
            console.log('philKanbanProfile', res)
          })
          callZome('freckles', 'freckles', 'create_profile')({ base: '', profile_input : {agentId:'', avatar: base64_encode('./assets/philip.beadle.png'), handle: 'phil'}}).then((result) => {
            const res = JSON.parse(result)
            console.log('philfrecklesProfile', res)
          })
          callZome('notes', 'notes', 'create_note')({ base: '', note_input: { uuid: uuidv4(), title: 'Phils Note 2', content: 'Get this from demo again', order: 1 } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_phil', res)
            callZome('tasks', 'tasks', 'create_task')({ base: res.Ok.id, task_input: { uuid: uuidv4(), title: 'Phils Task', "done":false } }).then((result) => {
              const res = JSON.parse(result)
              console.log('ok_demo_setup_phil_task', res)
            })
          })

          callZome('freckles', 'freckles', 'create_freckle')({ base: '', freckle_input : {uuid:uuidv4(), content: `<h1>Hows this for a freckle??</h1><p>Rad</p>` } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_phil_freckle', res)
          })

          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Personal', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'fullNameId.Ok.id', value: 'Philip Beadle' } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Personal', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'handleId.Ok.id', value: 'philip.beadle' } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Personal', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'avatarId.Ok.id', value: base64_encode('./assets/philip.beadle.png') } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Personal', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'profilePicId.Ok.id', value: base64_encode('./assets/philip.beadle.profile.jpg') } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Music', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'handleId.Ok.id', value: '@philt3r' } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Music', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'avatarId.Ok.id', value: base64_encode('./assets/philt3r.png') } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Music', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'urlProfileField.Ok.id', value: 'http://philt3r.rocks' } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Music', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'bioId.Ok.id', value: '@philt3r is not a metaphor for a side affect, but rather a side affect of a metamorphosis. For a decade, he has planted smiles and swivelled dials along that great stretch of party paradise that is the east-coast of Australia. @philt3r’s sets started out spanning more genres than a well thought out German street parade, but now it\'s techno, phat, dark, dystopic TECHNO! @philt3r can read a crowd better than airport security, and take them further up than their overpriced tickets. But that\'s what we like about @philt3r, his lack of tickets on himself. So get your \'TECHNO!\' on with @philt3r at your next attempt to escape reality!' } })
          callZome('personalinformation', 'personalinformation', 'create_personafield')({ base: 'Music', personafield_input : {uuid:uuidv4(), fieldsFieldId: 'profilePicId.Ok.id', value: base64_encode('./assets/philt3r-profile.jpg') } })

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


  // // Phil's Personal persona
  // const philPersonalFullName = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Philip Beadle"}})
  // console.log('philPersonalFullName', philPersonalFullName)
  // const philPersonalHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "philip.beadle"}})
  // console.log('philPersonalHandle', philPersonalHandle)
  // const philPersonalAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philip.beadle.png')}})
  // console.log('philPersonalAvatar', philPersonalAvatar)
  // const philHolochainProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philip.beadle.profile.jpg')}})
  // console.log('philHolochainProfilePic', philHolochainProfilePic)

  // // Phil's Music persona
  // const philMusicHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "@philt3r"}})
  // console.log('philMusicHandle', philMusicHandle)
  // const philMusicAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philt3r.png')}})
  // console.log('philMusicAvatar', philMusicAvatar)
  // const philMusicUrl = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": urlProfileField.Ok.id, "value": "http://philt3r.rocks"}})
  // console.log('philMusicUrl', philMusicUrl)
  // const philMusicBio = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": bioId.Ok.id, "value": "  @philt3r is not a metaphor for a side affect, but rather a side affect of a metamorphosis. For a decade, he has planted smiles and swivelled dials along that great stretch of party paradise that is the east-coast of Australia. @philt3r’s sets started out spanning more genres than a well thought out German street parade, but now it's techno, phat, dark, dystopic TECHNO! @philt3r can read a crowd better than airport security, and take them further up than their overpriced tickets. But that's what we like about @philt3r, his lack of tickets on himself. So get your 'TECHNO!' on with @philt3r at your next attempt to escape reality!"}})
  // console.log('philMusicBio', philMusicBio)
  // const philMusicProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philt3r-profile.jpg')}})
  // console.log('philMusicProfilePic', philMusicProfilePic)
  // const philMusicProfileImages = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profileImages.Ok.id, "value": [{ name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }]}})
  // console.log('philMusicProfileImages', philMusicProfileImages)