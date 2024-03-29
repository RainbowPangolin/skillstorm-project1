@REM Build static react files

pushd ".\src\main\resources\frontend\"
call npm run build
popd

@REM Start Spring project

mvn spring-boot:run