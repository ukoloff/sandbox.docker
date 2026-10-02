#!/bin/sh

exec >/proc/1/fd/1 2>&1

function main {
  echo "[$(date -Is)] Start tunnel monitoring..."

  PING_FAILURES=0

  while true
  do
    sleep 10
    ping -qc1 ya.ru >/dev/null 2>&1
    if [ $? -ne 0 ]
    then
      PING_FAILURES=$((PING_FAILURES+1))
      if [ $PING_FAILURES -gt 5 ]
      then
        PING_FAILURES=0
        restart-awg
      fi
    else
      PING_FAILURES=0
    fi
  done
}

function restart-awg {
  for iface in $(awg show interfaces)
  do
    echo "[$(date -Is)] Restarting: $iface"
    awg-quick down $iface
    [ $? -ne 0 ] && echo "[$(date -Is)] Failed to stop: $iface"
    awg-quick up $iface
    [ $? -ne 0 ] && echo "[$(date -Is)] Failed to start again: $iface"
  done
}

main &
