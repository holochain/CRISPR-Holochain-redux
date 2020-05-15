#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
};

pub mod personafield;
use crate::personafield::PersonafieldEntry;
use crate::personafield::Personafield;

#[zome]
mod personalinformation {

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
     fn personafield_entry_def() -> ValidatingEntryType {
        personafield::definition()
    }

    #[zome_fn("hc_public")]
    fn create_personafield(base: String, personafield_input: PersonafieldEntry) -> ZomeApiResult<Personafield> {
        personafield::handlers::create(base, personafield_input)
    }

    #[zome_fn("hc_public")]
    fn read_personafield(id: Address, created_at: Iso8601) -> ZomeApiResult<Personafield> {
        personafield::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_personafield(id: Address, created_at: Iso8601, address: Address, personafield_input: PersonafieldEntry) -> ZomeApiResult<Personafield> {
        personafield::handlers::update(id, created_at, address, personafield_input)
    }

    #[zome_fn("hc_public")]
    fn delete_personafield(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        personafield::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_personafields(base: String) -> ZomeApiResult<Vec<Personafield>> {
        personafield::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_personafield(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        personafield::handlers::rebase(base_from, base_to, id, created_at)
    }

}