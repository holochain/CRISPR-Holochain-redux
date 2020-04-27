    #[zome_fn("hc_public")]
    fn create_task(task_input: TaskEntry) -> ZomeApiResult<Task> {
        task::handlers::create(task_input)
    }