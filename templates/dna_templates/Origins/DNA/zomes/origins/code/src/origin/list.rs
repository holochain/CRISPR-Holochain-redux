pub fn list(base: String) -> ZomeApiResult<Vec<Origin>> {
    hdk::get_links(&origins_anchor(base)?, LinkMatch::Exactly(ORIGIN_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}