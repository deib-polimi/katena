from web3 import Web3
import json

privateKey= "0x6e07fcae8a6a51aa356caf0c40636e8cc35e558ebf449946897f09b910783803"

w3 = Web3(Web3.HTTPProvider(f'http://localhost:8545', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'Implementation1.json') as f:
    contract_json = json.load(f)

imp1 = w3.eth.contract(abi=contract_json['abi'], bytecode=contract_json['bytecode'])
tx_hash = imp1.constructor().transact()
imp1_rx = w3.eth.wait_for_transaction_receipt(tx_hash)

with open(f'Implementation2.json') as f:
    contract_json = json.load(f)

imp2 = w3.eth.contract(abi=contract_json['abi'], bytecode=contract_json['bytecode'])
tx_hash = imp2.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

with open(f'UpgradeableBeacon.json') as f:
    contract_json = json.load(f)

# deploy upgradable
upgradable = w3.eth.contract(abi=contract_json['abi'], bytecode=contract_json['bytecode'])
tx_hash = upgradable.constructor(w3.toChecksumAddress(imp1_rx.contractAddress)).transact()
upgradeable_tx = w3.eth.wait_for_transaction_receipt(tx_hash)

with open(f'BeaconProxy.json') as f:
    contract_json = json.load(f)

proxy = w3.eth.contract(abi=contract_json['abi'], bytecode=contract_json['bytecode'])
initializer = imp1.encodeABI(fn_name="initialize", args=[42])
tx_hash = proxy.constructor(w3.toChecksumAddress(upgradeable_tx.contractAddress), initializer).transact()
tx_hash = proxy.constructor(w3.toChecksumAddress(upgradeable_tx.contractAddress), initializer).transact()
tx_hash = proxy.constructor(w3.toChecksumAddress(upgradeable_tx.contractAddress), initializer).transact()
tx_hash = proxy.constructor(w3.toChecksumAddress(upgradeable_tx.contractAddress), initializer).transact()






