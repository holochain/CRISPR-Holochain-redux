import { profiles } from './profiles.js'
import { personas } from './personas.js'
import { fieldNames } from './fieldNames.js'

export const hApps = [
  {
    id: 'QmCulture',
    name: 'Culture',
    folder: '/Users/philipbeadle/holochain/hApps/Culture',
    url: '/happ-store/Culture',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'IDE for building Holochain hApps from models and templates. Uses Holochain anchors as a git like source control with branching, permission control and traceability of changes.',
    zomes: [
      {
        id: 'QmCultureZome',
        name: 'Culture',
        anchors: [
          {
            type: 'branch',
            text: '',
            links: []
          },
          {
            type: 'branch',
            text: 'name of branch',
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branch',
                type: 'branches'
              }
            ]
          }
        ],
        entryTypes: [
          {
            name: 'hApp',
            update: true,
            delete: true,
            revisons: true,
            fields: [
              {
                id: 'Qm11',
                fieldName: 'name',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'folder',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'url',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'contact',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'mobile',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'description',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branchname of branch',
                type: 'branch'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
            },
            testData: {
              create: {
                anchor: {
                  type: 'branch',
                  text: 'master'
                },
                name: 'hApp name',
                folder: '/hApp',
                url: '/happ-store/hApp',
                contact: 'Contact',
                mobile: '+61 999 999 999',
                description: 'hApp description'
              },
              update: {
                name: 'Update hApp name',
                folder: 'Update /hApp',
                url: 'Update /happ-store/hApp',
                contact: 'Update Contact',
                mobile: 'Update +61 999 999 999',
                description: 'Update hApp description'
              },
              list: []
            }
          },
          {
            name: 'zome',
            update: true,
            delete: true,
            revisons: true,
            anchors: [],
            fields: [
              {
                id: 'Qm11',
                fieldName: 'name',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'description',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branchname of branch',
                type: 'branch'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
            },
            testData: {
              create: {
                anchor: {
                  type: 'branch',
                  text: 'master'
                },
                name: 'hApp name',
                folder: '/hApp',
                url: '/happ-store/hApp',
                contact: 'Contact',
                mobile: '+61 999 999 999',
                description: 'hApp description'
              },
              update: {
                name: 'Update hApp name',
                folder: 'Update /hApp',
                url: 'Update /happ-store/hApp',
                contact: 'Update Contact',
                mobile: 'Update +61 999 999 999',
                description: 'Update hApp description'
              },
              list: []
            }
          }
        ],
        profileSpecs: []
      }
    ],
    modules: []
  },
  {
    id: 'Qmmorebighashes333',
    name: 'Notes',
    folder: '/Users/philipbeadle/holochain/hApps/Notes',
    url: '/happ-store/Notes',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'A Holochain hApp that demonstrates how to build a CRUD hApp with Holochain.\nSelecting permissions and roles generates the code for the Zome Pattern based on Entry Type fields and links.\nAlso shows how to integrate roles and permissions into Entry Types.',
    zomes: [
      {
        id: 'Qmmorehas444',
        name: 'Notes',
        anchors: [
          {
            type: 'ListNotes',
            text: '',
            links: []
          }
        ],
        entryTypes: [
          {
            name: 'Note',
            fields: [
              {
                id: 'Qm11',
                fieldName: 'id',
                fieldType: 'Address'
              },
              {
                id: 'Qm12',
                fieldName: 'created_at',
                fieldType: 'Iso8601'
              },
              {
                id: 'Qm12',
                fieldName: 'updated_at',
                fieldType: 'Iso8601'
              },
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'ListNotes',
                type: 'notes'
              }
            ],
            pattern: `<h1>Pattern 3</h1>
            <h2>Constant Id Entry - linked to anchor --> can list entries</h2> 
            <ul>
            <li class="has-line-data" data-line-start="1" data-line-end="7">Developer defined fields
            <ul>
            <li class="has-line-data" data-line-start="2" data-line-end="3">id (reserved field name)</li>
            <li class="has-line-data" data-line-start="3" data-line-end="4">created_at (reserved field name)</li>
            <li class="has-line-data" data-line-start="4" data-line-end="5">updated_at (reserved field name)</li>
            <li class="has-line-data" data-line-start="5" data-line-end="6">title [textfield]</li>
            <li class="has-line-data" data-line-start="6" data-line-end="7">content [textarea]</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="7" data-line-end="14">Generated Structs
            <ul>
            <li class="has-line-data" data-line-start="8" data-line-end="9">type_3_entry</li>
            <li class="has-line-data" data-line-start="9" data-line-end="12">type_3_id
            <ul>
            <li class="has-line-data" data-line-start="10" data-line-end="11">initial_entry_address [address of intial type_2_entry]</li>
            <li class="has-line-data" data-line-start="11" data-line-end="12">initial_entry_created_at [created_at of intial type_2_entry]</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="12" data-line-end="14">type_3
            <ul>
            <li class="has-line-data" data-line-start="13" data-line-end="14">[type_3.id = address of type_3_id, type_3.created_at = type_3_id.created_at, type_3.updated_at = type_3_entry.created_at, type_3_entry]</li>
            </ul>
            </li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="14" data-line-end="17">Links
            <ul>
            <li class="has-line-data" data-line-start="15" data-line-end="16">from type_3_id</li>
            <li class="has-line-data" data-line-start="16" data-line-end="17">type_3_id from type_3</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="17" data-line-end="20">Anchors
            <ul>
            <li class="has-line-data" data-line-start="18" data-line-end="19">AnchorType “type_3_list”</li>
            <li class="has-line-data" data-line-start="19" data-line-end="20">AnchorText “”</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="20" data-line-end="36">zome_fns
            <ul>
            <li class="has-line-data" data-line-start="21" data-line-end="28">[] create_entry(type_3_entry) --&gt; type_3[type_3.id = Address type_3_id, type_3.created_at = type_3_id.initial_entry_created_at, type_3.updated_at = type_3_id.initial_entry_created_at]
            <ul>
            <li class="has-line-data" data-line-start="22" data-line-end="23">commit type_3_entry</li>
            <li class="has-line-data" data-line-start="23" data-line-end="26">new type_3_id
            <ul>
            <li class="has-line-data" data-line-start="24" data-line-end="25">initial_entry_address [address of intial type_3_entry]</li>
            <li class="has-line-data" data-line-start="25" data-line-end="26">initial_entry_created_at [created_at of intial type_3_entry]</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="26" data-line-end="27">link type_3_id --&gt; new type_3_entry</li>
            <li class="has-line-data" data-line-start="27" data-line-end="28">link type_3_list --&gt; new type_3_id</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="28" data-line-end="31">[] modify_entry(type_3) --&gt; type_3[type_3.updated_at = type_3_entry.timestamp]
            <ul>
            <li class="has-line-data" data-line-start="29" data-line-end="30">link type_3_id --&gt; new type_3_entry</li>
            <li class="has-line-data" data-line-start="30" data-line-end="31">Remove old link type_3_id --&gt; previous type_3_entry</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="31" data-line-end="36">[] remove_entry(type_3.Id) --&gt; Address
            <ul>
            <li class="has-line-data" data-line-start="32" data-line-end="33">Remove link type_3_id --&gt; type_3_entry</li>
            <li class="has-line-data" data-line-start="33" data-line-end="34">Remove link type_3_list --&gt; type_3_id</li>
            <li class="has-line-data" data-line-start="34" data-line-end="35">Remove type_3_id</li>
            <li class="has-line-data" data-line-start="35" data-line-end="36">Remove type_3_entry</li>
            </ul>
            </li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="36" data-line-end="43">UI
            <ul>
            <li class="has-line-data" data-line-start="37" data-line-end="43">Item
            <ul>
            <li class="has-line-data" data-line-start="38" data-line-end="39">id [text]</li>
            <li class="has-line-data" data-line-start="39" data-line-end="40">created_at [text]</li>
            <li class="has-line-data" data-line-start="40" data-line-end="41">updated_at [text]</li>
            <li class="has-line-data" data-line-start="41" data-line-end="42">title [textfield]</li>
            <li class="has-line-data" data-line-start="42" data-line-end="43">content [textarea]</li>
            </ul>
            </li>
            </ul>
            </li>
            </ul>`
          },
          {
            name: 'NoteWithId',
            fields: [
              {
                id: 'Qm11',
                fieldName: 'id',
                fieldType: 'Address'
              },
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String'
              }
            ],
            links: [],
            pattern: `<h1>Pattern 2</h1>
            <h2>Constant Id Entry - not linked to anchor --> No list feature</h2> 
            <ul>
              <li class="has-line-data" data-line-start="0" data-line-end="4">Developer defined fields
              <ul>
              <li class="has-line-data" data-line-start="1" data-line-end="2">id (reserved field name)</li>
              <li class="has-line-data" data-line-start="2" data-line-end="3">title [textfield]</li>
              <li class="has-line-data" data-line-start="3" data-line-end="4">content [textarea]</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="4" data-line-end="11">Generated Structs
              <ul>
              <li class="has-line-data" data-line-start="5" data-line-end="6">type_2_entry</li>
              <li class="has-line-data" data-line-start="6" data-line-end="9">type_2_id
              <ul>
              <li class="has-line-data" data-line-start="7" data-line-end="8">initial_entry_address [address of intial type_2_entry]</li>
              <li class="has-line-data" data-line-start="8" data-line-end="9">initial_entry_created_at [created_at of intial type_2_entry]</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="9" data-line-end="11">type_2
              <ul>
              <li class="has-line-data" data-line-start="10" data-line-end="11">[type_2_entry, address of type_2_id]</li>
              </ul>
              </li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="11" data-line-end="13">Links
              <ul>
              <li class="has-line-data" data-line-start="12" data-line-end="13">from type_2_id</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="13" data-line-end="14">Anchors []</li>
              <li class="has-line-data" data-line-start="14" data-line-end="27">zome_fns
              <ul>
              <li class="has-line-data" data-line-start="15" data-line-end="21">[] create_entry(type_2_entry) --&gt; type_2[type_2.id = Address of type_2_id]
              <ul>
              <li class="has-line-data" data-line-start="16" data-line-end="17">commit type_2_entry</li>
              <li class="has-line-data" data-line-start="17" data-line-end="20">new type_2_id
              <ul>
              <li class="has-line-data" data-line-start="18" data-line-end="19">initial_entry_address [address of intial type_2_entry]</li>
              <li class="has-line-data" data-line-start="19" data-line-end="20">initial_entry_created_at [created_at of intial type_2_entry]</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="20" data-line-end="21">link type_2_id --&gt; new type_2_entry</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="21" data-line-end="24">[] modify_entry(type_2), type_2_id (doesnt change)
              <ul>
              <li class="has-line-data" data-line-start="22" data-line-end="23">link type_2_id --&gt; new type_2_entry</li>
              <li class="has-line-data" data-line-start="23" data-line-end="24">Remove old link type_2_id --&gt; previous type_2_entry</li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="24" data-line-end="27">[] remove_entry(type_2.Id) --&gt; Address
              <ul>
              <li class="has-line-data" data-line-start="25" data-line-end="26">Remove link type_2_id --&gt; type_2_entry</li>
              <li class="has-line-data" data-line-start="26" data-line-end="27">Remove type_2_entry</li>
              </ul>
              </li>
              </ul>
              </li>
              <li class="has-line-data" data-line-start="27" data-line-end="32">UI
              <ul>
              <li class="has-line-data" data-line-start="28" data-line-end="32">Item
              <ul>
              <li class="has-line-data" data-line-start="29" data-line-end="30">id [text]</li>
              <li class="has-line-data" data-line-start="30" data-line-end="31">title [textfield]</li>
              <li class="has-line-data" data-line-start="31" data-line-end="32">content [textarea]</li>
              </ul>
              </li>
              </ul>
              </li>
              </ul>`
          },
          {
            name: 'NoteBasic',
            fields: [
              {
                id: 'Qm11',
                fieldName: 'address',
                fieldType: 'Address'
              },
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String'
              }
            ],
            links: [],
            pattern: `<h1>Pattern 1</h1>
            <h2>Basic Entry</h2>
            <ul>
            <li class="has-line-data" data-line-start="0" data-line-end="3">Developer defined fields
            <ul>
            <li class="has-line-data" data-line-start="1" data-line-end="2">title {String,textfield}</li>
            <li class="has-line-data" data-line-start="2" data-line-end="3">content {String,textarea}</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="3" data-line-end="7">Generated Structs
            <ul>
            <li class="has-line-data" data-line-start="4" data-line-end="5">type_1_entry</li>
            <li class="has-line-data" data-line-start="5" data-line-end="7">type_1
            <ul>
            <li class="has-line-data" data-line-start="6" data-line-end="7">[address, address of type_1_entry]</li>
            </ul>
            </li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="7" data-line-end="8">Links []</li>
            <li class="has-line-data" data-line-start="8" data-line-end="9">Anchors []</li>
            <li class="has-line-data" data-line-start="9" data-line-end="10">Assumes that parent app is keeping track of Address such as a Comment entry linked to a Post.</li>
            <li class="has-line-data" data-line-start="10" data-line-end="17">zome_fns
            <ul>
            <li class="has-line-data" data-line-start="11" data-line-end="13">[] create_entry(type_1_entry) --&gt; type_1[type_1.address = Address(type_1_id)]
            <ul>
            <li class="has-line-data" data-line-start="12" data-line-end="13">commit type_1_entry</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="13" data-line-end="15">[] modify_entry(type_1) --&gt; type_1[type_1.address = Modified Address(type_1_id)]
            <ul>
            <li class="has-line-data" data-line-start="14" data-line-end="15">modify type_1_entry</li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="15" data-line-end="17">[] remove_entry(type_1.address) --&gt; Removed Address(type_1_id)
            <ul>
            <li class="has-line-data" data-line-start="16" data-line-end="17">remove type_1_entry</li>
            </ul>
            </li>
            </ul>
            </li>
            <li class="has-line-data" data-line-start="17" data-line-end="22">UI
            <ul>
            <li class="has-line-data" data-line-start="18" data-line-end="22">Item
            <ul>
            <li class="has-line-data" data-line-start="19" data-line-end="20">[] address [text]</li>
            <li class="has-line-data" data-line-start="20" data-line-end="21">[] title [textfield]</li>
            <li class="has-line-data" data-line-start="21" data-line-end="22">[] content [textarea]</li>
            </ul>
            </li>
            </ul>
            </li>
            </ul>`
          }
        ],
        profileSpecs: []
      },
      {
        id: 'Qmmorehas444',
        name: 'Notes',
        anchors: [
          {
            name: '',
            type: 'Notes',
            text: 'ListNotes',
            links: []
          }
        ],
        entryTypes: [
          {
            name: 'NoteId',
            fields: [
              {
                id: 'Qm11',
                fieldName: 'initial_entry_address',
                fieldType: 'String'
              },
              {
                id: 'Qm12',
                fieldName: 'initial_entry_created_at',
                fieldType: 'Iso8601'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'NotesListNotes',
                type: 'notes'
              }
            ]
          },
          {
            name: 'NoteEntry',
            update: true,
            delete: true,
            fields: [
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'entryType',
                entityName: 'NoteId',
                type: 'entry'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
            },
            testData: {
              create: { title: 'Note 1 title', content: 'Note 1 content' },
              update: [
                { title: 'Updated Note 1 title', content: 'Updated Note 1 content' },
                { title: 'Updated Again Note 1 title', content: 'Updated Again Note 1 content' }
              ],
              list: [
                { title: 'Note 1 title', content: 'Note 1 content' },
                { title: 'Note 2 title', content: 'Note 2 content' },
                { title: 'Note 3 title', content: 'Note 3 content' },
                { title: 'Note 4 title', content: 'Note 4 content' }
              ]
            }
          }
        ],
        profileSpecs: []
      }
    ],
    modules: [{
      name: 'Profile Website Builder',
      data: {
        profiles: profiles,
        personas: personas,
        fieldNames: fieldNames
      }
    }]
  },
  {
    id: 'Qmmorebighashes',
    name: 'eat-sleep-code-repeat',
    folder: '/Users/philipbeadle/eat-sleep-code-repeat/dashboard',
    url: '/happ-store/eat-sleep-code-repeat',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'Build and publish static websites from templates and player profiles.',
    zomes: [
      {
        id: 'Qmmorehas444',
        name: 'ProfileWebsites',
        anchors: [
          {
            type: 'Profile Websites',
            text: ''
          }
        ],
        entryTypes: [
          {
            name: 'ProfileWebsite',
            update: true,
            delete: true,
            fields: [
              {
                id: 'QmProfileWebsite1',
                fieldName: 'id',
                fieldType: 'String'
              },
              {
                id: 'QmProfileWebsite2',
                fieldName: 'created_at',
                fieldType: 'Iso8601'
              },
              {
                id: 'QmProfileWebsite3',
                fieldName: 'domain',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'Profile Websites',
                type: 'profile_websites_link'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
            },
            testData: {
              create: { domain: 'www.domain.demo' },
              update: [
                { domain: 'Updated www.domain.demo' },
                { domain: 'Updated Again www.domain.demo' }
              ],
              list: [
                { domain: 'www.domain.demo 1' },
                { domain: 'www.domain.demo 2' },
                { domain: 'www.domain.demo 3' },
                { domain: 'www.domain.demo 4' }
              ]
            }
          }
        ],
        profileSpecs: []
      }
    ],
    modules: []
  },
  {
    name: 'my-info',
    folder: '/Users/philipbeadle/holochain/hApps/my-info',
    url: '/entry-types',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'Manage personal information. Information requested by hApps is mapped to the hApp from the players personal my-info hApp.',
    zomes: []
  }
]
