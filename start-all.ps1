# =============================================
# Micro-Frontend Full Startup Script
# Run from the project root (React vue/)
# Usage: .\start-all.ps1
# =============================================

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  MICRO-FRONTEND STARTUP SCRIPT" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build all React remotes
Write-Host "[1/5] Building react-login..." -ForegroundColor Yellow
Set-Location "$root\react-login"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: react-login build failed!" -ForegroundColor Red; exit 1 }

Write-Host "[2/5] Building react-signup..." -ForegroundColor Yellow
Set-Location "$root\react-signup"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: react-signup build failed!" -ForegroundColor Red; exit 1 }

Write-Host "[3/5] Building react-profile..." -ForegroundColor Yellow
Set-Location "$root\react-profile"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: react-profile build failed!" -ForegroundColor Red; exit 1 }

Write-Host "[4/5] Building react-dashboard..." -ForegroundColor Yellow
Set-Location "$root\react-dashboard"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: react-dashboard build failed!" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "All builds successful! Starting servers..." -ForegroundColor Green
Write-Host ""

# Step 2: Start all preview servers in separate terminal windows
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\react-login'; Write-Host 'react-login preview on :5001' -ForegroundColor Cyan; npm run preview"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\react-signup'; Write-Host 'react-signup preview on :5002' -ForegroundColor Cyan; npm run preview"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\react-profile'; Write-Host 'react-profile preview on :5003' -ForegroundColor Cyan; npm run preview"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\react-dashboard'; Write-Host 'react-dashboard preview on :5004' -ForegroundColor Cyan; npm run preview"

# Step 3: Start Vue host dev server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\vue-host'; Write-Host 'vue-host dev on :5173' -ForegroundColor Green; npm run dev"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  ALL SERVERS STARTED!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  react-login    -> http://localhost:5001" -ForegroundColor White
Write-Host "  react-signup   -> http://localhost:5002" -ForegroundColor White
Write-Host "  react-profile  -> http://localhost:5003" -ForegroundColor White
Write-Host "  react-dashboard-> http://localhost:5004" -ForegroundColor White
Write-Host "  vue-host       -> http://localhost:5173  <-- Open THIS" -ForegroundColor Green
Write-Host ""
Write-Host "  Waiting 5s then opening the browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"
