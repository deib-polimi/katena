from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os
CONTRACTS_DIR =  os.path.dirname(__file__)+"/../contracts"

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="69b0c13285f61db067f782625c14b6e87cc216615a64c9096f1f9468eac0ef7e")
parser.add_argument('--implementationAddress', type=str, default="0x06788830855C783B4C331b4f341bDE01f2C2918D")
parser.add_argument('--implementationAddress2', type=str, default="0x3a670001EcE36AC3655c1c5320a87ac766544612")
parser.add_argument('--proxyAddress', type=str, default="0xa6fC194bB96C2AD0a2CBc2d4ED2bd959bE8b0AE1")
parser.add_argument('--upgradableBeaconAddress', type=str, default="0xd31BA256D107F0a6afEa83DD8aBB61E533481368")

parser.add_argument('--implAbi', type=str, default="Implementation")
parser.add_argument('--proxyAbi', type=str, default="BProxy")
parser.add_argument('--upgradableProxyAbi', type=str, default="BUpgradable")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.implAbi}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI = imp_contract_json['abi']

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

# GET LOGIC VALUES AND ADDRS
print("implementation1 value",implementation.functions.getContractNameWithVersion().call())
print("implementation2 value",implementation2.functions.getContractNameWithVersion().call())
print("\n")

print("upgradable calling implementationa addrs", upgradable.functions.implementation().call())
print("proxy value",proxy.functions.getContractNameWithVersion().call())
print("..:: update contract to beacon 2 ::..")
w3.eth.sendTransaction({'to': upgradable_address,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address2])})
print("upgradable calling implementationa addrs", upgradable.functions.implementation().call())
print("proxy value",proxy.functions.getContractNameWithVersion().call())
