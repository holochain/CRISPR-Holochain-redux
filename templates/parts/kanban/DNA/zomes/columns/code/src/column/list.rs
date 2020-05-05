pub fn list(base: String) -> ZomeApiResult<Vec<Column>> {
    hdk::get_links(&columns_anchor(base)?, LinkMatch::Exactly(COLUMN_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}