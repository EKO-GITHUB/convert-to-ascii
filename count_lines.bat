@echo off
"C:\ide\cloc-2.06.exe" ^
  "C:\workspaces\convert-to-ascii\src" ^
  --exclude-ext=txt,csv,json
pause