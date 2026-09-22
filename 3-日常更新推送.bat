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
"%GIT%" config --global http.postBuffer 524288000 >nul 2>nul


echo ============================================================
echo  第 1 步：先看本地有没有没提交的改动
echo ============================================================
echo.
"%GIT%" status -sb
echo.

"%GIT%" status --short > "%TEMP%\su-site-status.txt"
findstr /r "." "%TEMP%\su-site-status.txt" >nul
if errorlevel 1 goto SYNC

echo 发现改动，写一句说明（直接回车用默认说明）。
set "MSG=更新网站内容"
set /p MSG=说明：
if not defined MSG set "MSG=更新网站内容"

echo.
echo 正在提交...
"%GIT%" add .
"%GIT%" commit -q -m "%MSG%"
if errorlevel 1 (
  echo.
  echo  [!] 提交没有成功，可能确实没有新改动。
)

:SYNC
echo.
echo ============================================================
echo  第 2 步：把 GitHub 上的内容同步到本地
echo      （在网页上改过文件时，这一步会把那些改动拉回来）
echo ============================================================
"%GIT%" pull --rebase --autostash
if errorlevel 1 (
  echo.
  echo  [~] 同步这一步没成功。先记下来，继续尝试推送--
  echo      多数情况只是网络波动，不影响把本地内容推上去。
  echo.
)

echo.
echo ============================================================
echo  第 3 步：推送到 GitHub
echo      动图文件较大，可能需要几分钟，请不要关窗口
echo ============================================================
"%GIT%" push
if errorlevel 1 (
  echo.
  echo  第一次没成功，等 5 秒自动重试...
  timeout /t 5 /nobreak >nul
  "%GIT%" push
  if errorlevel 1 (
    echo.
    echo  再等 10 秒试最后一次...
    timeout /t 10 /nobreak >nul
    "%GIT%" push
    if errorlevel 1 (
      echo.
      echo ============================================================
      echo  [!] 三次都没推送成功。
      echo      请双击「0-诊断推送问题.bat」，把窗口内容截图发我。
      echo.
      echo  你也可以先自己看一眼报错里有没有这些关键词：
      echo    RPC failed / curl 56     -- 网络中断，换个时间重试
      echo    Authentication failed    -- 登录过期，需重新登录
      echo    Updates were rejected    -- 本地落后于 GitHub，需先同步
      echo    timed out                -- 网络慢，重试即可
      echo ============================================================
      echo.
      pause
      exit /b 1
    )
  )
)

echo.
echo ============================================================
echo  推送成功！
echo  GitHub 会自动构建，约 1-2 分钟后线上更新。
echo  网址：https://academicabin.com/
echo ============================================================
echo.
pause
