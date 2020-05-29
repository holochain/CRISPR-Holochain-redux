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
use crate::website::{
    WEBSITES_ANCHOR_TYPE,
    WEBSITE_ENTRY_LINK_TYPE,
    WEBSITE_ENTRY_NAME,
    WebsiteEntry,
    Website,
};

fn websites_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(WEBSITES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, website_entry: WebsiteEntry) -> ZomeApiResult<Website> {
    let entry = Entry::App(WEBSITE_ENTRY_NAME.into(), website_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let website = Website::new(entry_address.clone(), website_entry)?;
    hdk::link_entries(&websites_anchor(base)?, &entry_address, WEBSITE_ENTRY_LINK_TYPE, &website.created_at.to_string())?;
    Ok(website)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Website> {
    let website_entry: WebsiteEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(WEBSITE_ENTRY_NAME.into(), website_entry.clone().into()).address();
    Website::existing(id.clone(), created_at, address, website_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, website_input: WebsiteEntry) -> ZomeApiResult<Website> {
    let updated_entry_address = hdk::update_entry(Entry::App(WEBSITE_ENTRY_NAME.into(), website_input.clone().into()), &address.clone())?;
    Website::existing(id.clone(), created_at, updated_entry_address, website_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&websites_anchor(base)?, &id, WEBSITE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Website>> {
    hdk::get_links(&websites_anchor(base)?, LinkMatch::Exactly(WEBSITE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&websites_anchor(base_from)?, &id, WEBSITE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&websites_anchor(base_to)?, &id, WEBSITE_ENTRY_LINK_TYPE, &created_at.to_string())
}

