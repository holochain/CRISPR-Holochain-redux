pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Task> {
    let task_entry: TaskEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(TASK_ENTRY_NAME.into(), task_entry.clone().into()).address();
    Task::existing(id.clone(), created_at, address, task_entry)
}