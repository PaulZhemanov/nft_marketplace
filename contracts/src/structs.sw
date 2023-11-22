library;

pub struct NftMetadata {
    image_url: str[100], // это будет либо урл строка либо b256 // https://ipfs.com/0x8ashbdouadbfhjsodifhasiuhdaodhbhjasdjkjhvasbdkasvdjkashid, возможно тут будет адрес
    collection_name: Option<str[100]>,
    // collection_id: Option<b256> // hash(creator, collection_name)
    index: Option<u64>, //возможно будте u64, будет браться из storage.nft_by_collection
    name: str[50],
    description: str[300],
    creator: Address,
    nft_contract: Address, //this_address
    sub_id: u64 // глобальный индекс нфт в контракте
}