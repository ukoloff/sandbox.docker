# VSCode Tunnel

Minimal container to develop via VSCode Tunnel

## Start

1. Build image `docker bake`
2. Start `docker compose up -d`
3. View logs `docker compose logs`
4. Go to  https://github.com/login/device
5. Enter code `XXXX-XXXX`
6. Attach to new tunnel in VSCode's Remote Explorer
7. ...
8. Profit!

# Credentials

1. Install `git` for VSCode to pass `GIT_ASKPASS` et al.
2. If `SSH_AUTH_SOCK` is set it will appear inside container

## See also
+ [Developing with Remote Tunnels](https://code.visualstudio.com/docs/remote/tunnels)
+ [reverie89/vscode-tunnel](https://github.com/reverie89/vscode-tunnel/)Sta
