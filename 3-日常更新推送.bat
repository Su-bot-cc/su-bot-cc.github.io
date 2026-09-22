@echo off
cd /d "%~dp0"
echo 站点目录：%CD%
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

echo 本地状态：
"%GIT%" status -sb
echo.

"%GIT%" status --short > "%TEMP%\su-site-status.txt"
findstr /r "." "%TEMP%\su-site-status.txt" >nul
if errorlevel 1 goto PUSH

echo 发现改动，写一句说明再提交。
set /p MSG=说明（例如：新增三张生境照）:
if not defined MSG set "MSG=更新网站内容"

"%GIT%" add .
"%GIT%" commit -q -m "%MSG%"
if errorlevel 1 (
  echo.
  echo [!] 提交失败，可能确实没有需要提交的改动。
)

:PUSH
echo.
echo 正在推送到 GitHub...
"%GIT%" push
if errorlevel 1 (
  echo.
  echo [!] 推送失败。常见原因：
  echo   1. 网络不通或代理报错 —— 换时间重试一次
  echo   2. GitHub 登录过期 —— 重新双击本文件，按提示完成登录
  echo.
  pause
  exit /b 1
)

echo.
echo 已推送！GitHub 会自动构建，约 1-2 分钟后线上更新。
echo 网址：https://academicabin.com/
echo.
pause
