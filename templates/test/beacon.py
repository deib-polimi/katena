from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os
CONTRACTS_DIR =  os.path.dirname(__file__)+"/../contracts"

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart con tract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="d064a4bd34f0c40bca05faa3ed1af6c479e410ff8b438c68c5b21a9e5a2f1a1d")
parser.add_argument('--implementationAddress', type=str, default="0x65F13dD16570e3e6A71466D5cA4dE87F2bB110b3")
parser.add_argument('--implementationAddress2', type=str, default="0xb92Af5DCC3fE60CDEE66AA402B3Aa1D7b9595cfb")
parser.add_argument('--proxyAddress1', type=str, default="0x169c57fBD22A27b74e08F3C56cF45d03637dA123")
parser.add_argument('--proxyAddress2', type=str, default="0x3AE081759bF498916ACeE17d80d4eF1f72E05D65")
parser.add_argument('--proxyAddress3', type=str, default="0x84dD936fa62a2d962530F74763cad27015Fd1328")
parser.add_argument('--proxyAddress4', type=str, default="0xAFa895a50787AC8028037d382D6775244A5A45A7")
parser.add_argument('--upgradableBeaconAddress', type=str, default="0xC034b6150F612a12aAAa01eD5A0a02cB5E6c1497")

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
PROXY_ADDRS1 = w3.toChecksumAddress(args.proxyAddress1)
PROXY_ADDRS2 = w3.toChecksumAddress(args.proxyAddress2)
PROXY_ADDRS3 = w3.toChecksumAddress(args.proxyAddress3)
PROXY_ADDRS4 = w3.toChecksumAddress(args.proxyAddress4)

with open(f'{CONTRACTS_DIR}/{args.upgradableProxyAbi}.json') as f:
    upgradable_proxy_contract_json = json.load(f)
UPGRADABLE_BEACON_ABI = upgradable_proxy_contract_json['abi']
UPGRADABLE_ADDRS = w3.toChecksumAddress(args.upgradableBeaconAddress)

# GET CONTRACTS AND THEIR ADDRESS
imp_address = w3.toChecksumAddress(args.implementationAddress)
implementation = w3.eth.contract(address=imp_address,abi=IMP_ABI)
print("\nimplementation address ", args.implementationAddress)
imp_address2 = w3.toChecksumAddress(args.implementationAddress2)
implementation2 = w3.eth.contract(address=imp_address2,abi=IMP_ABI)
print("implementation2 address ", args.implementationAddress2)

# get proxy contracts
proxy1 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS1),abi=IMP_ABI)
proxy2 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS2),abi=IMP_ABI)
proxy3 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS3),abi=IMP_ABI)
proxy4 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS4),abi=IMP_ABI)
upgradable = w3.eth.contract(address=UPGRADABLE_ADDRS,abi=UPGRADABLE_BEACON_ABI)
print("proxy1 address ", PROXY_ADDRS1)
print("proxy2 address ", PROXY_ADDRS2)
print("proxy3 address ", PROXY_ADDRS3)
print("proxy4 address ", PROXY_ADDRS4)
print("upgradableBeacon address ", UPGRADABLE_ADDRS)
print("\n")

print("..:: CURRENT CONFIGURATION ::..")
print("..::proxy1 getContractVersion()",proxy1.functions.getContractVersion().call())
print("..::proxy2 getContractVersion()",proxy2.functions.getContractVersion().call())
print("..::proxy3 getContractVersion()",proxy3.functions.getContractVersion().call())
print("..::proxy4 getContractVersion()",proxy4.functions.getContractVersion().call())
print("..::upgradableBeacon implementation()", upgradable.functions.implementation().call())
print("\n")

#w3.eth.sendTransaction({'to': UPGRADABLE_ADDRS,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address])})

# TESTS PROXY 1
print("..::proxy1:            getCount() ",proxy1.functions.getCount().call())
proxy1.functions.add(5).transact()
print("..::proxy1:            add(5)     ")
print("..::proxy1:            getCount()",proxy1.functions.getCount().call())

try:
    proxy.functions.substract(3).call()
    print("..::proxy1:            subtract(3) ",)
    print("..::proxy1:            getCount()",proxy1.functions.getCount().call())
except:
    print("..::proxy1:            subtract(3) ERROR!! function not present in contract")
    print("..::proxy1:            getCount()",proxy1.functions.getCount().call())

# TESTS PROXY 2
print("..::proxy2:            getCount() ",proxy2.functions.getCount().call())
proxy2.functions.add(7).transact()
print("..::proxy2:            add(7)     ")
print("..::proxy2:            getCount()",proxy2.functions.getCount().call())

try:
    proxy.functions.substract(3).call()
    print("..::proxy2:            subtract(3) ",)
    print("..::proxy2:            getCount()",proxy2.functions.getCount().call())
except:
    print("..::proxy2:            subtract(3) ERROR!! function not present in contract")
    print("..::proxy2:            getCount()",proxy2.functions.getCount().call())
print("..::proxy3:            getCount() ",proxy3.functions.getCount().call())
print("..::proxy4:            getCount() ",proxy4.functions.getCount().call())

print("\n..::     UPDATE BEACON     ::..")
w3.eth.sendTransaction({'to': UPGRADABLE_ADDRS,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address2])})
print("..:: CURRENT CONFIGURATION ::..")
print("..::proxy1 getContractVersion()",proxy1.functions.getContractVersion().call())
print("..::proxy2 getContractVersion()",proxy2.functions.getContractVersion().call())
print("..::proxy3 getContractVersion()",proxy3.functions.getContractVersion().call())
print("..::proxy4 getContractVersion()",proxy4.functions.getContractVersion().call())
print("..::upgradableBeacon implementation()", upgradable.functions.implementation().call())
print("\n")

# get updated proxy contracts
proxy1 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS1),abi=IMP_ABI2)
proxy2 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS2),abi=IMP_ABI2)
proxy3 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS3),abi=IMP_ABI2)
proxy4 = w3.eth.contract(address=w3.toChecksumAddress(PROXY_ADDRS4),abi=IMP_ABI2)

# TESTS PROXY 1
# TESTS PROXY 2
print("..::proxy1:            getCount() ",proxy1.functions.getCount().call())
proxy1.functions.substract(2).transact()
print("..::proxy1:            subtract(2)")
print("..::proxy1:            getCount() ",proxy1.functions.getCount().call())
proxy1.functions.add(6).transact()
print("..::proxy1:            add(6)     ") 
print("..::proxy1:            getCount() ",proxy1.functions.getCount().call())


print("\n..::proxy2:            getCount() ",proxy2.functions.getCount().call())
proxy2.functions.substract(10).transact()
print("..::proxy2:            subtract(10)")
print("..::proxy2:            getCount() ",proxy2.functions.getCount().call())
proxy2.functions.add(20).transact()
print("..::proxy2:            add(20)     ") 
print("..::proxy2:            getCount() ",proxy2.functions.getCount().call())

print("\n..::proxy1:            getCount() ",proxy1.functions.getCount().call())
print("..::proxy2:            getCount() ",proxy2.functions.getCount().call())
print("..::proxy3:            getCount() not modfied",proxy3.functions.getCount().call())
print("..::proxy4:            getCount() not modfied",proxy4.functions.getCount().call())
