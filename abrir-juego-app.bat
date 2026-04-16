@echo off
setlocal

cd /d "%~dp0"
set "INDEX_PATH=%~dp0index.html"
set "INDEX_URI=file:///%INDEX_PATH:\=/%"

if not exist "%INDEX_PATH%" (
  echo No se encontro index.html en la carpeta del juego.
  pause
  exit /b 1
)

echo Abriendo Bot Breaker 3D en ventana de aplicacion...

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --app="%INDEX_URI%"
  exit /b 0
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (
  start "" "%CHROME%" --app="%INDEX_URI%"
  exit /b 0
)

echo No se encontro Edge o Chrome. Se abrira en el navegador predeterminado.
start "" "%INDEX_PATH%"

exit /b 0
