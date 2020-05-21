    #[zome_fn("hc_public")]
    fn list_anchors(base: String) -> ZomeApiResult<Vec<Origin>> {
        origin::handlers::list_anchors(base)
    }