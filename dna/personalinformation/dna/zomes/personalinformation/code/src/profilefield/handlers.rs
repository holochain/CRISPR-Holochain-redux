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
use crate::profilefield::{
    PROFILEFIELDS_ANCHOR_TYPE,
    PROFILEFIELD_ENTRY_LINK_TYPE,
    PROFILEFIELD_ENTRY_NAME,
    ProfilefieldEntry,
    Profilefield,
};

fn profilefields_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(PROFILEFIELDS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, profilefield_entry: ProfilefieldEntry) -> ZomeApiResult<Profilefield> {
    let entry = Entry::App(PROFILEFIELD_ENTRY_NAME.into(), profilefield_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let profilefield = Profilefield::new(entry_address.clone(), profilefield_entry)?;
    hdk::link_entries(&profilefields_anchor(base)?, &entry_address, PROFILEFIELD_ENTRY_LINK_TYPE, &profilefield.created_at.to_string())?;
    Ok(profilefield)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Profilefield> {
    let profilefield_entry: ProfilefieldEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(PROFILEFIELD_ENTRY_NAME.into(), profilefield_entry.clone().into()).address();
    Profilefield::existing(id.clone(), created_at, address, profilefield_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, profilefield_input: ProfilefieldEntry) -> ZomeApiResult<Profilefield> {
    let updated_entry_address = hdk::update_entry(Entry::App(PROFILEFIELD_ENTRY_NAME.into(), profilefield_input.clone().into()), &address.clone())?;
    Profilefield::existing(id.clone(), created_at, updated_entry_address, profilefield_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&profilefields_anchor(base)?, &id, PROFILEFIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Profilefield>> {
    hdk::get_links(&profilefields_anchor(base)?, LinkMatch::Exactly(PROFILEFIELD_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&profilefields_anchor(base_from)?, &id, PROFILEFIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&profilefields_anchor(base_to)?, &id, PROFILEFIELD_ENTRY_LINK_TYPE, &created_at.to_string())
}

