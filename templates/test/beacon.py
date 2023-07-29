from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os
CONTRACTS_DIR =  os.path.dirname(__file__)+"/../contracts"

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart con tract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="bad4b1fe8c59e129a6f59db7a344d216940a82e40c82817c0aacecbd43b1bbbd")
parser.add_argument('--implementationAddress', type=str, default="0x5194ECEf3c52E9259375F5ea650C2cE79576Ae9F")
parser.add_argument('--implementationAddress2', type=str, default="0xeb899c8B3841E84e05aB224Ae771b6591de3175d")
parser.add_argument('--proxyAddress', type=str, default="0xd0677AC42199AaF40251fDf5Ba4084D6931c1066")
parser.add_argument('--upgradableBeaconAddress', type=str, default="0x683e145F3F568aE576F3232dD3BB866DF86F2765")

parser.add_argument('--implAbi', type=str, default="Implementation1")
parser.add_argument('--implAbi2', type=str, default="Implementation2")
parser.add_argument('--proxyAbi', type=str, default="BeaconProxy")
parser.add_argument('--upgradableProxyAbi', type=str, default="UpgradeableBeacon")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.implAbi}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI = imp_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.implAbi2}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI2 = imp_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    proxy_contract_json = json.load(f)
PROXY_ABI = proxy_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.upgradableProxyAbi}.json') as f:
    upgradable_proxy_contract_json = json.load(f)
UPGRADABLE_BEACON_ABI = upgradable_proxy_contract_json['abi']

# GET CONTRACTS AND THEIR ADDRESS
imp_address = w3.toChecksumAddress(args.implementationAddress)
implementation = w3.eth.contract(address=imp_address,abi=IMP_ABI)
print("\nimplementation address ", args.implementationAddress)
imp_address2 = w3.toChecksumAddress(args.implementationAddress2)
implementation2 = w3.eth.contract(address=imp_address2,abi=IMP_ABI)
print("implementation2 address ", args.implementationAddress2)
proxy_address = w3.toChecksumAddress(args.proxyAddress)
proxy = w3.eth.contract(address=proxy_address,abi=IMP_ABI)
print("proxy address ", args.proxyAddress)
upgradable_address = w3.toChecksumAddress(args.upgradableBeaconAddress)
upgradable = w3.eth.contract(address=upgradable_address,abi=UPGRADABLE_BEACON_ABI)
print("upgradable beacon address ", args.upgradableBeaconAddress)
print("\n")
w3.eth.sendTransaction({'to': upgradable_address,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address])})

# TESTS
print("..::upgradableBeacon: implementation addrs", upgradable.functions.implementation().call())
print("..::upgradableBeacon: current version     ", proxy.functions.getContractVersion().call())
print("..::proxy:            getCount() ",proxy.functions.getCount().call())
proxy.functions.add(5).transact()
print("..::proxy:            add(5)     ")
print("..::proxy:            getCount()",proxy.functions.getCount().call())

try:
    proxy.functions.substract(3).call()
    print("..::proxy:            subtract() ",)
    print("..::proxy:            getCount()",proxy.functions.getCount().call())
except:
    print("..::proxy:            subtract() ERROR!! function not present in contract")
    print("..::proxy:            getCount()",proxy.functions.getCount().call())



print("\n..:: update contract to beacon 2 ::..")
proxy = w3.eth.contract(address=proxy_address,abi=IMP_ABI2)
w3.eth.sendTransaction({'to': upgradable_address,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address2])})
print("..::upgradableBeacon: implementation addrs", upgradable.functions.implementation().call())
print("..::upgradableBeacon: current version     ", proxy.functions.getContractVersion().call())
print("..::proxy:            getCount() ",proxy.functions.getCount().call())
proxy.functions.substract(2).transact()
print("..::proxy:            subtract(2)")
print("..::proxy:            getCount() ",proxy.functions.getCount().call())
proxy.functions.add(6).transact()
print("..::proxy:            add(6)     ") 
print("..::proxy:            getCount() ",proxy.functions.getCount().call())
