@echo off
title AAIFA - Avighna Abhyasa Institute of Fine Arts

color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║     AVIGHNA ABHYASA INSTITUTE OF FINE ARTS               ║
echo  ║     Website Launcher v2.0                                ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if we're in the right directory
if not exist "package.json" (
    echo  [ERROR] package.json not found.
    echo  Please place this file in the AAIFA project root folder.
    echo.
    pause
    exit /b 1
)

echo  [1/3] Installing / verifying dependencies...
call npm install --silent
echo  [OK] Dependencies ready.
echo.

echo  [2/3] Starting Next.js development server...
start "AAIFA Dev Server" cmd /k "color 0B && echo. && echo  AAIFA Dev Server Running... && echo  Press Ctrl+C to stop. && echo. && npm run dev"
echo  [OK] Server window launched.
echo.

echo  [3/3] Opening browser (waiting 8 seconds for server to start)...
timeout /t 8 /nobreak >nul
start "" "http://localhost:3000"
echo  [OK] Browser opened at http://localhost:3000
echo.

echo  ╔══════════════════════════════════════════════════════════╗
echo  ║   Website is running! Close the server window to stop.   ║
echo  ║   URL: http://localhost:3000                              ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
pause
