# Подключение к хосту Docker

Минимальный контейнер, запускающийся в окружении хоста Docker


## Настройка ssh
```sh
useradd -m stas
sudo -u stas ssh-keygen -t ed25519 -N ""
sudo -u stas ssh git@gitlab.ekb.ru
cat /home/stas/.ssh/id_ed25519.pub
```
Добавить к Deply Keys: gitlab/repo/Settings/Repository/Deploy keys
