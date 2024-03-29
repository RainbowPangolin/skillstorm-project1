@REM Build static react files

pushd ".\src\main\resources\frontend\"
call npm run build
popd

@REM Start Spring project
for /f "delims=" %%x in (secret.env) do set %%x

mvn spring-boot:run