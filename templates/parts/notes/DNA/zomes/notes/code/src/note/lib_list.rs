    #[zome_fn("hc_public")]
    fn list_notes(base: String) -> ZomeApiResult<Vec<Note>> {
        note::handlers::list(base)
    }