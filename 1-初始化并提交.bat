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

echo 使用的 Git：%GIT%
"%GIT%" --version
echo.

if exist ".git" (
  echo 仓库已存在，跳过初始化。
) else (
  "%GIT%" init
  if errorlevel 1 ( echo [!] 初始化失败 & pause & exit /b 1 )
)

"%GIT%" config user.name >nul 2>nul
if not errorlevel 1 goto HAVE_ID

echo.
echo  第一次提交要设置身份（只显示在 GitHub 提交记录里，和登录账号无关）。
set /p BOTH=请输入「名字 邮箱」，中间用空格分开（例：Su liush@stu.xmu.edu.cn）: 

set GID_NAME=su-site
set GID_MAIL=site@localhost
if defined BOTH (
  for /f "tokens=1,2" %%a in ("%BOTH%") do (
    set GID_NAME=%%a
    set GID_MAIL=%%b
  )
)
"%GIT%" config user.name "%GID_NAME%"
"%GIT%" config user.email "%GID_MAIL%"
:HAVE_ID

echo 提交身份：
"%GIT%" config user.name
"%GIT%" config user.email
echo.

echo 正在添加文件，请稍候（图片较多，可能需要一两分钟）...
"%GIT%" add .
if errorlevel 1 ( echo [!] 添加文件失败 & pause & exit /b 1 )

"%GIT%" commit -m "初次提交：个人学术主页"
if errorlevel 1 (
  echo.
  echo  没有新的改动需要提交（可能已经提交过了）。
)

"%GIT%" branch -M main
echo.
echo ============================================================
echo  第 1 步完成！本地仓库已就绪。
echo.
echo  接下来：
echo   1. 打开 https://github.com/new
echo   2. Repository name 填 su-site
echo   3. 选 Public（免费版 Pages 只对公开仓库开放）
echo   4. 不要勾选 README / .gitignore / license，直接 Create repository
echo   5. 建好后双击「2-推送到GitHub.bat」
echo ============================================================
echo.
pause
