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
use crate::note::{
    NOTES_ANCHOR_TYPE,
    NOTE_ENTRY_LINK_TYPE,
    NOTE_ENTRY_NAME,
    NoteEntry,
    Note,
};

fn notes_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(NOTES_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}