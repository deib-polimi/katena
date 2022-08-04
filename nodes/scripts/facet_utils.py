from ast import arg
from enum import Enum
from pickletools import bytes4
from typing import Any
from eth_utils import function_abi_to_4byte_selector
from web3 import Web3
import argparse
import json


zero_address = '0x0000000000000000000000000000000000000000'

class FacetAction(Enum):
    Add = 0
    Replace = 1
    Delete = 2

def convert(data_type: str, value: str) -> Any:
    if "int" in data_type or "fixed" in data_type:
        return int(value)
    elif data_type == "bool":
        return bool(value)
    elif "bytes" in data_type:
        return value.encode()
    else:
        return value

def set_arg_parser() -> argparse.ArgumentParser:

    parser = argparse.ArgumentParser()
    parser.add_argument('--network', type=str, default='localhost:8545',
                        help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
    parser.add_argument('--diamondPrivateKey', type=str, help='private key to sign transactions')
    parser.add_argument('--cutAbi', type=str, help='diamond cut ABI')
    parser.add_argument('--cutBytecode', type=str, help='diamond cut bytecode')
    parser.add_argument('--diamondAddress', type=str, help='diamond cut address')
    parser.add_argument('--facetAddress', type=str, help='facet address')
    parser.add_argument('--facetAbi', type=str, help='facet abi')
    parser.add_argument('--facetBytecode', type=str, help='facet bytecode')
    
    return parser

def set_facet(args, action: FacetAction):
    with open(f'contracts/{args.cutAbi}.json') as f:
        diamond_cut_abi = json.load(f)['abi']

    w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

    signer = w3.eth.account.from_key(args.diamondPrivateKey.upper())
    w3.eth.default_account = w3.toChecksumAddress(signer.address)
    diamond_cut = w3.eth.contract(abi=diamond_cut_abi, bytecode=args.cutBytecode, address=args.diamondAddress)

    diamond_cut_input = []

    with open(f'contracts/{args.facetAbi}.json') as f:
        facet_abi = json.load(f)['abi']

    selectors = []
    facet = w3.eth.contract(abi=facet_abi, bytecode=args.facetBytecode)

    for function in facet.abi:
        if function["type"] == 'function':
            selector = function_abi_to_4byte_selector(function)
            selectors.append(selector)

    diamond_cut_input.append([args.facetAddress, action.value, selectors])

    init_address = zero_address

    init_calldata = b''

    # TODO: last 2 arguments not used
    # avoid out of gas
    tx_hash= diamond_cut.functions.diamondCut(diamond_cut_input, init_address, init_calldata).transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_receipt)