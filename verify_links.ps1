# ============================================================
# verify_links.ps1
# ------------------------------------------------------------
# Scans index.html for local asset links (assets/...) and
# verifies that each target file actually exists on disk.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File verify_links.ps1
#
# Exit code:
#   0  -> all local asset links resolve
#   1  -> at least one link is broken
# ============================================================

$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$htmlPath = Join-Path $root "index.html"

if (-not (Test-Path $htmlPath)) {
    Write-Host "[ERROR] index.html not found next to this script." -ForegroundColor Red
    exit 1
}

$html = Get-Content $htmlPath -Raw -Encoding UTF8

# Find every href="..." / src="..." attribute
$matches = [regex]::Matches($html, '(?:href|src)="([^"]+)"')

$links = @()

foreach ($m in $matches) {
    $raw = $m.Groups[1].Value

    # Only local asset links (relative paths starting with assets/)
    if ($raw -match '^assets/') {
        # URL-decode (handles %20, %26, %2B, %2F, etc.)
        $decoded = [Uri]::UnescapeDataString($raw)

        # Strip any query string / fragment just in case
        $decoded = ($decoded -split '[?#]')[0]

        $links += [PSCustomObject]@{
            Link     = $raw
            Path     = $decoded
            FullPath = Join-Path $root $decoded
        }
    }
}

if ($links.Count -eq 0) {
    Write-Host "[WARN] No local asset links found in index.html." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nVerifying $($links.Count) asset link(s)...`n" -ForegroundColor Cyan

$ok = 0
$broken = @()

foreach ($link in $links) {
    if (Test-Path $link.FullPath -PathType Leaf) {
        Write-Host ("  [OK]   {0}" -f $link.Link) -ForegroundColor Green
        $ok++
    }
    else {
        Write-Host ("  [FAIL] {0}" -f $link.Link) -ForegroundColor Red
        Write-Host ("         missing: {0}" -f $link.FullPath) -ForegroundColor DarkRed
        $broken += $link
    }
}

$resultColor = if ($broken.Count -eq 0) { "Green" } else { "Red" }

Write-Host "`n----------------------------------------" -ForegroundColor Cyan
Write-Host ("  RESULT: {0}/{1} links OK" -f $ok, $links.Count) -ForegroundColor $resultColor

if ($broken.Count -gt 0) {
    Write-Host ("  BROKEN: {0} link(s) missing" -f $broken.Count) -ForegroundColor Red
}

Write-Host "----------------------------------------`n" -ForegroundColor Cyan

if ($broken.Count -gt 0) {
    exit 1
}

exit 0

