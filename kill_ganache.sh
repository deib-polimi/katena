pip_user_id=$(lsof -i :8545 | awk 'NR==2{print $2}')
echo "Killing ganache network in port : ${pip_user_id}"
kill $pip_user_id