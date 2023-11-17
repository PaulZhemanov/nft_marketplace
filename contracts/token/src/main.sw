contract;

use token::base::{
    _total_assets, 
    _total_supply,
    _name,
    _symbol,
    _decimals
};

use src_20::SRC20;
use std::{hash::{Hash, sha256}, string::String, storage::storage_string::*};

storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    decimals: StorageMap<AssetId, u8> = StorageMap {},
}

abi Token {
    #[storage(read)]
    fn total_assets() -> u64;
    
    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64>;
    
    #[storage(read)]
    fn name(asset: AssetId) -> Option<String>;
    
    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String>;
    
    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8>;
}

configurable {
    TOTAL_SUPPLY: u64 = 1,
    DECIMALS: u8 = 0u8,
    NAME: str[7] = __to_str_array("MyToken"),
    SYMBOL: str[5] = __to_str_array("MYTKN"),
}

impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        _total_assets(storage.total_assets)
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        _total_supply(storage.total_supply, asset)
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
        _decimals(storage.decimals, asset)
    }
}

