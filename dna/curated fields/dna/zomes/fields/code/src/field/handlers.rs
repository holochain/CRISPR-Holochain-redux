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
use crate::field::{
    FIELDS_ANCHOR_TYPE,
    FIELD_ENTRY_LINK_TYPE,
    FIELD_ENTRY_NAME,
    FieldEntry,
    Field,
};

fn fields_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(FIELDS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, field_entry: FieldEntry) -> ZomeApiResult<Field> {
    let entry = Entry::App(FIELD_ENTRY_NAME.into(), field_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let field = Field::new(entry_address.clone(), field_entry)?;
    hdk::link_entries(&fields_anchor(base)?, &entry_address, FIELD_ENTRY_LINK_TYPE, &field.created_at.to_string())?;
    Ok(field)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Field> {
    let field_entry: FieldEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(FIELD_ENTRY_NAME.into(), field_entry.clone().into()).address();
    Field::existing(id.clone(), created_at, address, field_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, field_input: FieldEntry) -> ZomeApiResult<Field> {
    let updated_entry_address = hdk::update_entry(Entry::App(FIELD_ENTRY_NAME.into(), field_input.clone().into()), &address.clone())?;
    Field::existing(id.clone(), created_at, updated_entry_address, field_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&fields_anchor(base)?, &id, FIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Field>> {
    hdk::get_links(&fields_anchor(base)?, LinkMatch::Exactly(FIELD_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&fields_anchor(base_from)?, &id, FIELD_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&fields_anchor(base_to)?, &id, FIELD_ENTRY_LINK_TYPE, &created_at.to_string())
}

