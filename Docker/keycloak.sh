NEW_REALM="LiveChat"
KEYCLOAK_URL=http://keycloak.local
KEYCLOAK_REALM="master"
KEYCLOAK_USER="admin"
KEYCLOAK_SECRET="admin"
REALM_FILE="live-chat-realm.json";
CURL_CMD="curl --silent --show-error"
CLIENT_FILE="live-chat-client.json";
USER1_FILE="user1.json"
USER2_FILE="user2.json"

RET=1
until [ ${RET} -eq 0 ]; do
    ACCESS_TOKEN=$(${CURL_CMD} \
    -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=${KEYCLOAK_USER}" \
    -d "password=${KEYCLOAK_SECRET}" \
    -d "grant_type=password" \
    -d 'client_id=admin-cli' \
    "${KEYCLOAK_URL}/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token"|jq -r '.access_token')

    RET=$?

    echo Keycloak not ready, retrying in 10 seconds...
done



${CURL_CMD} \
  -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"${REALM_FILE}" \
  "${KEYCLOAK_URL}/auth/admin/realms";

echo "\n${NEW_REALM} realm created ...\n"\

  ${CURL_CMD} \
  -X GET \
  -H "Accept: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}"|jq -r .|head;

  
${CURL_CMD} \
  -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"${CLIENT_FILE}" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}/clients"

echo "\napp client created ...\n"\

CLIENT_ID=$(${CURL_CMD} \
  -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}/clients"|jq -r '.[] | select(.clientId=="live-chat").id');

CLIENT_SECRET=$(${CURL_CMD} \
  -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}/clients/${CLIENT_ID}/client-secret"|jq -r '.value');

echo "client_secret=${CLIENT_SECRET}" > ../packages/wunderChat/.env.realm

echo "\nclient secret generated ...\n"\


${CURL_CMD} \
  -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"${USER1_FILE}" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}/users"

${CURL_CMD} \
  -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"${USER2_FILE}" \
  "${KEYCLOAK_URL}/auth/admin/realms/${NEW_REALM}/users"

echo "\ndone\n"\







