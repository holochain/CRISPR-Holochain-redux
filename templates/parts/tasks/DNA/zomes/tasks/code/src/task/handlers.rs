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
    TASKS_ANCHOR_TEXT,
    TASK_ENTRY_LINK_TYPE,
    TASK_ENTRY_NAME,
    TaskEntry,
    Task,
};

fn tasks_anchor() -> ZomeApiResult<Address> {
    anchor(TASKS_ANCHOR_TYPE.to_string(), TASKS_ANCHOR_TEXT.to_string())
}