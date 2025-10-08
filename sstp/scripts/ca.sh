#
# Hand-made self-signed CA
#
mkdir -p ca

if [ ! -e ca/ca.key ]
then
  openssl genpkey -algorithm ED25519 -out ca/ca.key
fi

if [ ! -e ca/ca.cer ]
then
  openssl req -key ca/ca.key -x509 -days 3652 -subj /CN="SSTP CA" -out ca/ca.cer
  openssl x509 -in ca/ca.cer -noout -text >> ca/ca.cer
fi

openssl genpkey -algorithm ED25519 -out sstp.key
openssl req -key sstp.key -x509 -days 90 -CA ca/ca.cer -CAkey ca/ca.key -addext basicConstraints=CA:FALSE -subj /CN=${X509CN:-SSTP} -out sstp.cer
openssl x509 -in sstp.cer -noout -text >> sstp.cer
