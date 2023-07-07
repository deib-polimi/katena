import sys
import argparse
from solcx import link_code
import solcx

parser = argparse.ArgumentParser()
parser.add_argument('--bytecode', type=str, help='bytecode to modify')
parser.add_argument('--library', type=str, help='name of library placeholder in bytecode')
parser.add_argument('--libraryAddress', type=str, help='library address')

args = parser.parse_args()

solcx.install_solc()

if args.library == '':
    sys.exit(0)

bytecode = args.bytecode

linked_bytecode = link_code(bytecode, {args.library: args.libraryAddress})

print(linked_bytecode)