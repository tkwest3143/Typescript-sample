@echo off

set CURRENT=%~dp0

for /f %%a in ('echo prompt $e ^| cmd') do set ESC=%%a

echo %ESC%[96mstart freedom application building
echo %ESC%[0m
cd %CURRENT%
cd ../frontend
call yarn run build 
cd ../backend
call yarn run build

echo %ESC%[96mmove frontend file
echo %ESC%[0m
move ../frontend/build ./dist/public

echo %ESC%[92mbuild finished!!
echo %ESC%[0m