@echo off
cd /d "%~dp0"
echo.
echo ============================================================
echo   推送问题诊断
echo   跑完请把窗口里的内容截图发出来
echo ============================================================
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


echo [1] Git 位置与版本
"%GIT%" --version
echo.

echo [2] 远程仓库地址
"%GIT%" remote -v
echo.

echo [3] 本地分支状态（ahead 表示有提交没推送）
"%GIT%" status -sb
echo.

echo [4] 最近 3 条提交
"%GIT%" log --oneline -3
echo.

echo [5] 待推送的文件
"%GIT%" diff --stat origin/main..HEAD
echo.

echo [6] 网络连通性测试（能连上会显示一串英文，连不上会报错）
"%GIT%" ls-remote --heads origin main
echo   上一行返回码：%errorlevel%
echo   （0 表示正常连通，非 0 表示网络不通或登录过期）
echo.

echo [7] 推送缓冲设置
"%GIT%" config --global --get http.postBuffer
echo.

echo ============================================================
echo   诊断结束
echo ============================================================
echo.
pause
