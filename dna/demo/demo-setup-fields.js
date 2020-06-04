const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { connect } = require('@holochain/hc-web-client')
const holochainConnection = connect({ url: 'ws://localhost:33000' })
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
        holochainConnection.then(({ callZome }) => {
          console.log('started_demo_setup_fields')

          // managed fields list
          const fullNameFieldId = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Full Name', ui: 'text-field' } }).then((result) => {
            console.log('fullNameId', result)
            const res = JSON.parse(result)
            console.log('fullNameId_res', res)
            return res.Ok.id 
          })
          const avatarFieldId = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Avatar', ui: 'thumbnail' } }).then((result) => {
            console.log('AvatarId', result)
            const res = JSON.parse(result)
            return res.Ok.id
          })
          const bioIdField = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Bio', ui: 'text-area' } }).then((result) => {
            console.log('bioIdField', result)
            const res = JSON.parse(result)
            return res.Ok.id
          })
          const handleIdField = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Handle', ui: 'text-field' } }).then((result) => {
            console.log('handleIdField', result)
            const res = JSON.parse(result)
            return res.Ok.id
          })
          const profilePictureIdField = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Profile Picture', ui: 'image' } }).then((result) => {
            console.log('profilePictureIdField', result)
            const res = JSON.parse(result)
            return res.Ok.id
          })
          const urlField = callZome('fields', 'fields', 'create_field')({ base: '', field_input : { name: 'Url', ui: 'text-field' } }).then((result) => {
            console.log('urlField', result)
            const res = JSON.parse(result)
            console.log('urlField.Ok.id', res.Ok.id)
            return res.Ok.id
          })

          const list_fields = callZome('fields', 'fields', 'list_fields')({ base: '' }).then((result) => {
            console.log('list_fields', result)
            const res = JSON.parse(result)
            console.log('list_fields.Ok', res.Ok)
            return res.Ok
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