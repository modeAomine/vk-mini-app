#!/bin/sh

# Replace environment variables in built files
echo "Injecting environment variables..."
for file in /usr/share/nginx/html/js/*.js /usr/share/nginx/html/css/*.css;
do
    if [ -f "$file" ]; then
        sed -i "s|VITE_API_URL_PLACEHOLDER|${VITE_API_URL}|g" $file
        sed -i "s|VITE_VK_APP_ID_PLACEHOLDER|${VITE_VK_APP_ID}|g" $file
    fi
done

echo "Starting nginx..."
exec nginx -g 'daemon off;'