contract;

mod structs;
mod errors;

use structs::*;
use errors::*;
use std::auth::msg_sender;
use std::{call_frames::contract_id, hash::Hash, storage::storage_string::*, string::String};
use token::base::{_name, _set_name, _set_symbol, _symbol, _total_assets, _total_supply};
use token::base::SetTokenAttributes;
use token::metadata::*;
use token::mint::{_burn, _mint};
use src_20::SRC20;
use src_7::{SRC7, Metadata};
use src_3::SRC3;

// storage {
//     // (creator, collection_id or name )
//     // nft_by_collection: StorageMap<(Address, b256), Vec<u64>> = StorageMap{},
//     // nft_by_collection: StorageMap<Address, Vec<u64>> = StorageMap{},
//     metadata: StorageMetadata = StorageMetadata {},
// }

storage {
    total_assets: u64 = 0,
    // total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    // decimals: StorageMap<AssetId, u8> = StorageMap {},
}              

abi MyContract {
    #[storage(read, write), payable]
    fn mint(image_url: str[100], collection_title: Option<str[100]>, name: str[50], description: str[300]);

    #[storage(read, write)]
    fn nft_by_collection(collection_title: Option<str[100]>, creator: Address) -> Vec<u64>; 
}

// impl MyContract for Contract {

//         #[storage(read, write), payable]
//         fn mint(image_url: str[100], collection_title: Option<str[100]>, name: str[50], description: str[300]) {
    
//         let creator = msg_sender().unwrap(); // тот кто создает нфт
//         let sub_id = storage.total_assets; // глобальный индекс нфт в контракте
//         mint(sub_id, creator); // минтим 1 нфт с таким суб айди такому челу
        
//         let mut metadata = NftMetadata {
//             image_url,
//             collection_title,
//             collection_id,
//             index,
//             name,
//             description,
//             creator, 
//             nft_contract: this_address(),
//             sub_id,
//         };


//         if collection_title.is_some() { //если в аргументе пришло имя коллекции
//             let nft_by_collection = storage.nft_by_collection.get((creator, collection_title.unwrap())).try_read(); //пытаемся считать nft_by_collection
//             let index = if nft_by_collection.is_none(){ //определяем индекс
//                 storage.nft_by_collection.INSERT((creator, collection_title.unwrap()), vec[sub_id]) //если в nft_by_collection пусто то вставляем новый вектор sub_id
//                 // return 0 //индекс 0
//             }else{
//                 let nft_by_collection = nft_by_collection.unwrap(); // тут мы точго знаем что там есть массив
//                 let index = nft_by_collection.len(); // индекс - длинна массива
//                 nft_by_collection.unwrap().push(sub_id); //пушаем эллемент в массив
//                 // index //возвращаем индекс
//             };
//             metadata.index = Option::Some(index); // обновляем индекс в метадате
//         }

//         set_token_metadata(Option::Some(metadata), sub_id); // обновляем метадату
   
//     }


//     #[storage(read, write)]
//     fn nft_by_collection(collection_title: Option<str[100]>, creator: Address) -> Vec<u64> {
//         storage.nft_by_collection.get((creator, caoolection_name.unwrap())).try_read();
//     }
// }
impl SRC3 for Contract {

    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: SubId, amount: u64) {
        let asset = AssetId::new(contract_id(), sub_id);
        require(amount == 1, MintError::CannotMintMoreThanOneNFTWithSubId);
        require(storage.total_supply.get(asset).try_read().is_none(), MintError::NFTAlreadyMinted);
        require(storage.total_assets.try_read().unwrap_or(0) + amount <= 100_000, MintError::MaxNFTsMinted);
        let _ = _mint(storage.total_assets, storage.total_supply, recipient, sub_id, amount);
    }

    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        // _burn(storage.total_supply, sub_id, amount);
    }
} 

impl SRC7 for Contract {
    #[storage(read)]
    fn metadata(asset: AssetId, key: String) -> Option<Metadata> {
        storage.metadata.get(asset, key)
    }
}

impl SRC20 for Contract {

    #[storage(read)]
    fn total_assets() -> u64 {
        _total_assets(storage.total_assets)
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        Some(1)
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        _name(storage.name, asset)
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        _symbol(storage.symbol, asset)
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        Some(0u8)
    }    

}

impl SetTokenAttributes for Contract {

    #[storage(write)]
    fn set_name(asset: AssetId, name: String) {
        require(storage.name.get(asset).read_slice().is_none(), SetError::ValueAlreadySet);
        _set_name(storage.name, asset, name);
    }
    
    #[storage(write)]
    fn set_symbol(asset: AssetId, symbol: String) {
        require(storage.symbol.get(asset).read_slice().is_none(), SetError::ValueAlreadySet);
        _set_symbol(storage.symbol, asset, symbol);
    }
    
    #[storage(write)]
    fn set_decimals(asset: AssetId, decimals: u8) {
        require(false, SetError::ValueAlreadySet);
    }
}

impl SetTokenMetadata for Contract {
  
    #[storage(read, write)]
    fn set_metadata(asset: AssetId, key: String, metadata: Metadata) {
            let mut metadata = NftMetadata {
            image_url,
            collection_title,
            collection_id,
            index,
            name,
            description,
            creator, 
            nft_contract: this_address(),
            sub_id,
        };
        
        require(storage.metadata.get(asset, key).is_none(), SetError::ValueAlreadySet);
        _set_metadata(storage.metadata, asset, key, metadata);
    }
}