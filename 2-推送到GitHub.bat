@echo off
cd /d "%~dp0"
echo 站点目录：%CD%
echo.
echo ============================================================
echo  前提：已在 https://github.com/new 建好空仓库
echo    Repository name：su-bot-cc.github.io
echo    Public，不勾选 README / .gitignore / license
echo.
echo  下面直接按回车即可使用默认地址；
echo  如果你的仓库名不同，再粘贴你自己的地址。
echo ============================================================
echo.
set "REPO=https://github.com/Su-bot-cc/su-bot-cc.github.io.git"
set /p REPO=仓库地址（回车用默认值）:

if not defined REPO (
  echo 没有输入地址，已取消。
  pause
  exit /b 1
)
set "REPO=%REPO:"=%"

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

echo.
echo 关联远程仓库：%REPO%
"%GIT%" remote remove origin >nul 2>nul
"%GIT%" remote add origin "%REPO%"
if errorlevel 1 ( echo [!] 关联失败，检查地址是否完整 & pause & exit /b 1 )

"%GIT%" branch -M main
echo 正在推送，首次推送内容较多，请耐心等待（几分钟是正常的）...
"%GIT%" push -u origin main
if errorlevel 1 (
  echo.
  echo [!] 推送失败。常见原因：
  echo   1. 弹出的 GitHub 登录窗口没完成登录 —— 重新双击本文件再试一次
  echo   2. 仓库还没建，或仓库名和用户名不一致
  echo   3. 网络问题 —— 重试一次
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo  推送成功！
echo.
echo  最后一步：打开仓库页面
echo    Settings - Pages - Source 选择 "GitHub Actions"
echo  约 1-2 分钟后访问：
echo    https://su-bot-cc.github.io/
echo ============================================================
echo.
pause
