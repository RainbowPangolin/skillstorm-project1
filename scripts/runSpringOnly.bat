@REM Start Spring project
for /f "delims=" %%x in (secret.env) do set %%x

mvn spring-boot:run