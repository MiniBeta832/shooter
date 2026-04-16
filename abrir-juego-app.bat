@echo off
setlocal

cd /d "%~dp0"
set "PORT=4173"
set "APP_URL=http://127.0.0.1:%PORT%"
set "ROOT_PATH=%~dp0"
set "SERVER_SCRIPT=%~dp0servidor-local.ps1"
set "INDEX_PATH=%~dp0index.html"

if not exist "%INDEX_PATH%" (
  echo No se encontro index.html en la carpeta del juego.
  pause
  exit /b 1
)

if not exist "%SERVER_SCRIPT%" (
  echo No se encontro servidor-local.ps1. Se abrira modo archivo local.
  set "INDEX_URI=file:///%INDEX_PATH:\=/%"
  goto open_app_window
)

echo Iniciando Bot Breaker 3D en localhost...
start "Bot Breaker 3D Localhost" powershell -NoProfile -ExecutionPolicy Bypass -File "%SERVER_SCRIPT%" -Port %PORT% -Root "%ROOT_PATH%"

for /l %%I in (1,1,25) do (
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri '%APP_URL%' -Method Head -UseBasicParsing -TimeoutSec 1; exit 0 } catch { exit 1 }"
  if not errorlevel 1 goto open_app_window
  timeout /t 1 /nobreak >nul
)

echo No se pudo levantar localhost. Se abrira modo archivo local.
set "INDEX_URI=file:///%INDEX_PATH:\=/%"

:open_app_window
echo Abriendo Bot Breaker 3D en ventana de aplicacion...

set "TARGET=%APP_URL%"
if defined INDEX_URI set "TARGET=%INDEX_URI%"

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --app="%TARGET%"
  exit /b 0
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (
  start "" "%CHROME%" --app="%TARGET%"
  exit /b 0
)

echo No se encontro Edge o Chrome. Se abrira en el navegador predeterminado.
if defined INDEX_URI (
  start "" "%INDEX_PATH%"
) else (
  start "" "%APP_URL%"
)

exit /b 0
