#define AppName "Bot Breaker 3D"
#define AppVersion "0.1.0"
#define AppPublisher "betar"
#define AppExeName "abrir-juego.bat"
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
Source: "wizard-welcome.bmp"; Flags: dontcopy
Source: "wizard-briefing.bmp"; Flags: dontcopy
Source: "wizard-install.bmp"; Flags: dontcopy
Source: "wizard-finish.bmp"; Flags: dontcopy

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
  LoreBackground: TBitmapImage;
  LoreText: TNewStaticText;
  LoreHint: TNewStaticText;
  WizardWelcomeArt: string;
  WizardBriefingArt: string;
  WizardInstallArt: string;
  WizardFinishArt: string;

procedure UpdateWizardArt(CurPageID: Integer);
var
  ArtPath: string;
begin
  ArtPath := WizardInstallArt;

  if CurPageID = wpWelcome then
    ArtPath := WizardWelcomeArt
  else if CurPageID = LorePage.ID then
    ArtPath := WizardBriefingArt
  else if CurPageID = wpFinished then
    ArtPath := WizardFinishArt
  else if CurPageID = wpInstalling then
    ArtPath := WizardInstallArt;

  if FileExists(ArtPath) then
    WizardForm.WizardBitmapImage.Bitmap.LoadFromFile(ArtPath);
end;

procedure CurPageChanged(CurPageID: Integer);
begin
  UpdateWizardArt(CurPageID);
end;

procedure InitializeWizard;
begin
  WizardForm.Color := $00160805;
  WizardForm.PageNameLabel.Font.Color := $00F4F0EA;
  WizardForm.PageDescriptionLabel.Font.Color := $00E3D0C1;

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

  ExtractTemporaryFile('wizard-welcome.bmp');
  ExtractTemporaryFile('wizard-briefing.bmp');
  ExtractTemporaryFile('wizard-install.bmp');
  ExtractTemporaryFile('wizard-finish.bmp');

  WizardWelcomeArt := ExpandConstant('{tmp}\wizard-welcome.bmp');
  WizardBriefingArt := ExpandConstant('{tmp}\wizard-briefing.bmp');
  WizardInstallArt := ExpandConstant('{tmp}\wizard-install.bmp');
  WizardFinishArt := ExpandConstant('{tmp}\wizard-finish.bmp');

  LoreBackground := TBitmapImage.Create(LorePage);
  LoreBackground.Parent := LorePage.Surface;
  LoreBackground.Left := 0;
  LoreBackground.Top := 0;
  LoreBackground.Width := LorePage.SurfaceWidth;
  LoreBackground.Height := LorePage.SurfaceHeight;
  LoreBackground.Stretch := True;
  LoreBackground.Anchors := [akLeft, akTop, akRight, akBottom];
  LoreBackground.Bitmap.LoadFromFile(WizardBriefingArt);

  LoreText := TNewStaticText.Create(LorePage);
  LoreText.Parent := LorePage.Surface;
  LoreText.Left := ScaleX(12);
  LoreText.Top := ScaleY(12);
  LoreText.Width := LorePage.SurfaceWidth - ScaleX(24);
  LoreText.Height := ScaleY(190);
  LoreText.AutoSize := False;
  LoreText.WordWrap := True;
  LoreText.Font.Style := [fsBold];
  LoreText.Font.Size := 10;
  LoreText.Font.Color := $00FFF4EE;
  LoreText.Caption :=
    'Estado: PREPARANDO DESPLIEGUE' + #13#10 + #13#10 +
    'Tu objetivo es sobrevivir oleadas, farmear monedas y derrotar bosses.' + #13#10 +
    'Este wizard instalara la build tactica en tu PC y dejara acceso directo listo.' + #13#10 + #13#10 +
    'Tip de comandante: si SmartScreen aparece, usa "Mas informacion" y luego "Ejecutar de todas formas".';

  LoreHint := TNewStaticText.Create(LorePage);
  LoreHint.Parent := LorePage.Surface;
  LoreHint.Left := ScaleX(12);
  LoreHint.Top := LoreText.Top + LoreText.Height + ScaleY(8);
  LoreHint.Width := LorePage.SurfaceWidth - ScaleX(24);
  LoreHint.Height := ScaleY(48);
  LoreHint.AutoSize := False;
  LoreHint.WordWrap := True;
  LoreHint.Font.Color := $00FFF95C;
  LoreHint.Caption :=
    'Build Prototype: instala primero y luego abre BOT BREAKER 3D desde el acceso directo.';

  UpdateWizardArt(wpWelcome);
end;
