# STATUS
[![Project Status: W.I.P – The project is not yet stable, and is currently in a semi-active development.](https://www.repostatus.org/badges/latest/wip.svg)]() </br>
W.I.P – The project is not yet stable, and is currently in a semi-active development.

---

## Getting Started

### Developement Instance

You can start your own Developement instance by using, one of the following commands that applies for your case:
```bash
# npm
npm run dev
# or yarn
yarn dev
# or pnpm
pnpm dev
# or bun
bun dev
```
Then you can open https://localhost:3000 or the printed port in the Console.

### Docker

The Repo includes an `dockerfile` you can create your own Image and run it like this:
```bash
docker build -t scriptwriter
docker start -it scriptwriter -d
```

### Docker Compose
When using Docker Compose, don't forget to modify the compose file, since mine has an reverseProxy and no open Ports

## About

This project is designed to advance my knowledge of Next.js projects. </br>
As a fan of monkeytyper, I missed some features in the original version, so I tried to recreate the game with my own design and functions. </br>
Currently, this project is still a **W.I.P** and is only a side project.

---

```text
___________.__             ________                     __________                _____.__ 
\__    ___/|  |__   ____  /  _____/_____    _____   ____\______   \_______  _____/ ____\__|
  |    |   |  |  \_/ __ \/   \  ___\__  \  /     \_/ __ \|     ___/\_  __ \/  _ \   __\|  |
  |    |   |   Y  \  ___/\    \_\  \/ __ \|  Y Y  \  ___/|    |     |  | \(  <_> )  |  |  |
  |____|   |___|  /\___  >\______  (____  /__|_|  /\___  >____|     |__|   \____/|__|  |__|
                \/     \/        \/     \/      \/     \/
```
