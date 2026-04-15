@echo off
setlocal

cd /d "%~dp0"
set "PORT=5173"

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

for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| Where-Object { $_.IPAddress -notmatch '^(127\.|169\.254\.)' -and $_.PrefixOrigin -ne 'WellKnown' } ^| Select-Object -First 1 -ExpandProperty IPAddress)"`) do set "LOCAL_IP=%%I"
if not defined LOCAL_IP set "LOCAL_IP=127.0.0.1"

echo.
echo ==============================================
echo  BOT BREAKER 3D - SERVIDOR PARA CELULAR
echo ==============================================
echo  URL para tu celular (misma red Wi-Fi):
echo  http://%LOCAL_IP%:%PORT%
echo.
echo  Si no abre en el celular, permite la app en Firewall.
echo ==============================================
echo.

start "Bot Breaker 3D LAN Server" cmd /k "cd /d ""%~dp0"" && npm.cmd run dev -- --host 0.0.0.0 --port %PORT% --strictPort"

timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:%PORT%"

endlocal
exit /b 0