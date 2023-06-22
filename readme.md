## Install

```
npm install latejs-cli -g
```

or

```
git clone https://github.com/laterly/latejs-cli.git
cd latejs-cli && npm install
npm link
```

## Usage

Open your terminal and type `late -h` , you'll see the help infomation below:

```
Usage: late <command>

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  create [options] <app-name>  create a new project     
  help [command]               display help for command 
```

## late create <app-name>

创建模板命令

```
$ late create test-template
 vue3-ts-webpack5
 react-ts-webpack5

✔ waiting download template

Successfully created project test-template

  cd test-template
  npm install
  npm run dev
```