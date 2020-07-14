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
use crate::bubble::{
    BUBBLES_ANCHOR_TYPE,
    BUBBLE_ENTRY_LINK_TYPE,
    BUBBLE_ENTRY_NAME,
    BubbleEntry,
    Bubble,
};

fn bubbles_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(BUBBLES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, bubble_entry: BubbleEntry) -> ZomeApiResult<Bubble> {
    let entry = Entry::App(BUBBLE_ENTRY_NAME.into(), bubble_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let bubble = Bubble::new(entry_address.clone(), bubble_entry)?;
    hdk::link_entries(&bubbles_anchor(base)?, &entry_address, BUBBLE_ENTRY_LINK_TYPE, &bubble.created_at.to_string())?;
    Ok(bubble)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Bubble> {
    let bubble_entry: BubbleEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(BUBBLE_ENTRY_NAME.into(), bubble_entry.clone().into()).address();
    Bubble::existing(id.clone(), created_at, address, bubble_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, bubble_input: BubbleEntry) -> ZomeApiResult<Bubble> {
    let updated_entry_address = hdk::update_entry(Entry::App(BUBBLE_ENTRY_NAME.into(), bubble_input.clone().into()), &address.clone())?;
    Bubble::existing(id.clone(), created_at, updated_entry_address, bubble_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&bubbles_anchor(base)?, &id, BUBBLE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Bubble>> {
    hdk::get_links(&bubbles_anchor(base)?, LinkMatch::Exactly(BUBBLE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&bubbles_anchor(base_from)?, &id, BUBBLE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&bubbles_anchor(base_to)?, &id, BUBBLE_ENTRY_LINK_TYPE, &created_at.to_string())
}

