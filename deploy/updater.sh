echo "$(tput setaf 3)Updater$(tput sgr0) lambda deploy on $1 stage"

if [ "$1" == "dev" ]; then
    lerna bootstrap
    echo "DEV"
else
    echo "PROD"
    npx lerna bootstrap
fi

cd ../services/updater/

rm -Rf node_modules

echo 'Installing dependencies'

yarn

echo 'Dependencies were successfully installed'

echo 'Copying reusable between lambdas modules built by lerna in local node_modules';

mkdir -p node_modules/@spotifier
cp -v -R -L ../../node_modules/@spotifier/* node_modules/@spotifier/ > /dev/null

echo 'Deploying lambda'

if [ "$1" == "dev" ]; then
    sls deploy --stage $1 || exit 1
else
    npx serverless deploy --stage $1 || exit 1
fi

echo 'Deploy was successfully completed'

echo 'Removing all node_modules, yarn.lock and .serverless'

rm -Rf node_modules
rm yarn.lock
rm -Rf .serverless

echo 'Done'
