#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
    api::AGENT_ADDRESS,
};
use holochain_anchors;

pub mod rating;
use crate::rating::RatingEntry;
use crate::rating::Rating;

#[zome]
mod ratings {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[zome_fn("hc_public")]
    fn agent_address() -> ZomeApiResult<String> {
        Ok(AGENT_ADDRESS.to_string())
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
    
    #[entry_def]
     fn rating_entry_def() -> ValidatingEntryType {
        rating::definition()
    }

    #[zome_fn("hc_public")]
    fn create_rating(base: String, rating_input: RatingEntry) -> ZomeApiResult<Rating> {
        rating::handlers::create(base, rating_input)
    }

    #[zome_fn("hc_public")]
    fn read_rating(id: Address, created_at: Iso8601) -> ZomeApiResult<Rating> {
        rating::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_rating(id: Address, created_at: Iso8601, address: Address, rating_input: RatingEntry) -> ZomeApiResult<Rating> {
        rating::handlers::update(id, created_at, address, rating_input)
    }

    #[zome_fn("hc_public")]
    fn delete_rating(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        rating::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_ratings(base: String) -> ZomeApiResult<Vec<Rating>> {
        rating::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_rating(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        rating::handlers::rebase(base_from, base_to, id, created_at)
    }

}