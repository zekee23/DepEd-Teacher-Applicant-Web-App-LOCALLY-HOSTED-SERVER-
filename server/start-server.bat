@echo off
echo ========================================
echo HRMPSB Evaluation System Server
echo ========================================
echo.

echo Starting Python server...
echo.

cd /d "%~dp0"
python simple-server.py

echo.
echo Server stopped.
pause
