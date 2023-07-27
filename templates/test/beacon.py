from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os
CONTRACTS_DIR =  os.path.dirname(__file__)+"/../contracts"

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="b1a55871abf8ba124c6587f27c036c309cf94c5e5b45bc3989c8dd61e8f5287a")
parser.add_argument('--beaconAddress', type=str, default="0x6f3c12AD7ABc262D36486f3952dBa7D94dB5f4Bc")
parser.add_argument('--beaconAddress2', type=str, default="0x14Bc7e121727c6EF1500b083bC8b38704fD4B749")
parser.add_argument('--proxyAddress', type=str, default="0x8D57d2Ce51f710Af251544B8b49Be39C8afE7C64")
parser.add_argument('--upgradableProxyAddress', type=str, default="0xca2E3b803A4619112Bc141De9046B9C6dbB67175")

parser.add_argument('--beaconAbi', type=str, default="Beacon")
parser.add_argument('--proxyAbi', type=str, default="IBeaconProxy")
parser.add_argument('--upgradableProxyAbi', type=str, default="Upgradable")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.beaconAbi}.json') as f:
    beacon_contract_json = json.load(f)
BEACON_ABI = beacon_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    proxy_contract_json = json.load(f)
PROXY_ABI = proxy_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    upgradable_proxy_contract_json = json.load(f)
UPGRADABLE_PROXY_ABI = upgradable_proxy_contract_json['abi']



beacon_address = w3.toChecksumAddress(args.beaconAddress)
print("beacon address ", args.beaconAddress)
beacon_address2 = w3.toChecksumAddress(args.beaconAddress2)
print("beacon address2 ", args.beaconAddress2)
proxy_address = w3.toChecksumAddress(args.proxyAddress)
print("beacon proxy address ", args.proxyAddress)
upgradable_address = w3.toChecksumAddress(args.upgradableProxyAddress)
print("beacon upgradable proxy address ", args.upgradableProxyAddress)

beacon = w3.eth.contract(address=beacon_address,abi=BEACON_ABI)
print("beacon version ",beacon.functions.getContractNameWithVersion().call())

proxy = w3.eth.contract(address=proxy_address,abi=PROXY_ABI)
response = w3.eth.sendTransaction({'to': proxy_address,'data':beacon.encodeABI(fn_name="getContractNameWithVersion")})
print("proxy function call",response.hex())
print("proxy imple address: ")
print("proxy calls version: ",proxy.functions.implementation().call())
print("..:: update contract to beacon 2...")
upgradable = w3.eth.contract(address=upgradable_address,abi=UPGRADABLE_PROXY_ABI)
proxy.functions.upgradeTo(beacon_address2)

print("beacon version ",beacon.functions.getContractNameWithVersion().call())
proxy = w3.eth.contract(address=proxy_address)
print("proxy calls version: ",proxy.functions.getContractNameWithVersion())
print("proxy imple address: ",proxy.functions._beacon())
