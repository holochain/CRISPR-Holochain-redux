const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const directoryPath = path.join(__dirname, './holochain-events');
const port = 33000;
const { connect } = require('@holochain/hc-web-client')
// const holochainConnection = connect({ url: `ws://localhost:${port}` })
const net = require('net')
const client = new net.Socket()
let holochainConnections = []
const events = []

function base64Encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

function executeEvent(sortedEvents, index) {
  // console.log(sortedEvents)
  const eventLog = sortedEvents[index]
  if (eventLog === undefined) return
  eventLog.event.args.repeat = true
  console.log(holochainConnections.find(h => h.url === eventLog.event.url))
  holochainConnections.find(h => h.url === eventLog.event.url).holochainConnection.then(({ callZome }) => {
    console.log(eventLog)
    console.log(eventLog.event.instance_id, eventLog.event.zome, eventLog.event.function)
    callZome(eventLog.event.instance_id, eventLog.event.zome, eventLog.event.function)( eventLog.event.args )
    .then((result) => {
      console.log('result', result)
      executeEvent(sortedEvents, index + 1)
    })
  })
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
        holochainConnections = [{
          url: 'ws://localhost:33000',
          holochainConnection: connect({ url: 'ws://localhost:33000' })
        },
        {
          url: 'ws://localhost:33001',
          holochainConnection: connect({ url: 'ws://localhost:33001' })
        },
        {
          url: 'ws://localhost:33002',
          holochainConnection: connect({ url: 'ws://localhost:33002' })
        },
        {
          url: 'ws://localhost:33003',
          holochainConnection: connect({ url: 'ws://localhost:33003' })
        },
        {
          url: 'ws://localhost:33004',
          holochainConnection: connect({ url: 'ws://localhost:33004' })
        },
        {
          url: 'ws://localhost:33005',
          holochainConnection: connect({ url: 'ws://localhost:33005' })
        }]
        setTimeout(() => {
          fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err)
            } 
            files.forEach(function (file) {
                events.push({ timestamp: parseInt(file.replace('.json', ''), 10), event: JSON.parse(fs.readFileSync(`${directoryPath}/${file}`, 'utf-8'))})
            });
            console.log('sortedEvents', directoryPath)
            events.sort((a, b) => {
              let compare = 0
              if (a.timestamp > b.timestamp) {
                compare = 1
              } else if (b.timestamp > a.timestamp) {
                compare = -1
              }
              return compare
            })
            executeEvent(events, 0)
          })
        }, 1000)
      }
    })
}
tryConnection()

client.on('error', () => {
  console.log('Waiting for Holochain to configure and boot')
  setTimeout(tryConnection, 5000)
})
