#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
};

pub mod column;
use crate::column::ColumnEntry;
use crate::column::Column;

#[zome]
mod columns {

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
     fn column_entry_def() -> ValidatingEntryType {
        column::definition()
    }

    #[zome_fn("hc_public")]
    fn create_column(base: String, column_input: ColumnEntry) -> ZomeApiResult<Column> {
        column::handlers::create(base, column_input)
    }

    #[zome_fn("hc_public")]
    fn read_column(id: Address, created_at: Iso8601) -> ZomeApiResult<Column> {
        column::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_column(id: Address, created_at: Iso8601, address: Address, column_input: ColumnEntry) -> ZomeApiResult<Column> {
        column::handlers::update(id, created_at, address, column_input)
    }

    #[zome_fn("hc_public")]
    fn delete_column(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        column::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_columns(base: String) -> ZomeApiResult<Vec<Column>> {
        column::handlers::list(base)
    }

}