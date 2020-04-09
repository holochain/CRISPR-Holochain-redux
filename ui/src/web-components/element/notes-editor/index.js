import { LitElement, html, css } from 'lit-element'
import { moduleConnect } from '@uprtcl/micro-orchestrator'
import { ApolloClientModule } from '@uprtcl/graphql'
import '@material/mwc-button'
import '@material/mwc-textfield'
import '@material/mwc-textarea'
import LIST_NOTES_QUERY from './graphql/listNotesQuery'
import CREATE_NOTE_MUTATION from './graphql/createNoteMutation'
import UPDATE_NOTE_MUTATION from './graphql/updateNoteMutation'
import REMOVE_NOTE_MUTATION from './graphql/removeNoteMutation'

export class NotesEditor extends moduleConnect(LitElement) {
  static get properties () {
    return {
      listNotes: { type: Array },
      editingNoteId: { type: String }
    }
  }

  static get styles () {
    return css`
      .notes-happ {
        display: flex;
        padding: 50px;
        align-items: center;
        flex-direction: column;
      }
      
      .note-card {
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 0px 20px 20px;
        margin-bottom: 20px;
        width: 400px;
      }
      
      .note-content {
        margin-bottom: 20px;
      }
      
      .note-form {
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 0px 20px 20px;
        margin-bottom: 20px;
        width: 400px;
      }
      
      .form-row {
        display: flex;
        margin-bottom: 20px;
      }
      
      .form-row > mwc-textfield {
        flex: 4;
      }
      
      .form-row > mwc-textarea {
        flex: 4;
      }
    `
  }

  async firstUpdated () {
    this.apolloClient = this.request(ApolloClientModule.bindings.Client)
    this.mode = 'Add'
    this.loadNotes()
  }

  render () {
    if (this.listNotes === undefined) {
      return html`<p>Loading....</p>`
    }
    return html`
    <div class='notes-happ'>
      ${this.renderEditNote({ title: '', content: '' })}
      <div class='note-list'>
        ${this.listNotes.map(note => this.renderNote(note))}
      </div>
    </div>
    `
  }

  renderNote (note) {
    if (note.id === this.editingNoteId) {
      this.mode = 'Update'
      return this.renderEditNote(note)
    }
    this.mode = 'Add'
    return html`
      <div class='note-card'>
        <h3>${note.title}</h3>
        <div class='note-content'>${note.content}</div>
        <mwc-button outlined label="Edit" @click=${() => this.setEditingId(note.id)}></mwc-button>
        <mwc-button outlined label="Remove" @click=${() => this.removeNote(note)}></mwc-button>
      </div>
    `
  }

  renderEditNote (note) {
    return html`
    <div class='note-form'>
      <h3 class='red'>${this.mode} Note</h3>
      <div class='form-row'>
        <mwc-textfield outlined label="The Title" id="title" .value=${note.title} @change=${e => { note.title = e.target.value }}></mwc-textfield>
      </div>
      <div class='form-row'>
        <mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${e => { note.content = e.target.value }}></mwc-textarea>
      </div>
      <div>
        <mwc-button outlined label="${this.mode}" @click=${() => {
            this.editNote(note)
            this.shadowRoot.getElementById('title').value = ''
            this.shadowRoot.getElementById('content').value = ''
          }
        }></mwc-button>
      </div>
    </div>
    `
  }

  async loadNotes () {
    const result = await this.apolloClient.query({ query: LIST_NOTES_QUERY })
    console.log('result')
    console.log(result)
    this.listNotes = result.data.listNotes
  }

  async editNote (note) {
    const noteInput = { title: note.title, content: note.content }
    this.editingNoteId = ''
    if (note.id === undefined) {
      const newNote = await this.apolloClient.mutate({ mutation: CREATE_NOTE_MUTATION, variables: { noteInput: noteInput } })
      this.listNotes.splice(0, 0, newNote.data.createNote)
      this.requestUpdate()
    } else {
      const existingNote = this.listNotes.find(listNote => listNote.id === note.id)
      existingNote.title = note.title
      existingNote.content = note.content
      await this.apolloClient.mutate({ mutation: UPDATE_NOTE_MUTATION, variables: { id: note.id, noteInput: noteInput } })
      this.requestUpdate()
    }
  }

  async removeNote (note) {
    this.editingNoteId = ''
    this.listNotes = this.listNotes.filter(listNote => listNote.id !== note.id)
    await this.apolloClient.mutate({ mutation: REMOVE_NOTE_MUTATION, variables: { id: note.id } })
    this.requestUpdate()
  }

  async setEditingId (id) {
    this.editingNoteId = id
  }
}
