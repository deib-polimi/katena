import argparse
import re

from yaml import parse

def tokens(code):
    return re.findall(r'\w+', code)

parser = argparse.ArgumentParser()
parser.add_argument('--yaml', type=str)
parser.add_argument('--js', type=str)

args = parser.parse_args()

with open(f'{args.yaml}') as f:
    yaml = f.read().replace('\n', ' ')

with open(f'{args.js}') as f:
    js = f.read().replace('\n', ' ')

print(yaml)

tokens_yaml = tokens(yaml)
tokens_js = tokens(js)

print(tokens_yaml)
print('-----------------------')
print(tokens_js)

print(len(tokens_yaml))
print(len(tokens_js))