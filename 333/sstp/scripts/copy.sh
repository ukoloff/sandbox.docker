#
# Copy existing certificates
#
cd /ssl/uxm
echo "Copying certificate..."

cp ekb-ru.full.crt ../sstp.cer
cp ekb-ru.key ../sstp.key

echo "Done!"
