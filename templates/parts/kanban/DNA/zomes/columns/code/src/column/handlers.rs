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