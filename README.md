# Bot Breaker 3D

Prototipo de shooter 3D offline para PC hecho con `three.js`.

## Lo que trae

- Movimiento en primera persona con `WASD` y mouse.
- Disparo hitscan con crosshair central.
- Bots enemigos con comportamiento distinto:
  - `Scout`: rapido, pequeno y agresivo.
  - `Brute`: tanque pesado con mucho dano.
  - `Specter`: unidad de largo alcance.
- Monedas por cada enemigo derrotado.
- Loot defensivo que aparece durante la pelea y recarga escudo.
- Boss en la `wave 10`.
- Tienda de mejoras tras derrotar al boss.
- Reinicio del ciclo desde `wave 0` despues del descanso.
- Nuevos tipos de enemigos que se desbloquean en ciclos posteriores.
- Modelo visual separado para cada tipo de enemigo.
- Oleadas, score, vida y reinicio de partida.

## Como correrlo

```bash
npm.cmd install
npm.cmd run dev
```

Luego abre la URL local que te muestra Vite en el navegador.

Si `npm` te da error en PowerShell, usa siempre `npm.cmd`.

## Instalador confiable (menos bloqueos de Windows)

Si quieres distribuir `BotBreakerSetup.exe` sin tantos avisos de bloqueo, debes firmarlo digitalmente.

1. Consigue un certificado de firma de codigo (`.pfx`), idealmente EV para mejor reputacion.
2. Asegura que `signtool.exe` este instalado (Windows SDK).
3. Antes de ejecutar el build del setup, define:

```bat
set BB_SIGN_PFX=C:\ruta\tu-certificado.pfx
set BB_SIGN_PFX_PASSWORD=tu_password
```

4. Ejecuta:

```bat
crear-setup-pc.bat
```

El script compila el wizard, aplica firma Authenticode con timestamp y valida la firma.

Nota importante: sin certificado valido, SmartScreen puede seguir marcando el instalador como no reconocido.

## SHA-256 del Setup.exe

Hash actual de `BotBreakerSetup.exe`:

```text
061031EC85B2C8306661BD3DCA5C3EFC942EE9432BAF9C47FBFA50BFA7FB1879
```

Verificar en Windows (PowerShell):

```powershell
Get-FileHash -Algorithm SHA256 .\BotBreakerSetup.exe
```

## Controles

- `WASD`: mover
- `Mouse`: apuntar
- `Click izquierdo`: disparar
- `R`: reiniciar partida
