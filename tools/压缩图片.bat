@echo off
chcp 65001 >nul
cd /d "%~dp0\.."
echo.
echo ============================================================
echo   图片批量压缩
echo   长边压到 2400 像素、质量 82，原图自动备份
echo   动图（gif）不处理，需要单独在 ImageJ 里做
echo ============================================================
echo.
set "NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-3\node.exe" (
    set "NODE=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
  ) else (
    echo.
    echo  [!] 没有找到 Node.js。请先安装 Node.js 22，再重新双击本文件。
    echo.
    pause
    exit /b 1
  )
)

"%NODE%" tools\compress-images.cjs
echo.
pause
