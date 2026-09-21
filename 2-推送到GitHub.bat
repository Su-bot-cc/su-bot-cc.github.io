@echo off
cd /d "%%~dp0"
echo 站点目录：%%CD%
echo.
echo ============================================================
echo  请先在 GitHub 网页上建好空仓库（su-site，Public，不初始化）。
echo  建好后复制页面上的 HTTPS 地址，例如：
echo       https://github.com/zhangsan/su-site.git
echo.
echo  注意：不要复制 git@github.com: 开头的 SSH 地址。
echo ============================================================
echo.
set /p REPO=把仓库地址粘贴到这里后按回车: 

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
echo 正在推送，首次推送约 220MB，请耐心等待（几分钟是正常的）...
"%GIT%" push -u origin main
if errorlevel 1 (
  echo.
  echo [!] 推送失败。常见原因：
  echo   1. 弹出的 GitHub 登录窗口没完成登录 —— 重新双击本文件再试一次
  echo   2. 仓库地址写错，或仓库不是空的
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
echo    https://你的用户名.github.io/su-site/
echo ============================================================
echo.
pause
