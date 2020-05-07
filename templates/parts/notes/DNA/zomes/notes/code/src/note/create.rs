pub fn create(base: String, note_entry: NoteEntry) -> ZomeApiResult<Note> {
    let entry = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let note = Note::new(entry_address.clone(), note_entry)?;
    hdk::link_entries(&notes_anchor(base)?, &entry_address, NOTE_ENTRY_LINK_TYPE, &note.created_at.to_string())?;
    Ok(note)
}