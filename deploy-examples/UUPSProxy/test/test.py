from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os 
CONTRACTS_DIR =  os.path.dirname(__file__)+"/.."
 
parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKeyOwner', type=str, default="77c036a7098f72ffb58923c6e53b09d384f7d8e57fcabca5bc13f5bf6cb724b2")
parser.add_argument('--privateKeyAny', type=str, default="ac6aab109a1dfa4fa1468a3959ab9007bcc6d0989bafcf16af09a30edd502c23")
parser.add_argument('--implementationAddress', type=str, default="0xf2a181642688637893721e15035a40Eaf5769a27")
parser.add_argument('--implementationAddress2', type=str, default="0x953609De7a7FDa822a252C7498aFdaA6be04b46D")
parser.add_argument('--proxyAddress', type=str, default="0x167672EDcd10E36ce75bF8Bcf3cdFed9960E22c6")

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
print("proxy  getCount()", proxy.functions.getCount().call())

try:
   print("update implementation contract...")
   print("proxy  upgradeTo()")
   proxy.functions.upgradeTo(imp_address2).transact()
   print("proxy  substract(20)")
   proxy.functions.substract(20).call()
   print("proxy  getCount()", proxy.functions.getCount().call())
except:
   print("ERROR!!")
   print("This account cannot upgrade program getOwner()", proxy.functions.getOwner().call())



