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
use crate::origin::{
    ORIGINS_ANCHOR_TYPE,
    ORIGIN_ENTRY_LINK_TYPE,
    ORIGIN_ENTRY_NAME,
    OriginEntry,
    Origin,
};

fn origins_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(ORIGINS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, origin_entry: OriginEntry) -> ZomeApiResult<Origin> {
    let entry = Entry::App(ORIGIN_ENTRY_NAME.into(), origin_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let origin = Origin::new(entry_address.clone(), origin_entry)?;
    hdk::link_entries(&origins_anchor(base)?, &entry_address, ORIGIN_ENTRY_LINK_TYPE, &origin.created_at.to_string())?;
    Ok(origin)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Origin> {
    let origin_entry: OriginEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(ORIGIN_ENTRY_NAME.into(), origin_entry.clone().into()).address();
    Origin::existing(id.clone(), created_at, address, origin_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, origin_input: OriginEntry) -> ZomeApiResult<Origin> {
    let updated_entry_address = hdk::update_entry(Entry::App(ORIGIN_ENTRY_NAME.into(), origin_input.clone().into()), &address.clone())?;
    Origin::existing(id.clone(), created_at, updated_entry_address, origin_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&origins_anchor(base)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Origin>> {
    hdk::get_links(&origins_anchor(base)?, LinkMatch::Exactly(ORIGIN_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&origins_anchor(base_from)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&origins_anchor(base_to)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())
}

