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
use crate::origin::{
    ORIGINS_ANCHOR_TYPE,
    ORIGIN_ENTRY_LINK_TYPE,
    ORIGIN_ENTRY_NAME,
    OriginEntry,
    Origin,
};

fn origins_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(ORIGINS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}