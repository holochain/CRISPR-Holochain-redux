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

pub mod freckle;
use crate::freckle::FreckleEntry;
use crate::freckle::Freckle;

#[zome]
mod freckles {

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
    fn list_anchor_type_addresses() -> ZomeApiResult<Vec<Address>> {
        holochain_anchors::list_anchor_type_addresses()
    }

    #[zome_fn("hc_public")]
    fn list_anchor_type_tags() -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_type_tags()
    }    
  
    #[zome_fn("hc_public")]
    fn list_anchor_addresses(anchor_type: String) -> ZomeApiResult<Vec<Address>> {
        holochain_anchors::list_anchor_addresses(anchor_type)
    }

    #[zome_fn("hc_public")]
    fn list_anchor_tags(anchor_type: String) -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_tags(anchor_type)
    }

    #[zome_fn("hc_public")]
    fn list_agents() -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_agents()
    }
    #[entry_def]
     fn freckle_entry_def() -> ValidatingEntryType {
        freckle::definition()
    }

    #[zome_fn("hc_public")]
    fn create_freckle(base: String, freckle_input: FreckleEntry) -> ZomeApiResult<Freckle> {
        freckle::handlers::create(base, freckle_input)
    }

    #[zome_fn("hc_public")]
    fn read_freckle(id: Address, created_at: Iso8601) -> ZomeApiResult<Freckle> {
        freckle::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_freckle(id: Address, created_at: Iso8601, address: Address, freckle_input: FreckleEntry) -> ZomeApiResult<Freckle> {
        freckle::handlers::update(id, created_at, address, freckle_input)
    }

    #[zome_fn("hc_public")]
    fn delete_freckle(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        freckle::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_freckles(base: String) -> ZomeApiResult<Vec<Freckle>> {
        freckle::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_freckle(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        freckle::handlers::rebase(base_from, base_to, id, created_at)
    }

}