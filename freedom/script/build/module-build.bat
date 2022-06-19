@echo off

set CURRENT=%~dp0

for /f %%a in ('echo prompt $e ^| cmd') do set ESC=%%a

echo %ESC%[96mstart freedom application building for module
echo %ESC%[0m
cd %CURRENT%
call build.bat

cd %CURRENT%
cd ../../backend
call yarn build:exe

echo %ESC%[92mbuild finished!!
echo %ESC%[0m