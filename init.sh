

#############################################################################
#     GET ACCOUNT AND PRIVATE KEYS                                          #
#############################################################################

# to format the accounts info into a better readable format
cat .katena/accounts.json | jq > .katena/accounts-pretty.json
IFS=: read -r ACCOUNT PRIVATE_KEY <<< $(awk '/"private_keys"/{getline; print}' .katena/accounts-pretty.json)

PRIVATE_KEY=${PRIVATE_KEY::-1}

ACCOUNT=$(echo $ACCOUNT | sed "s/\"/'/g")

PRIVATE_KEY=$(echo $PRIVATE_KEY | sed "s/\"/'/g")

echo "Your account is: ${ACCOUNT}"
echo "Your private key is: ${PRIVATE_KEY}"

cat << EOF > .katena/input.yml
UserKeyGanache: $PRIVATE_KEY
UserWallet: $ACCOUNT
EOF