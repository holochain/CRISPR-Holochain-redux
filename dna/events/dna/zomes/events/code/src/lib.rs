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

pub mod event;
use crate::event::EventEntry;
use crate::event::Event;

#[zome]
mod events {

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
     fn event_entry_def() -> ValidatingEntryType {
        event::definition()
    }

    #[zome_fn("hc_public")]
    fn create_event(base: String, event_input: EventEntry) -> ZomeApiResult<Event> {
        event::handlers::create(base, event_input)
    }

    #[zome_fn("hc_public")]
    fn read_event(id: Address, created_at: Iso8601) -> ZomeApiResult<Event> {
        event::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_event(id: Address, created_at: Iso8601, address: Address, event_input: EventEntry) -> ZomeApiResult<Event> {
        event::handlers::update(id, created_at, address, event_input)
    }

    #[zome_fn("hc_public")]
    fn delete_event(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        event::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_events(base: String) -> ZomeApiResult<Vec<Event>> {
        event::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_event(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        event::handlers::rebase(base_from, base_to, id, created_at)
    }

}