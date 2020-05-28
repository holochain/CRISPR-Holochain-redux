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
use crate::event::{
    EVENTS_ANCHOR_TYPE,
    EVENT_ENTRY_LINK_TYPE,
    EVENT_ENTRY_NAME,
    EventEntry,
    Event,
};

fn events_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(EVENTS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, event_entry: EventEntry) -> ZomeApiResult<Event> {
    let entry = Entry::App(EVENT_ENTRY_NAME.into(), event_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let event = Event::new(entry_address.clone(), event_entry)?;
    hdk::link_entries(&events_anchor(base)?, &entry_address, EVENT_ENTRY_LINK_TYPE, &event.created_at.to_string())?;
    Ok(event)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Event> {
    let event_entry: EventEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(EVENT_ENTRY_NAME.into(), event_entry.clone().into()).address();
    Event::existing(id.clone(), created_at, address, event_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, event_input: EventEntry) -> ZomeApiResult<Event> {
    let updated_entry_address = hdk::update_entry(Entry::App(EVENT_ENTRY_NAME.into(), event_input.clone().into()), &address.clone())?;
    Event::existing(id.clone(), created_at, updated_entry_address, event_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&events_anchor(base)?, &id, EVENT_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Event>> {
    hdk::get_links(&events_anchor(base)?, LinkMatch::Exactly(EVENT_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&events_anchor(base_from)?, &id, EVENT_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&events_anchor(base_to)?, &id, EVENT_ENTRY_LINK_TYPE, &created_at.to_string())
}

