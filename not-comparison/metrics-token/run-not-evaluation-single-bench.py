import argparse
import glob
import re


def tokens(code):
    return re.findall(r'\w+', code)

def get_tokens_in_file(filename: str) -> int:
    with open(filename) as f:
        file = f.read().replace('\n', ' ')
        return len(tokens(file))

def get_files_in_directory(dir_path: str, extension: str) -> list:
    return glob.glob(f'{dir_path}/*.{extension}')


parser = argparse.ArgumentParser()
parser.add_argument('--directory', default='', type=str)

args = parser.parse_args()

yaml_files = get_files_in_directory(args.directory, 'yaml')
js_files  = get_files_in_directory(args.directory, 'js') + get_files_in_directory(args.directory, 'ts')

yaml_tokens = sum([get_tokens_in_file(f) for f in yaml_files])
js_tokens = sum([get_tokens_in_file(f) for f in js_files])

print(f'{args.directory}')
print(f'YAML: {yaml_tokens}')
print(f'JS: {js_tokens}')
