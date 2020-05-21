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
use crate::freckle::{
    FRECKLES_ANCHOR_TYPE,
    FRECKLE_ENTRY_LINK_TYPE,
    FRECKLE_ENTRY_NAME,
    FreckleEntry,
    Freckle,
};

fn freckles_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(FRECKLES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, freckle_entry: FreckleEntry) -> ZomeApiResult<Freckle> {
    let entry = Entry::App(FRECKLE_ENTRY_NAME.into(), freckle_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let freckle = Freckle::new(entry_address.clone(), freckle_entry)?;
    hdk::link_entries(&freckles_anchor(base)?, &entry_address, FRECKLE_ENTRY_LINK_TYPE, &freckle.created_at.to_string())?;
    Ok(freckle)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Freckle> {
    let freckle_entry: FreckleEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(FRECKLE_ENTRY_NAME.into(), freckle_entry.clone().into()).address();
    Freckle::existing(id.clone(), created_at, address, freckle_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, freckle_input: FreckleEntry) -> ZomeApiResult<Freckle> {
    let updated_entry_address = hdk::update_entry(Entry::App(FRECKLE_ENTRY_NAME.into(), freckle_input.clone().into()), &address.clone())?;
    Freckle::existing(id.clone(), created_at, updated_entry_address, freckle_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&freckles_anchor(base)?, &id, FRECKLE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Freckle>> {
    hdk::get_links(&freckles_anchor(base)?, LinkMatch::Exactly(FRECKLE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&freckles_anchor(base_from)?, &id, FRECKLE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&freckles_anchor(base_to)?, &id, FRECKLE_ENTRY_LINK_TYPE, &created_at.to_string())
}

