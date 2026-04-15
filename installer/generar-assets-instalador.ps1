param(
  [string]$OutputDir = (Split-Path -Parent $MyInvocation.MyCommand.Path)
)

Add-Type -AssemblyName System.Drawing

function New-GradientBrush {
  param(
    [System.Drawing.Rectangle]$Rect,
    [System.Drawing.Color]$TopColor,
    [System.Drawing.Color]$BottomColor
  )
  return New-Object System.Drawing.Drawing2D.LinearGradientBrush($Rect, $TopColor, $BottomColor, 90)
}

function New-WizardLargeImage {
  param([string]$Path)

  $width = 164
  $height = 314
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  try {
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $bgBrush = New-GradientBrush -Rect $rect -TopColor ([System.Drawing.Color]::FromArgb(255, 8, 20, 38)) -BottomColor ([System.Drawing.Color]::FromArgb(255, 5, 8, 22))
    $g.FillRectangle($bgBrush, $rect)
    $bgBrush.Dispose()

    $cyan = [System.Drawing.Color]::FromArgb(120, 92, 242, 255)
    $pink = [System.Drawing.Color]::FromArgb(110, 255, 95, 140)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush($cyan)), -42, -24, 146, 146)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush($pink)), 80, 202, 120, 120)

    $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(55, 114, 170, 255), 1)
    for ($y = 0; $y -lt $height; $y += 18) {
      $g.DrawLine($gridPen, 0, $y, $width, $y)
    }
    $gridPen.Dispose()

    $titleFont = New-Object System.Drawing.Font("Arial Black", 19, [System.Drawing.FontStyle]::Bold)
    $subFont = New-Object System.Drawing.Font("Segoe UI", 8.5, [System.Drawing.FontStyle]::Regular)
    $titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(236, 244, 255))
    $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(170, 209, 231))
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(141, 249, 255))

    $g.DrawString("BOT", $titleFont, $titleBrush, 12, 86)
    $g.DrawString("BREAKER", $titleFont, $titleBrush, 12, 120)
    $g.DrawString("3D", $titleFont, $accentBrush, 12, 156)
    $g.DrawString("PROTOTYPE BUILD", $subFont, $subBrush, 12, 196)
    $g.DrawString("TACTICAL WIZARD", $subFont, $subBrush, 12, 214)

    $titleFont.Dispose()
    $subFont.Dispose()
    $titleBrush.Dispose()
    $subBrush.Dispose()
    $accentBrush.Dispose()

    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 92, 242, 255), 2)
    $g.DrawRectangle($borderPen, 1, 1, $width - 3, $height - 3)
    $borderPen.Dispose()

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Bmp)
  }
  finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

function New-WizardSmallImage {
  param([string]$Path)

  $width = 55
  $height = 55
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  try {
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $bgBrush = New-GradientBrush -Rect $rect -TopColor ([System.Drawing.Color]::FromArgb(255, 9, 25, 46)) -BottomColor ([System.Drawing.Color]::FromArgb(255, 4, 10, 20))
    $g.FillRectangle($bgBrush, $rect)
    $bgBrush.Dispose()

    $ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 92, 242, 255), 3)
    $g.DrawEllipse($ringPen, 8, 8, 38, 38)
    $ringPen.Dispose()

    $font = New-Object System.Drawing.Font("Arial Black", 13, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(238, 244, 255))
    $g.DrawString("BB", $font, $brush, 8, 16)
    $font.Dispose()
    $brush.Dispose()

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Bmp)
  }
  finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

if (!(Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

$largePath = Join-Path $OutputDir "wizard-large.bmp"
$smallPath = Join-Path $OutputDir "wizard-small.bmp"

New-WizardLargeImage -Path $largePath
New-WizardSmallImage -Path $smallPath

Write-Output "Assets generados:"
Write-Output $largePath
Write-Output $smallPath
