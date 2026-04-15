#define AppName "Bot Breaker 3D"
#define AppVersion "0.1.0"
#define AppPublisher "betar"
#define AppExeName "abrir-juego.bat"

[Setup]
AppId={{C6F13A4A-9F54-4E55-9A87-6DE8A8E8927D}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion} - Prototype Build
AppPublisher={#AppPublisher}
DefaultDirName={autopf}\Bot Breaker 3D
DefaultGroupName=Bot Breaker 3D
OutputDir=..\public\installer-output
OutputBaseFilename=BotBreakerSetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
WizardImageFile=wizard-large.bmp
WizardSmallImageFile=wizard-small.bmp
PrivilegesRequired=lowest
DisableDirPage=no
DisableProgramGroupPage=no
UninstallDisplayIcon={app}\{#AppExeName}

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "..\dist\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs; Excludes: "installer-output\*"
Source: "..\abrir-juego.bat"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Bot Breaker 3D"; Filename: "{app}\{#AppExeName}"
Name: "{autodesktop}\Bot Breaker 3D"; Filename: "{app}\{#AppExeName}"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Crear acceso directo en escritorio"; GroupDescription: "Accesos directos:"; Flags: unchecked

[Run]
Filename: "{app}\{#AppExeName}"; Description: "Abrir Bot Breaker 3D"; Flags: nowait postinstall skipifsilent

[Code]
var
  LorePage: TWizardPage;
  LoreText: TNewStaticText;

procedure InitializeWizard;
begin
  LorePage := CreateCustomPage(
    wpWelcome,
    'Briefing de despliegue',
    'Tu run comienza antes de entrar a la arena.'
  );

  LoreText := TNewStaticText.Create(LorePage);
  LoreText.Parent := LorePage.Surface;
  LoreText.Left := 0;
  LoreText.Top := 0;
  LoreText.Width := LorePage.SurfaceWidth;
  LoreText.Height := ScaleY(180);
  LoreText.AutoSize := False;
  LoreText.WordWrap := True;
  LoreText.Caption :=
    'Bienvenido a BOT BREAKER 3D.' + #13#10 + #13#10 +
    'Este wizard instala la build tactica en tu PC con estilo arena shooter.' + #13#10 +
    'Despues de instalar, podras abrir el juego desde el acceso directo y entrar al combate.' + #13#10 + #13#10 +
    'Consejo de piloto: si Windows muestra SmartScreen, elige "Mas informacion" y luego "Ejecutar de todas formas".';
end;
