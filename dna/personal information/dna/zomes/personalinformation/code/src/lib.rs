#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
};
use holochain_anchors;

pub mod personafield;
use crate::personafield::PersonafieldEntry;
use crate::personafield::Personafield;

pub mod profilefield;
use crate::profilefield::ProfilefieldEntry;
use crate::profilefield::Profilefield;

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

    #[zome_fn("hc_public")]
    fn list_anchor_types() -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_types()
    }    
    
    #[zome_fn("hc_public")]
    fn list_anchor_type_texts(anchor_type: String) -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_type_texts(anchor_type)
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

    #[entry_def]
     fn profilefield_entry_def() -> ValidatingEntryType {
        profilefield::definition()
    }

    #[zome_fn("hc_public")]
    fn create_profilefield(base: String, profilefield_input: ProfilefieldEntry) -> ZomeApiResult<Profilefield> {
        profilefield::handlers::create(base, profilefield_input)
    }

    #[zome_fn("hc_public")]
    fn read_profilefield(id: Address, created_at: Iso8601) -> ZomeApiResult<Profilefield> {
        profilefield::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_profilefield(id: Address, created_at: Iso8601, address: Address, profilefield_input: ProfilefieldEntry) -> ZomeApiResult<Profilefield> {
        profilefield::handlers::update(id, created_at, address, profilefield_input)
    }

    #[zome_fn("hc_public")]
    fn delete_profilefield(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        profilefield::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_profilefields(base: String) -> ZomeApiResult<Vec<Profilefield>> {
        profilefield::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_profilefield(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        profilefield::handlers::rebase(base_from, base_to, id, created_at)
    }

}