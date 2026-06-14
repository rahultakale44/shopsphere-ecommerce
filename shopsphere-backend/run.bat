@echo off
setlocal
set PORT=8080

echo Checking port %PORT%...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT%.*LISTENING"') do (
  echo Stopping process %%a on port %PORT%...
  taskkill /PID %%a /F >nul 2>&1
)

timeout /t 1 /nobreak >nul
call mvnw.cmd spring-boot:run
