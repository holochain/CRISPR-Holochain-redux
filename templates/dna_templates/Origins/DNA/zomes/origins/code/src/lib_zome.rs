
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