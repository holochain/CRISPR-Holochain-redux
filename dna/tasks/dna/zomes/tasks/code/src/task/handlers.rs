use std::convert::TryFrom;
use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{
        entry::Entry,
        time::Iso8601,
    },
    holochain_persistence_api::cas::content::{
        Address,
        AddressableContent,
    },
    prelude::*,
};
use holochain_anchors::anchor;
use crate::task::{
    TASKS_ANCHOR_TYPE,
    TASK_ENTRY_LINK_TYPE,
    TASK_ENTRY_NAME,
    TaskEntry,
    Task,
};

fn tasks_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(TASKS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, task_entry: TaskEntry) -> ZomeApiResult<Task> {
    let task_anchor = tasks_anchor(base)?;
    let entry = Entry::App(TASK_ENTRY_NAME.into(), task_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let task = Task::new(entry_address.clone(), task_entry)?;
    hdk::link_entries(&task_anchor, &entry_address, TASK_ENTRY_LINK_TYPE, &task.created_at.to_string())?;
    Ok(task)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Task> {
    let task_entry: TaskEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(TASK_ENTRY_NAME.into(), task_entry.clone().into()).address();
    Task::existing(id.clone(), created_at, address, task_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, task_input: TaskEntry) -> ZomeApiResult<Task> {
    let updated_entry_address = hdk::update_entry(Entry::App(TASK_ENTRY_NAME.into(), task_input.clone().into()), &address.clone())?;
    Task::existing(id.clone(), created_at, updated_entry_address, task_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&tasks_anchor(base)?, &id, TASK_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Task>> {
    hdk::get_links(&tasks_anchor(base)?, LinkMatch::Exactly(TASK_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

