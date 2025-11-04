@echo off
cd /d E:\web\goatpretty
git add .
git commit -m "自动更新：%date% %time%"
git push origin main
echo 已推送至 GitHub，Cloudflare Pages 将自动部署。
pause
