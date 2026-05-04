Add-Type -AssemblyName System.Drawing

$src = "C:\Users\dcabi\.gemini\antigravity\brain\6c2f6d80-4603-43fa-ae5e-f2e4445054cb\icon128_1777883537208.png"
$destDir = ".\assets\icons"

foreach ($size in @(16, 48, 128)) {
    $orig = [System.Drawing.Image]::FromFile($src)
    $bmp  = New-Object System.Drawing.Bitmap($size, $size)
    $g    = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($orig, 0, 0, $size, $size)
    $g.Dispose()
    $orig.Dispose()
    $bmp.Save("$destDir\icon$size.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved icon$size.png"
}
Write-Host "All icons done."
