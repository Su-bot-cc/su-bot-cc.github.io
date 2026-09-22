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

echo [1/4] 先把 GitHub 上的最新内容同步到本地
echo      （在网页上改过文件时，这一步会把那些改动拉回来）
"%GIT%" pull --rebase --autostash
if errorlevel 1 (
  echo.
  echo [!] 同步失败。常见原因：
  echo   1. 网络不通 —— 换个时间重新双击本文件
  echo   2. 你在 GitHub 网页上改的文件，和本地改动撞在同一处 —— 需要手动处理冲突
  echo.
  pause
  exit /b 1
)

echo.
echo [2/4] 本地状态：
"%GIT%" status -sb
echo.

"%GIT%" status --short > "%TEMP%\su-site-status.txt"
findstr /r "." "%TEMP%\su-site-status.txt" >nul
if errorlevel 1 goto PUSH

echo [3/4] 发现改动，写一句说明再提交。
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
echo [4/4] 正在推送到 GitHub...
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
