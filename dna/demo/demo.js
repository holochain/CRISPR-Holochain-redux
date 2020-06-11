const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { Orchestrator, Config, combine, localOnly, tapeExecutor } = require('@holochain/tryorama')
const fs = require('fs')
const orchestrator = new Orchestrator({middleware: combine(tapeExecutor(require('tape')), localOnly,)})
const network = {
  type: 'sim2h',
  sim2h_url: 'ws://localhost:9000'
}
const logger = {
  type: 'error',
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


process.on('unhandledRejection', error => {
  console.error('got unhandledRejection:', error)
})

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

const originsDnaPath = path.join(__dirname, "../origins/dna/dist/dna.dna.json")
const tagsDnaPath = path.join(__dirname, "../tags/dna/dist/dna.dna.json")
const projectsDnaPath = path.join(__dirname, "../projects/dna/dist/dna.dna.json")
const kanbanDnaPath = path.join(__dirname, "../kanban/dna/dist/dna.dna.json")
const notesDnaPath = path.join(__dirname, "../notes/dna/dist/dna.dna.json")
const tasksDnaPath = path.join(__dirname, "../tasks/dna/dist/dna.dna.json")
const frecklesDnaPath = path.join(__dirname, "../freckles/dna/dist/dna.dna.json")
const curatedfieldsDnaPath = path.join(__dirname, "../curatedfields/dna/dist/dna.dna.json")
const personalInformationDnaPath = path.join(__dirname, "../personalinformation/dna/dist/dna.dna.json")

const projectsDna = Config.dna(projectsDnaPath, 'projects-test')
const tagsDna = Config.dna(tagsDnaPath, 'tags-test')
const originsDna = Config.dna(originsDnaPath, 'origins-test')
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

const philsConductorConfig = Config.gen({tags: tagsDna, projects: projectsDna, origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: philsPersonalInformationDna, freckles: philsFrecklesDna}, { network: network, logger: logger })
const lucysConductorConfig = Config.gen({tags: tagsDna, origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: lucysPersonalInformationDna, freckles: philsFrecklesDna}, { network: network, logger: logger })
const rudysConductorConfig = Config.gen({tags: tagsDna, origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: rudysPersonalInformationDna, freckles: philsFrecklesDna}, { network: network, logger: logger })
const arthursConductorConfig = Config.gen({projects: projectsDna, origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: arthursPersonalInformationDna, freckles: philsFrecklesDna}, { network: network, logger: logger })
const alicesConductorConfig = Config.gen({origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: alicesPersonalInformationDna, freckles: philsFrecklesDna}, { network: network, logger: logger })
const marksConductorConfig = Config.gen({projects: projectsDna, origins: originsDna, kanban: kanbanDna, notes: notesDna, tasks: tasksDna, fields: fieldsDna, personalinformation: marksPersonalInformationDna, freckles: philsFrecklesDna}, {network: network, logger: logger })

orchestrator.registerScenario("Set up Holochain for all players, DHTs and entries", async (s, t) => {
  const {phil, lucy, rudy, arthur, alice, mark} = await s.players({phil: philsConductorConfig, lucy: lucysConductorConfig, rudy: rudysConductorConfig, arthur: arthursConductorConfig, alice: alicesConductorConfig, mark: marksConductorConfig}, true)
  console.log("started_ok_demo")

  // managed fields list
  const fullNameId = await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Full Name", "ui": "text-field"}})
  console.log('fullNameId', fullNameId)
  const avatarId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Avatar","ui": "thumbnail"}})
  console.log('avatarId', avatarId)
  const bioId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Bio","ui": "text-area"}})
  console.log('bioId', bioId)
  const handleId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Handle","ui": "text-field"}})
  console.log('handleId', handleId)
  const profilePicId =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Profile Picture","ui": "image"}})
  console.log('profilePicId', profilePicId)
  const profileImages =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Profile Images","ui": "images"}})
  console.log('profileImages', profileImages)
  const urlProfileField =   await alice.call("fields", "fields", "create_field", {"base": "", "field_input" : {"name": "Url","ui": "text-field"}})
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
  const philMusicBio = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": bioId.Ok.id, "value": "  @philt3r is not a metaphor for a side affect, but rather a side affect of a metamorphosis. For a decade, he has planted smiles and swivelled dials along that great stretch of party paradise that is the east-coast of Australia. @philt3r’s sets started out spanning more genres than a well thought out German street parade, but now it's techno, phat, dark, dystopic TECHNO! @philt3r can read a crowd better than airport security, and take them further up than their overpriced tickets. But that's what we like about @philt3r, his lack of tickets on himself. So get your 'TECHNO!' on with @philt3r at your next attempt to escape reality!"}})
  console.log('philMusicBio', philMusicBio)
  const philMusicProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philt3r-profile.jpg')}})
  console.log('philMusicProfilePic', philMusicProfilePic)
  const philMusicProfileImages = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profileImages.Ok.id, "value": [{ name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }]}})
  console.log('philMusicProfileImages', philMusicProfileImages)

    // Lucy's Personal persona
  const lucyPersonalFullName = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Lucy Beadle"}})
  console.log('lucyPersonalFullName', lucyPersonalFullName)
  const lucyPersonalHandle = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "lucy.beadle"}})
  console.log('lucyPersonalHandle', lucyPersonalHandle)
  const lucyPersonalAvatar = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/lucy.jpg')}})
  console.log('lucyPersonalAvatar', lucyPersonalAvatar)
  const lucyPersonalUrl = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": urlProfileField.Ok.id, "value": "http://lucybeadle.blog"}})
  console.log('lucyPersonalUrl', lucyPersonalUrl)
  const lucyPersonalBio = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": bioId.Ok.id, "value": "A person I know."}})
  console.log('lucyPersonalBio', lucyPersonalBio)
  const lucyPersonalProfilePic = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/lucy.jpg')}})
  console.log('lucyPersonalProfilePic', lucyPersonalProfilePic)
  const lucyPersonalProfileImages = await lucy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profileImages.Ok.id, "value": [{ name:"", image: base64_encode('./assets/lucy.jpg') }, { name:"", image: base64_encode('./assets/lucy.jpg') }, { name:"", image: base64_encode('./assets/lucy.jpg') }]}})
  console.log('lucyPersonalProfileImages', lucyPersonalProfileImages)

  // Rudy's Personal persona
  const rudyPersonalFullName = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Rudy"}})
  console.log('rudyPersonalFullName', rudyPersonalFullName)
  const rudyPersonalHandle = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "rudy.beadle"}})
  console.log('rudyPersonalHandle', rudyPersonalHandle)
  const rudyPersonalAvatar = await rudy.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/rudy.jpeg')}})
  console.log('rudyPersonalAvatar', rudyPersonalAvatar)

  // Arthur's Personal persona
  const arthurPersonalFullName = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Arthur Brock"}})
  console.log('arthurPersonalFullName', arthurPersonalFullName)
  const arthurPersonalHandle = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "Art"}})
  console.log('arthurPersonalHandle', arthurPersonalHandle)
  const arthurPersonalAvatar = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/arthur.brock.png')}})
  console.log('arthurPersonalAvatar', arthurPersonalAvatar)

  // Arthur's Holochain persona
  const arthurHolochainHandle = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "arthur.brock"}})
  console.log('arthurHolochainHandle', arthurHolochainHandle)
  const arthurHolochainAvatar = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/arthur.brock.png')}})
  console.log('arthurHolochainAvatar', arthurHolochainAvatar)
  const arthurHolochainProfilePic = await arthur.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/art.profile.jpeg')}})
  console.log('arthurHolochainProfilePic', arthurHolochainProfilePic)
  
  const philOriginProfile = await phil.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philt3r.png'), "handle": "philip.beadle"}})
  console.log('philOriginProfile', philOriginProfile)
  const markOriginProfile = await mark.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mark.keenan.jpg'), "handle": "mark.keenan"}})
  console.log('markOriginProfile', markOriginProfile)
  const rudyOriginProfile = await rudy.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/rudy.jpeg'), "handle": "Rudy"}})
  console.log('rudyOriginProfile', rudyOriginProfile)
  const lucyOriginProfile = await lucy.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/lucy.jpg'), "handle": "Lucy"}})
  console.log('lucyOriginProfile', lucyOriginProfile)
  const aliceOriginProfile = await alice.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mhairi.jpg'), "handle": "Mha Iri"}})
  console.log('aliceOriginProfile', aliceOriginProfile)
  const artOriginProfile = await arthur.call("origins", "origins", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/arthur.brock.png'), "handle": "arthur.brock"}})
  console.log('artOriginProfile', artOriginProfile)

  const philFrecklesProfile = await phil.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philt3r.png'), "handle": "philip.freckle"}})
  console.log('philFrecklesProfile', philFrecklesProfile)
  const markFrecklesProfile = await mark.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mark.keenan.jpg'), "handle": "mark.keenan"}})
  console.log('markFrecklesProfile', markFrecklesProfile)
  const rudyFrecklesProfile = await rudy.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/rudy.jpeg'), "handle": "Rudy"}})
  console.log('rudyFrecklesProfile', rudyFrecklesProfile)
  const lucyFrecklesProfile = await lucy.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/lucy.jpg'), "handle": "Lucy"}})
  console.log('lucyFrecklesProfile', lucyFrecklesProfile)
  const aliceFrecklesProfile = await alice.call("freckles", "freckles", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mhairi.jpg'), "handle": "Mha Iri"}})
  console.log('aliceFrecklesProfile', aliceFrecklesProfile)

  const philKanbanProfile = await phil.call("kanban", "kanban", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philip.beadle.png'), "handle": "Phil"}})
  console.log('philKanbanProfile', philKanbanProfile)
  const markKanbanProfile = await mark.call("kanban", "kanban", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mark.keenan.jpg'), "handle": "Mark"}})
  console.log('markKanbanProfile', markKanbanProfile)
  const lucyKanbanProfile = await lucy.call("kanban", "kanban", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/lucy.jpg'), "handle": "Lucy"}})
  console.log('lucyKanbanProfile', lucyKanbanProfile)

  const philProjectsProfile = await phil.call("projects", "projects", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/philip.beadle.png'), "handle": "philip.beadle"}})
  console.log('philProjectsProfile', philProjectsProfile)
  const artProjectsProfile = await arthur.call("projects", "projects", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/arthur.brock.png'), "handle": "arthur.brock"}})
  console.log('artProjectsProfile', artProjectsProfile)
  const markProjectsProfile = await mark.call("projects", "projects", "create_profile", {"base": "", "profile_input" : {"agentId":"", "avatar": base64_encode('./assets/mark.keenan.jpg'), "handle": "Mark Keenan"}})
  console.log('markProjectsProfile', markProjectsProfile)

  await s.consistency()
})

orchestrator.run()
