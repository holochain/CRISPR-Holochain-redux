    #[zome_fn("hc_public")]
    fn read_note(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
        note::handlers::read(id, created_at)
    }