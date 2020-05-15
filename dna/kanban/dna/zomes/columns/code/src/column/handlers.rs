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
use crate::column::{
    COLUMNS_ANCHOR_TYPE,
    COLUMN_ENTRY_LINK_TYPE,
    COLUMN_ENTRY_NAME,
    ColumnEntry,
    Column,
};

fn columns_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(COLUMNS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}

pub fn create(base: String, column_entry: ColumnEntry) -> ZomeApiResult<Column> {
    let entry = Entry::App(COLUMN_ENTRY_NAME.into(), column_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let column = Column::new(entry_address.clone(), column_entry)?;
    hdk::link_entries(&columns_anchor(base)?, &entry_address, COLUMN_ENTRY_LINK_TYPE, &column.created_at.to_string())?;
    Ok(column)
}

pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Column> {
    let column_entry: ColumnEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(COLUMN_ENTRY_NAME.into(), column_entry.clone().into()).address();
    Column::existing(id.clone(), created_at, address, column_entry)
}

pub fn update(id: Address, created_at: Iso8601, address: Address, column_input: ColumnEntry) -> ZomeApiResult<Column> {
    let updated_entry_address = hdk::update_entry(Entry::App(COLUMN_ENTRY_NAME.into(), column_input.clone().into()), &address.clone())?;
    Column::existing(id.clone(), created_at, updated_entry_address, column_input)
}

pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&columns_anchor(base)?, &id, COLUMN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}

pub fn list(base: String) -> ZomeApiResult<Vec<Column>> {
    hdk::get_links(&columns_anchor(base)?, LinkMatch::Exactly(COLUMN_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}

pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&columns_anchor(base_from)?, &id, COLUMN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&columns_anchor(base_to)?, &id, COLUMN_ENTRY_LINK_TYPE, &created_at.to_string())
}

