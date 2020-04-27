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
use crate::task::{
    TASKS_ANCHOR_TYPE,
    TASK_ENTRY_LINK_TYPE,
    TASK_ENTRY_NAME,
    TaskEntry,
    Task,
};

fn tasks_anchor(anchor_text: String) -> ZomeApiResult<Address> {
    anchor(TASKS_ANCHOR_TYPE.to_string(), anchor_text.to_string())
}