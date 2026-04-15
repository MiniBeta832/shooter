@echo off
setlocal

cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo No se encontro npm.cmd. Instala Node.js primero.
  pause
  exit /b 1
)

echo [1/3] Generando build web...
call npm.cmd run build
if errorlevel 1 (
  echo Fallo el build del juego.
  pause
  exit /b 1
)

set "PORTABLE_DIR=public\installer-output\portable"
set "PORTABLE_ZIP=public\installer-output\BotBreakerPortable.zip"

echo [2/3] Preparando carpeta portable...
if exist "%PORTABLE_DIR%" rmdir /s /q "%PORTABLE_DIR%"
mkdir "%PORTABLE_DIR%"
xcopy /e /i /y "dist\*" "%PORTABLE_DIR%\" >nul

echo [3/3] Empaquetando ZIP portable...
if exist "%PORTABLE_ZIP%" del /f /q "%PORTABLE_ZIP%"
powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path '%CD%\%PORTABLE_DIR%\*' -DestinationPath '%CD%\%PORTABLE_ZIP%' -Force"
if errorlevel 1 (
  echo Fallo al crear el ZIP portable.
  pause
  exit /b 1
)

echo.
echo Portable generado en: %PORTABLE_ZIP%
echo.
pause
exit /b 0
