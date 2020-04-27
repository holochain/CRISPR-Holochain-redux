#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
};

pub mod task;
use crate::task::TaskEntry;
use crate::task::Task;

#[zome]
mod tasks {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[entry_def]
    fn anchor_def() -> ValidatingEntryType {
        holochain_anchors::anchor_definition()
    }

    #[entry_def]
     fn task_entry_def() -> ValidatingEntryType {
        task::definition()
    }

    #[zome_fn("hc_public")]
    fn create_task(task_input: NoteEntry) -> ZomeApiResult<Note> {
        task::handlers::create(task_input)
    }

    #[zome_fn("hc_public")]
    fn read_task(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
        task::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_task(id: Address, created_at: Iso8601, address: Address, task_input: NoteEntry) -> ZomeApiResult<Note> {
        task::handlers::update(id, created_at, address, task_input)
    }

    #[zome_fn("hc_public")]
    fn delete_task(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        task::handlers::delete(id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_tasks() -> ZomeApiResult<Vec<Note>> {
        task::handlers::list()
    }

}