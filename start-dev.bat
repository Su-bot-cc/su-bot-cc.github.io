@echo off
chcp 65001 >nul
set "NODE_DIR=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-3"
set "PATH=%NODE_DIR%;%PATH%"
cd /d "%~dp0"

echo ============================================
echo   Su Site - local preview
echo   URL:  http://127.0.0.1:4321
echo   Stop: press Ctrl+C in this window
echo ============================================
echo.

start "" /MIN cmd /c "timeout /t 5 >nul & start http://127.0.0.1:4321"

npm run dev -- --host 127.0.0.1 --port 4321

pause
