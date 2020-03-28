use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{
        entry::Entry,
    },
    holochain_persistence_api::cas::content::{
        Address,
        AddressableContent
    },
    prelude::*,
};
use holochain_anchors::anchor;
use crate::happ::{
    HappEntry,
    Happ,
    HAPP_ENTRY_NAME,
    HAPPS_ANCHOR_TYPE,
    HAPPS_ANCHOR_TEXT,
    HAPP_LINK_TYPE
};

fn happs_anchor() -> ZomeApiResult<Address> {
    anchor(HAPPS_ANCHOR_TYPE.to_string(), HAPPS_ANCHOR_TEXT.to_string())
}

pub fn create_happ(happ_entry: HappEntry) -> ZomeApiResult<Happ> {
    let entry = Entry::App(HAPP_ENTRY_NAME.into(), happ_entry.clone().into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&happs_anchor()?, &address, HAPP_LINK_TYPE, "")?;
    Happ::new(address, happ_entry)
}

pub fn get_happ(id: Address) -> ZomeApiResult<Happ> {
    let happ: HappEntry = hdk::utils::get_as_type(id.clone())?;
    Happ::new(id, happ)
}

pub fn update_happ(id: Address, happ_input: HappEntry) -> ZomeApiResult<Happ> {
    let address = match hdk::get_entry(&id.clone())? {
        None => id.clone(),
        Some(entry) => entry.address()
    };
    hdk::update_entry(Entry::App(HAPP_ENTRY_NAME.into(), happ_input.clone().into()), &address)?;
    Happ::new(id, happ_input)
}

pub fn remove_happ(id: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&happs_anchor()?, &id, HAPP_LINK_TYPE, "")?;
    hdk::remove_entry(&id)
}

pub fn list_happs() -> ZomeApiResult<Vec<Happ>> {
    hdk::get_links_and_load(&happs_anchor()?, LinkMatch::Exactly(HAPP_LINK_TYPE), LinkMatch::Any)
        .map(|happ_list|{
            happ_list.into_iter()
                .filter_map(Result::ok)
                .flat_map(|entry| {
                    let id = entry.address();
                    hdk::debug(format!("list_entry{:?}", entry)).ok();
                    get_happ(id)
                }).collect()
        })
}
