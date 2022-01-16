# electron-recorder-app

The recording program built on electron can record the current screen, and the current screen can capture various video sources for play.

<img width="1440" alt="2021-10-01-134147" src="https://buynao.oss-cn-beijing.aliyuncs.com/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62022-01-16-%E4%B8%8B%E5%8D%884.10.26%20%281%29.gif">

## Features
- Fix the length (duration) of a webm file（and it won't take long to fix）.
- Supports files larger than 2G, or even larger, and does not take up too much memory.


## Usage
```sh
$ git clone https://github.com/buynao/electron-recorder-app
$ cd electron-recorder-app
$ yarn && yarn dev
```

### Package (`yarn pack:mac` or `npm run pack:mac`)

You can use `yarn pack:win` package the Win App.