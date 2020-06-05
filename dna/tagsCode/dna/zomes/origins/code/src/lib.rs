#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_persistence_api::cas::content::Address,
    api::AGENT_ADDRESS,
};
use holochain_anchors;

const TAGS_ANCHOR_TYPE: &str = "list_tags";
const TAGGED_ENTRY_ANCHOR_TYPE: &str = "tagged_entries";
// const RATING_ENTRY_NAME: &str = "rating";

#[zome]
mod origins {

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
    fn add_tag(tag_text: String, instance: String, entry_id: String) -> ZomeApiResult<Address> {
        let tagged_entry_text = format!("{}::{}", instance, entry_id)
        holochain_anchors::link_anchors(TAGS_ANCHOR_TYPE.to_string(), tag_text.to_string(), TAGGED_ENTRY_ANCHOR_TYPE.to_string(), tagged_entry_text)
        holochain_anchors::link_anchors(TAGS_ANCHOR_TYPE.to_string(), tag_text.to_string(), TAGGED_ENTRY_ANCHOR_TYPE.to_string(), tagged_entry_text)
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
    fn link_anchors(anchor_from_type: String, anchor_from_text: String, anchor_type: String, anchor_text: String) -> ZomeApiResult<Address> {
        holochain_anchors::link_anchors(anchor_from_type, anchor_from_text, anchor_type, anchor_text)
    }
