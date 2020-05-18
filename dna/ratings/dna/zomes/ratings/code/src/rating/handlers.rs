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
use crate::rating::{
    RATINGS_ANCHOR_TYPE,
    RATING_ENTRY_LINK_TYPE,
    RATING_ENTRY_NAME,
    RatingEntry,
    Rating,
};

fn ratings_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(RATINGS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, rating_entry: RatingEntry) -> ZomeApiResult<Rating> {
    let entry = Entry::App(RATING_ENTRY_NAME.into(), rating_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let rating = Rating::new(entry_address.clone(), rating_entry)?;
    hdk::link_entries(&ratings_anchor(base)?, &entry_address, RATING_ENTRY_LINK_TYPE, &rating.created_at.to_string())?;
    Ok(rating)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Rating> {
    let rating_entry: RatingEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(RATING_ENTRY_NAME.into(), rating_entry.clone().into()).address();
    Rating::existing(id.clone(), created_at, address, rating_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, rating_input: RatingEntry) -> ZomeApiResult<Rating> {
    let updated_entry_address = hdk::update_entry(Entry::App(RATING_ENTRY_NAME.into(), rating_input.clone().into()), &address.clone())?;
    Rating::existing(id.clone(), created_at, updated_entry_address, rating_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&ratings_anchor(base)?, &id, RATING_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Rating>> {
    hdk::get_links(&ratings_anchor(base)?, LinkMatch::Exactly(RATING_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&ratings_anchor(base_from)?, &id, RATING_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&ratings_anchor(base_to)?, &id, RATING_ENTRY_LINK_TYPE, &created_at.to_string())
}

