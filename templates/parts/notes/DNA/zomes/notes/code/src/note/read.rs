pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
    let note_entry: NoteEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into()).address();
    Note::existing(id.clone(), created_at, address, note_entry)
}