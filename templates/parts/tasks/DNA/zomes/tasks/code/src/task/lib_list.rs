    #[zome_fn("hc_public")]
    fn list_tasks() -> ZomeApiResult<Vec<Task>> {
        task::handlers::list()
    }