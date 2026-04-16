#define AppName "Bot Breaker 3D"
#define AppVersion "0.1.0"
#define AppPublisher "betar"
#define AppExeName "abrir-juego-app.bat"
#define AppUrl "https://github.com/MiniBeta832/shooter"

[Setup]
AppId={{C6F13A4A-9F54-4E55-9A87-6DE8A8E8927D}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion} - Prototype Build
AppPublisher={#AppPublisher}
AppPublisherURL={#AppUrl}
AppSupportURL={#AppUrl}
AppUpdatesURL={#AppUrl}
DefaultDirName={autopf}\Bot Breaker 3D
DefaultGroupName=Bot Breaker 3D
OutputDir=..\public\installer-output
OutputBaseFilename=BotBreakerSetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
SetupIconFile=installer-icon.ico
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
Source: "..\abrir-juego-app.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\servidor-local.ps1"; DestDir: "{app}"; Flags: ignoreversion

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
  LoreHint: TNewStaticText;

procedure InitializeWizard;
begin
  WizardForm.Color := $002A143A;
  WizardForm.PageNameLabel.Font.Color := $00F4F0EA;
  WizardForm.PageDescriptionLabel.Font.Color := $00E3D0C1;
  WizardForm.WizardBitmapImage.Visible := False;

  if ActiveLanguage = 'spanish' then
  begin
    WizardForm.WelcomeLabel1.Caption := 'Bienvenido al despliegue de BOT BREAKER 3D';
    WizardForm.WelcomeLabel2.Caption :=
      'Este instalador configurara la arena en tu PC. Presiona Siguiente para entrar al briefing tactico.';
    WizardForm.FinishedHeadingLabel.Caption := 'Instalacion completada';
    WizardForm.FinishedLabel.Caption :=
      'Todo listo, piloto. Cierra esta ventana para abrir BOT BREAKER 3D y entrar al combate.';
  end
  else
  begin
    WizardForm.WelcomeLabel1.Caption := 'Welcome to the BOT BREAKER 3D deployment';
    WizardForm.WelcomeLabel2.Caption :=
      'This installer will set up the arena on your PC. Press Next to enter the tactical briefing.';
    WizardForm.FinishedHeadingLabel.Caption := 'Installation complete';
    WizardForm.FinishedLabel.Caption :=
      'All set, pilot. Close this window to launch BOT BREAKER 3D and drop into combat.';
  end;

  LorePage := CreateCustomPage(
    wpWelcome,
    'Briefing de despliegue',
    'Tu run comienza antes de entrar a la arena.'
  );
  LorePage.Surface.Color := $002A143A;

  LoreText := TNewStaticText.Create(LorePage);
  LoreText.Parent := LorePage.Surface;
  LoreText.Left := ScaleX(12);
  LoreText.Top := ScaleY(14);
  LoreText.Width := LorePage.SurfaceWidth - ScaleX(24);
  LoreText.Height := ScaleY(186);
  LoreText.AutoSize := False;
  LoreText.WordWrap := True;
  LoreText.Font.Style := [fsBold];
  LoreText.Font.Size := 10;
  LoreText.Font.Color := $00F2F2F2;
  LoreText.Caption :=
    'Estado: DESPLIEGUE LISTO' + #13#10 + #13#10 +
    'Supervive oleadas, junta monedas y derriba bosses en la arena.' + #13#10 +
    'Este instalador deja BOT BREAKER 3D listo para jugar en tu PC.' + #13#10 + #13#10 +
    'Si SmartScreen aparece, usa "Mas informacion" y luego "Ejecutar de todas formas".';

  LoreHint := TNewStaticText.Create(LorePage);
  LoreHint.Parent := LorePage.Surface;
  LoreHint.Left := ScaleX(12);
  LoreHint.Top := LoreText.Top + LoreText.Height + ScaleY(8);
  LoreHint.Width := LorePage.SurfaceWidth - ScaleX(24);
  LoreHint.Height := ScaleY(52);
  LoreHint.AutoSize := False;
  LoreHint.WordWrap := True;
  LoreHint.Font.Color := $00AAAAAA;
  LoreHint.Caption :=
    'Tip: termina la instalacion y abre BOT BREAKER 3D desde el acceso directo.';
end;
