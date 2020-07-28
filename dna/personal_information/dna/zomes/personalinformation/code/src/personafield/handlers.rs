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
use crate::personafield::{
    PERSONAFIELDS_ANCHOR_TYPE,
    PERSONAFIELD_ENTRY_LINK_TYPE,
    PERSONAFIELD_ENTRY_NAME,
    PersonafieldEntry,
    Personafield,
};

fn personafields_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(PERSONAFIELDS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, personafield_entry: PersonafieldEntry) -> ZomeApiResult<Personafield> {
    let entry = Entry::App(PERSONAFIELD_ENTRY_NAME.into(), personafield_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let personafield = Personafield::new(entry_address.clone(), personafield_entry)?;
    hdk::link_entries(&personafields_anchor(base)?, &entry_address, PERSONAFIELD_ENTRY_LINK_TYPE, &personafield.created_at.to_string())?;
    Ok(personafield)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Personafield> {
    let personafield_entry: PersonafieldEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(PERSONAFIELD_ENTRY_NAME.into(), personafield_entry.clone().into()).address();
    Personafield::existing(id.clone(), created_at, address, personafield_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, personafield_input: PersonafieldEntry) -> ZomeApiResult<Personafield> {
    let updated_entry_address = hdk::update_entry(Entry::App(PERSONAFIELD_ENTRY_NAME.into(), personafield_input.clone().into()), &address.clone())?;
    Personafield::existing(id.clone(), created_at, updated_entry_address, personafield_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&personafields_anchor(base)?, &id, PERSONAFIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Personafield>> {
    hdk::get_links(&personafields_anchor(base)?, LinkMatch::Exactly(PERSONAFIELD_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&personafields_anchor(base_from)?, &id, PERSONAFIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&personafields_anchor(base_to)?, &id, PERSONAFIELD_ENTRY_LINK_TYPE, &created_at.to_string())
}

