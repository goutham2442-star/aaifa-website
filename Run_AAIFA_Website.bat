@echo off
title AAIFA - Avighna Abhyasa Institute of Fine Arts
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║     AVIGHNA ABHYASA INSTITUTE OF FINE ARTS               ║
echo  ║     Website Launcher v3.0  ^|  localhost:3000             ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check project folder
if not exist "package.json" (
    echo  [ERROR] package.json not found. Run this from the AAIFA project root.
    pause
    exit /b 1
)

:: Only install if node_modules is missing (saves time on repeat launches)
if not exist "node_modules\" (
    echo  [1/3] node_modules not found - installing dependencies...
    call npm install --silent
    echo  [OK] Dependencies installed.
) else (
    echo  [1/3] Dependencies already present. Skipping install.
)
echo.

:: Start the dev server in a new window
echo  [2/3] Starting Next.js dev server...
start "AAIFA Dev Server" cmd /k "color 0B && echo. && echo  AAIFA Dev Server - http://localhost:3000 && echo  Press Ctrl+C to stop. && echo. && npm run dev"
echo.

:: Poll localhost:3000 until the server responds (max 30 attempts x 1s = 30s)
echo  [3/3] Waiting for server to be ready...
set ATTEMPTS=0
:WAIT_LOOP
set /a ATTEMPTS+=1
if %ATTEMPTS% GTR 30 goto OPEN_ANYWAY
powershell -Command "try { $r = Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto SERVER_READY
timeout /t 1 /nobreak >nul
goto WAIT_LOOP

:SERVER_READY
echo  [OK] Server is ready! (took ~%ATTEMPTS% second(s))
goto OPEN_BROWSER

:OPEN_ANYWAY
echo  [OK] Opening browser now...

:OPEN_BROWSER
start "" "http://localhost:3000"
echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║   Website running at http://localhost:3000               ║
echo  ║   Close the "AAIFA Dev Server" window to stop.          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
pause
