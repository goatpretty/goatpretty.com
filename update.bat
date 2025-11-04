@echo off
setlocal ENABLEDELAYEDEXPANSION

:: ========= 用户可调整区域 =========
set "WORKDIR=E:\web\goatpretty"
:: 默认提交信息（当你不手输时使用）
set "DEFAULT_MSG=自动更新：%date% %time%"
:: ==================================

echo [INFO] 切换到项目目录：%WORKDIR%
cd /d "%WORKDIR%" 2>nul
if errorlevel 1 (
  echo [ERROR] 无法进入目录：%WORKDIR%
  pause
  exit /b 1
)

:: 0) Git 可用性检查
git --version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] 未检测到 Git，请先安装并加入 PATH。
  pause
  exit /b 1
)

:: 1) 是否在 Git 仓库中（不是则尝试初始化）
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [INFO] 当前目录不是 Git 仓库，正在初始化...
  git init || (
    echo [ERROR] git init 失败。
    pause
    exit /b 1
  )
)

:: 2) 获取/创建当前分支
set "BRANCH="
for /f "delims=" %%i in ('git symbolic-ref --short HEAD 2^>nul') do set "BRANCH=%%i"
if not defined BRANCH (
  set "BRANCH=main"
  echo [INFO] 当前无分支，创建并切换到 "%BRANCH%" ...
  git checkout -B "%BRANCH%" || (
    echo [ERROR] 创建/切换分支失败。
    pause
    exit /b 1
  )
)

:: 3) 暂存所有变更
echo [INFO] 暂存所有变更...
git add -A

:: 4) 提交信息（交互输入，可回车跳过用默认）
set "MSG="
set /p MSG=请输入本次更新说明（直接回车使用默认）：
if not defined MSG set "MSG=%DEFAULT_MSG%"

:: 5) 如果有已暂存变更则提交
git diff --cached --quiet
if errorlevel 1 (
  echo [INFO] 正在提交：%MSG%
  git commit -m "%MSG%" || (
    echo [ERROR] 提交失败。
    pause
    exit /b 1
  )
) else (
  echo [INFO] 无需提交：没有已暂存的变更。
)

:: 6) 确保存在远程 origin
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo [WARN] 未检测到远程 origin。
  set "REMOTE="
  set /p REMOTE=请输入远程仓库地址（git@github.com:USER/REPO.git 或 https://github.com/USER/REPO.git）：
  if not defined REMOTE (
    echo [ERROR] 未提供远程地址，无法推送。
    pause
    exit /b 1
  )
  git remote add origin "%REMOTE%" || (
    echo [ERROR] 添加远程地址失败。
    pause
    exit /b 1
  )
)

:: 7) 判断是否已设置上游
git rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
if errorlevel 1 (
  echo [INFO] 首次推送，设置上游：origin/%BRANCH%
  git push -u origin "%BRANCH%"
) else (
  echo [INFO] 推送到远程：origin/%BRANCH%
  git push
)

:: 8) 如果推送失败，并且是 SSH 远端，则自动切换到 HTTPS 重试一次
if errorlevel 1 (
  set "URL="
  for /f "delims=" %%u in ('git remote get-url origin 2^>nul') do set "URL=%%u"
  if defined URL (
    echo [WARN] 首次推送失败，远端为：!URL!
    rem 检测并转换 git@github.com:USER/REPO.git -> https://github.com/USER/REPO.git
    set "PREFIX=git@github.com:"
    if /i "!URL:~0,15!"=="%PREFIX%" (
      set "REST=!URL:%PREFIX%=!"
      set "HTTPS_URL=https://github.com/!REST!"
      echo [INFO] 自动将远端切换为 HTTPS：!HTTPS_URL!
      git remote set-url origin "!HTTPS_URL!" || (
        echo [ERROR] 切换 HTTPS 远端失败。
        pause
        exit /b 1
      )

      echo [INFO] 重试推送到 HTTPS ...
      git rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
      if errorlevel 1 (
        git push -u origin "%BRANCH%"
      ) else (
        git push
      )
      if errorlevel 1 (
        echo [ERROR] 在 HTTPS 下仍推送失败，请检查网络或 GitHub Token（PAT）。
        pause
        exit /b 1
      )
    ) else (
      echo [ERROR] 推送失败，且远端非 SSH 或不可识别。请检查网络/凭据/文件大小限制。
      pause
      exit /b 1
    )
  ) else (
    echo [ERROR] 无法获取远端 URL。
    pause
    exit /b 1
  )
)

echo [DONE] 已成功推送到分支：%BRANCH%
echo [TIP] 若绑定了 Cloudflare Pages（GitHub 集成），将自动触发部署。
echo        如未触发，可在 Pages 控制台手动 Retry，或执行空提交再次推送：
echo        git commit --allow-empty -m "chore: trigger pages rebuild" ^&^& git push
endlocal
pause
