    #[zome_fn("hc_public")]
    fn list_tasks(base: String) -> ZomeApiResult<Vec<Task>> {
        task::handlers::list(base)
    }