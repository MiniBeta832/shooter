@echo off
setlocal

cd /d "%~dp0"
set "PORT=4173"
set "APP_URL=http://127.0.0.1:%PORT%"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo No se encontro npm.cmd. Se abrira en modo archivo local.
  set "INDEX_PATH=%~dp0dist\index.html"
  if not exist "%INDEX_PATH%" set "INDEX_PATH=%~dp0index.html"
  if not exist "%INDEX_PATH%" (
    echo No se encontro index.html en la carpeta del juego.
    pause
    exit /b 1
  )
  set "INDEX_URI=file:///%INDEX_PATH:\=/%"
  goto open_app_window
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

echo Iniciando Bot Breaker 3D en localhost...
start "Bot Breaker 3D Server" cmd /k "cd /d ""%~dp0"" && npm.cmd run dev -- --host 127.0.0.1 --port %PORT% --strictPort"

timeout /t 4 /nobreak >nul

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
