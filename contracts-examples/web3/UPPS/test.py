from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os 
CONTRACTS_DIR =  "."
 
parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKeyOwner', type=str, default="0x6e07fcae8a6a51aa356caf0c40636e8cc35e558ebf449946897f09b910783803")
parser.add_argument('--privateKeyAny', type=str, default="0x59e5630f60aa30eb3c3cceeb2e914859ab190f6064bfc217d8550a05b170c23d")
parser.add_argument('--implementationAddress', type=str, default="0x66bb333C9881A8c989a9658ba178431dED184510")
parser.add_argument('--implementationAddress2', type=str, default="0x767db1517f81245fF35F6B123C1b35Bf9002719c")
parser.add_argument('--proxyAddress', type=str, default="0x00cF5D70e16c0d21E9D26c6e73CFfA5b4c5B013e")

parser.add_argument('--implAbi', type=str, default="UUPSImplementation2")
parser.add_argument('--proxyAbi', type=str, default="ERC1967Proxy")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKeyOwner.upper())
signer2 = w3.eth.account.from_key(args.privateKeyAny.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.implAbi}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI = imp_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    proxy_adm_contract_json = json.load(f)
PROXY_ABI = proxy_adm_contract_json['abi']

# GET CONTRACTS AND THEIR ADDRESS
imp_address = w3.toChecksumAddress(args.implementationAddress)
implementation = w3.eth.contract(address=imp_address,abi=IMP_ABI)

imp_address2 = w3.toChecksumAddress(args.implementationAddress2)
implementation2 = w3.eth.contract(address=imp_address2,abi=IMP_ABI)

proxy_admin_addrs = w3.toChecksumAddress(args.proxyAddress)
proxy = w3.eth.contract(address=proxy_admin_addrs,abi=IMP_ABI)

print("\n\n\n")
print("..::CONTRACT ADDRESSES::..")
print("implementation1 ", args.implementationAddress)
print("implementation2 ", args.implementationAddress2)
print("proxy ", args.proxyAddress)

print("\n")

print("..::IMPLEMENTATION VERSIONS::..")
print("proxy getContractVersion()", proxy.functions.getContractVersion().call())
print("\n")

print("..::ADDRESS::..")
owner = signer.address
not_owner = signer2.address
print("admin", owner)
print("not admin", not_owner)
print("\n")

###########
#         #
#  TESTS  #
#         #
###########


print("..::Test Upgradability::..  (public (no owner) calls)")
w3.eth.default_account = w3.toChecksumAddress(signer2.address)

print("proxy  getCount()", proxy.functions.getCount().call())
print("proxy  add(5)")
proxy.functions.add(5).transact()
print("proxy  getCount()", proxy.functions.getCount().call())
print("proxy  substract(20)", end=" ")
try:
   proxy.functions.substract(20).call()
except:
   print("ERROR func not founf in this version")
print("proxy  getCount()", proxy.functions.getCount().call())

## UPDATE CONTRACR
print("update implementation contract...")
try:
    proxy.functions.upgradeTo(imp_address2).transact()
except:
   print("proxy  upgradeTo()","ERROR this account cannot upgrade implementation")

print("proxy  substract(15)", end=" ")
try:
   proxy.functions.substract(15).call()
except:
   print("ERROR func not founf in this version")


print("\n")
print("..::Test Upgradability::..  (owner calls)")
w3.eth.default_account = w3.toChecksumAddress(signer.address)

print("proxy  getCount()", proxy.functions.getCount().call())
print("proxy  add(5)")
proxy.functions.add(5).transact()
print("proxy  getCount()", proxy.functions.getCount().call())
print("proxy  substract(20)", end=" ")
try:
   proxy.functions.substract(20).call()
except:
   print("ERROR func not found in this version")
print("proxy getContractVersion()", proxy.functions.getContractVersion().call())
print("proxy  getCount()", proxy.functions.getCount().call())

try:
   print("update implementation contract...")
   print("proxy  upgradeTo() ...")
   proxy.functions.upgradeTo(imp_address2).transact()
   print("proxy getContractVersion()", proxy.functions.getContractVersion().call())
   print("proxy  substract(20)")
   proxy.functions.substract(20).transact()
   print("proxy  getCount()", proxy.functions.getCount().call())
except:
   print("ERROR!!")
   print("This account cannot upgrade program getOwner()", proxy.functions.getOwner().call())



