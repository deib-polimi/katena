import argparse
import re
import sys
import glob


def tokens(code):
    return re.findall(r'\w+', code)

def get_tokens_in_file(filename: str) -> int:
    with open(filename) as f:
        file = f.read().replace('\n', ' ')
        return len(tokens(file))

def get_YAML_in_directory(dir_path: str) -> list:
    return glob.glob(f'{dir_path}.yaml')

def get_JS_in_directory(dir_path: str) -> list:
    return glob.glob(f'{dir_path}.js') + glob.glob(f'{dir_path}.ts')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--file', default='', type=str)

    args = parser.parse_args()

    if args.file == '':
        sys.exit(1)
    
    print(f'tokens: {get_tokens_in_file(args.file)}')
