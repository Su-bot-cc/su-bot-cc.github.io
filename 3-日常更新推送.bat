@echo off
cd /d "%%~dp0"
echo 站点目录：%%CD%
echo.
set "GIT=git"
where git >nul 2>nul
if errorlevel 1 (
  if exist "D:\Git\cmd\git.exe" (
    set "GIT=D:\Git\cmd\git.exe"
  ) else (
    if exist "C:\Program Files\Git\cmd\git.exe" (
      set "GIT=C:\Program Files\Git\cmd\git.exe"
    ) else (
      echo.
      echo  [!] 没有找到 Git。请先安装 Git for Windows，再重新双击本文件。
      echo.
      pause
      exit /b 1
    )
  )
)

echo 本次改动：
"%GIT%" status --short
echo.

"%GIT%" status --short > "%TEMP%\su-site-status.txt"
findstr /r "." "%TEMP%\su-site-status.txt" >nul
if errorlevel 1 (
  echo 没有任何改动，不需要提交。
  pause
  exit /b 0
)

set /p MSG=写一句说明（例如：新增三张生境照）: 
if not defined MSG set "MSG=更新网站内容"

"%GIT%" add .
"%GIT%" commit -q -m "%MSG%"
if errorlevel 1 (
  echo.
  echo [!] 提交失败，可能确实没有需要提交的改动。
  pause
  exit /b 1
)

"%GIT%" push
if errorlevel 1 (
  echo.
  echo [!] 推送失败，检查网络或 GitHub 登录状态后重试。
  pause
  exit /b 1
)

echo.
echo 已推送！GitHub 会自动构建，约 1-2 分钟后线上更新。
echo.
pause
