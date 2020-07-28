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
    api::AGENT_ADDRESS,
};
use holochain_anchors::anchor;
use crate::profile::{
    PROFILES_ANCHOR_TYPE,
    PROFILE_ENTRY_LINK_TYPE,
    PROFILE_ENTRY_NAME,
    ProfileEntry,
    Profile,
};

fn profiles_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(PROFILES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, mut profile_entry: ProfileEntry) -> ZomeApiResult<Profile> {
    profile_entry.agent_id = AGENT_ADDRESS.to_string();
    let entry = Entry::App(PROFILE_ENTRY_NAME.into(), profile_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let profile = Profile::new(entry_address.clone(), profile_entry)?;
    hdk::link_entries(&profiles_anchor(base)?, &entry_address, PROFILE_ENTRY_LINK_TYPE, &profile.created_at.to_string())?;
    Ok(profile)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Profile> {
    let profile_entry: ProfileEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(PROFILE_ENTRY_NAME.into(), profile_entry.clone().into()).address();
    Profile::existing(id.clone(), created_at, address, profile_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, profile_input: ProfileEntry) -> ZomeApiResult<Profile> {
    let updated_entry_address = hdk::update_entry(Entry::App(PROFILE_ENTRY_NAME.into(), profile_input.clone().into()), &address.clone())?;
    Profile::existing(id.clone(), created_at, updated_entry_address, profile_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&profiles_anchor(base)?, &id, PROFILE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Profile>> {
    hdk::get_links(&profiles_anchor(base)?, LinkMatch::Exactly(PROFILE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

