pub fn create(task_entry: TaskEntry) -> ZomeApiResult<Task> {
    let task_anchor = tasks_anchor()?;
    let entry = Entry::App(TASK_ENTRY_NAME.into(), task_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let task = Task::new(entry_address.clone(), task_entry)?;
    hdk::link_entries(&task_anchor, &entry_address, TASK_ENTRY_LINK_TYPE, &task.created_at.to_string())?;
    Ok(task)
}