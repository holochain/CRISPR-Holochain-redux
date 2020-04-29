    #[zome_fn("hc_public")]
    fn create_note(base: String, note_input: NoteEntry) -> ZomeApiResult<Note> {
        note::handlers::create(base, note_input)
    }