@echo off
setlocal

cd /d "%~dp0"
set "SETUP_PATH=public\installer-output\BotBreakerSetup.exe"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo No se encontro npm.cmd. Instala Node.js primero.
  pause
  exit /b 1
)

set "ISCC="
for %%I in ("%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe") do (
  if exist "%%~fI" set "ISCC=%%~fI"
)
if not defined ISCC (
  for %%I in ("%ProgramFiles%\Inno Setup 6\ISCC.exe") do (
    if exist "%%~fI" set "ISCC=%%~fI"
  )
)

if not defined ISCC (
  echo No se encontro Inno Setup - ISCC.exe.
  echo Instala Inno Setup 6: https://jrsoftware.org/isdl.php
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

echo [2/3] Generando assets visuales del wizard...
powershell -NoProfile -ExecutionPolicy Bypass -File "installer\generar-assets-instalador.ps1"
if errorlevel 1 (
  echo Fallo la generacion de assets del wizard.
  pause
  exit /b 1
)

echo [3/3] Compilando Setup wizard...
"%ISCC%" "installer\BotBreakerInstaller.iss"
if errorlevel 1 (
  echo Fallo la compilacion del setup.
  pause
  exit /b 1
)

set "SIGNTOOL="
for /f "delims=" %%S in ('where signtool.exe 2^>nul') do (
  if not defined SIGNTOOL set "SIGNTOOL=%%~fS"
)
if not defined SIGNTOOL (
  for %%S in (
    "%ProgramFiles(x86)%\Windows Kits\10\bin\x64\signtool.exe"
    "%ProgramFiles%\Windows Kits\10\bin\x64\signtool.exe"
  ) do (
    if exist "%%~fS" if not defined SIGNTOOL set "SIGNTOOL=%%~fS"
  )
)

set "SIGN_CONFIGURED="
if defined BB_SIGN_PFX set "SIGN_CONFIGURED=1"
if defined BB_SIGN_THUMBPRINT set "SIGN_CONFIGURED=1"
if defined BB_SIGN_SUBJECT set "SIGN_CONFIGURED=1"

if defined SIGN_CONFIGURED (
  if not defined SIGNTOOL (
    echo No se encontro signtool.exe. Instala Windows SDK para firmar.
    pause
    exit /b 1
  )

  echo [4/4] Firmando Setup.exe con certificado Authenticode...
  if defined BB_SIGN_PFX (
    if not defined BB_SIGN_PFX_PASSWORD (
      echo Se detecto BB_SIGN_PFX pero falta BB_SIGN_PFX_PASSWORD.
      pause
      exit /b 1
    )
    "%SIGNTOOL%" sign /fd SHA256 /td SHA256 /tr http://timestamp.digicert.com /f "%BB_SIGN_PFX%" /p "%BB_SIGN_PFX_PASSWORD%" "%SETUP_PATH%"
  ) else if defined BB_SIGN_THUMBPRINT (
    "%SIGNTOOL%" sign /fd SHA256 /td SHA256 /tr http://timestamp.digicert.com /sha1 "%BB_SIGN_THUMBPRINT%" /sm "%SETUP_PATH%"
  ) else if defined BB_SIGN_SUBJECT (
    "%SIGNTOOL%" sign /fd SHA256 /td SHA256 /tr http://timestamp.digicert.com /n "%BB_SIGN_SUBJECT%" /sm "%SETUP_PATH%"
  )
  if errorlevel 1 (
    echo Fallo la firma digital del setup.
    pause
    exit /b 1
  )

  echo Verificando firma digital...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$s = Get-AuthenticodeSignature '%CD%\%SETUP_PATH%'; Write-Host ('Estado firma: ' + $s.Status); if ($s.SignerCertificate) { Write-Host ('Certificado: ' + $s.SignerCertificate.Subject) }; if ($s.Status -ne 'Valid') { exit 1 }"
  if errorlevel 1 (
    echo La firma no quedo valida.
    pause
    exit /b 1
  )
) else (
  echo Firma digital no configurada. Opciones:
  echo   1^) PFX: set BB_SIGN_PFX=C:\ruta\cert.pfx y set BB_SIGN_PFX_PASSWORD=tu_password
  echo   2^) EV en token por thumbprint: set BB_SIGN_THUMBPRINT=ABCDEF...
  echo   3^) EV en token por subject: set BB_SIGN_SUBJECT=Nombre exacto del certificado
)

:after_sign
echo.
echo Setup generado en: %SETUP_PATH%
echo.
pause
exit /b 0
