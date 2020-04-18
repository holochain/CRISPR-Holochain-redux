    #[zome_fn("hc_public")]
    fn update_note(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
        note::handlers::update(id, created_at, address, note_input)
    }