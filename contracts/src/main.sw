contract;

mod structs;
use structs::*;

use std::auth::msg_sender;
use nft::{mint, transfer, owner_of, tokens_minted};



storage{
    // (creator, collection_id or name )
    nft_by_collection: StorageMap<(Address, b256), Vec<u64>> = StorageMap{},
    
}

abi MyContract {
    #[storage(read, write), payable]
    fn mint(image_url: str[100], collection_name: Option<str[100]>, name: str[50], description: str[300]);

    #[storage(read, write), payable]
    fn nft_by_collection(collection_name: Option<str[100]>, creator: Address) -> Vec<u64>; 
}

impl MyContract for Contract {

        #[storage(read, write), payable]
        fn mint(image_url: str[100], collection_name: Option<str[100]>, name: str[50], description: str[300]) {
    
        let creator = msg_sender().unwrap(); // тот кто создает нфт
        let sub_id = tokens_minted(); // глобальный индекс нфт в контракте
        mint(sub_id, creator); // минтим 1 нфт с таким суб айди такому челу
        
        let mut metadata = NftMetadata {
            image_url,
            collection_name,
            index,
            name,
            description,
            creator, 
            nft_contract: this_address(),
            sub_id,
        };


        if collection_name.is_some() { //если в аргументе пришло имя коллекции
            let nft_by_collection = storage.nft_by_collection.get((creator, collection_name.unwrap())).try_read(); //пытаемся считать nft_by_collection
            let index = if nft_by_collection.is_none(){ //определяем индекс
                storage.nft_by_collection.INSERT((creator, collection_name.unwrap()), vec[sub_id]) //если в nft_by_collection пусто то вставляем новый вектор sub_id
                // return 0 //индекс 0
            }else{
                let nft_by_collection = nft_by_collection.unwrap(); // тут мы точго знаем что там есть массив
                let index = nft_by_collection.len(); // индекс - длинна массива
                nft_by_collection.unwrap().push(sub_id); //пушаем эллемент в массив
                // index //возвращаем индекс
            };
            metadata.index = Option::Some(index); // обновляем индекс в метадате
        }

        set_token_metadata(Option::Some(metadata), sub_id); // обновляем метадату
   
    }


    #[storage(read, write)]
    fn nft_by_collection(collection_name: Option<str[100]>, creator: Address) -> Vec<u64> {
        storage.nft_by_collection.get((creator, caoolection_name.unwrap())).try_read();
    }
}