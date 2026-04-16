param(
  [int]$Port = 4173,
  [string]$Root = ""
)

if ([string]::IsNullOrWhiteSpace($Root)) {
  $Root = Join-Path $PSScriptRoot "dist"
}

if (!(Test-Path $Root)) {
  Write-Host "No se encontro la carpeta raiz del servidor: $Root"
  exit 1
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://127.0.0.1:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
  Write-Host "Servidor local iniciado en $prefix"
  Write-Host "Sirviendo archivos desde: $Root"

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = $context.Request.Url.AbsolutePath.TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $localPath = Join-Path $Root ($requestPath -replace "/", "\")
    if (Test-Path $localPath -PathType Container) {
      $localPath = Join-Path $localPath "index.html"
    }

    if (!(Test-Path $localPath)) {
      # SPA fallback
      $localPath = Join-Path $Root "index.html"
    }

    if (!(Test-Path $localPath)) {
      $context.Response.StatusCode = 404
      $context.Response.Close()
      continue
    }

    $ext = [System.IO.Path]::GetExtension($localPath).ToLowerInvariant()
    $contentType = switch ($ext) {
      ".html" { "text/html; charset=utf-8" }
      ".js" { "application/javascript; charset=utf-8" }
      ".css" { "text/css; charset=utf-8" }
      ".json" { "application/json; charset=utf-8" }
      ".svg" { "image/svg+xml" }
      ".png" { "image/png" }
      ".jpg" { "image/jpeg" }
      ".jpeg" { "image/jpeg" }
      ".webmanifest" { "application/manifest+json; charset=utf-8" }
      default { "application/octet-stream" }
    }

    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
  }
}
finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
