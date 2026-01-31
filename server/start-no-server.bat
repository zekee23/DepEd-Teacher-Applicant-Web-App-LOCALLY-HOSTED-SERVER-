@echo off
echo Opening HRMPSB Evaluation System...
echo.
echo NOTE: This will open the system locally only.
echo For network access, you need a server (Python, Node.js, or IIS).
echo.
echo Opening in default browser...

cd /d "%~dp0"
start index.html

pause
