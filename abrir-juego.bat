@echo off
setlocal

cd /d "%~dp0"
set "PORT=4173"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo No encontre npm.cmd. Instala Node.js y vuelve a intentar.
  pause
  exit /b 1
)

if not exist "node_modules\vite" (
  echo Instalando dependencias del juego...
  call npm.cmd install
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

echo Iniciando Bot Breaker 3D...
start "Bot Breaker 3D Server" cmd /k "cd /d ""%~dp0"" && npm.cmd run dev -- --host 127.0.0.1 --port %PORT% --strictPort"

timeout /t 4 /nobreak >nul
start "" "http://127.0.0.1:%PORT%"

exit /b 0
