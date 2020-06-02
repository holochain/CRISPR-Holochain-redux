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
use crate::project::{
    PROJECTS_ANCHOR_TYPE,
    PROJECT_ENTRY_LINK_TYPE,
    PROJECT_ENTRY_NAME,
    ProjectEntry,
    Project,
};

fn projects_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(PROJECTS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, project_entry: ProjectEntry) -> ZomeApiResult<Project> {
    let entry = Entry::App(PROJECT_ENTRY_NAME.into(), project_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let project = Project::new(entry_address.clone(), project_entry)?;
    hdk::link_entries(&projects_anchor(base)?, &entry_address, PROJECT_ENTRY_LINK_TYPE, &project.created_at.to_string())?;
    Ok(project)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Project> {
    let project_entry: ProjectEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(PROJECT_ENTRY_NAME.into(), project_entry.clone().into()).address();
    Project::existing(id.clone(), created_at, address, project_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, project_input: ProjectEntry) -> ZomeApiResult<Project> {
    let updated_entry_address = hdk::update_entry(Entry::App(PROJECT_ENTRY_NAME.into(), project_input.clone().into()), &address.clone())?;
    Project::existing(id.clone(), created_at, updated_entry_address, project_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&projects_anchor(base)?, &id, PROJECT_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Project>> {
    hdk::get_links(&projects_anchor(base)?, LinkMatch::Exactly(PROJECT_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&projects_anchor(base_from)?, &id, PROJECT_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&projects_anchor(base_to)?, &id, PROJECT_ENTRY_LINK_TYPE, &created_at.to_string())
}

