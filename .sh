eval "$(ssh-agent -s)"
ssh-add ~/.ssh/yogi


# setting up the node environment


echo "starting deployment process"

# download new version of our application
cd /var/www/backend/vf-server
git pull origin main

# install all the dependencies
echo "installing dependencies"
npm install

# build the application
echo "building application"
npm run build

# run the application
echo "starting the application"
cd /var/www/backend/vf-server
pm2 restart 0

echo "deployment process completed"