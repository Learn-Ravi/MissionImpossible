var API = {}

API.loadAllAPI = function (app) {
  require(__base + 'server/Services/API\'s/login')(app);
  require(__base + 'server/Services/API\'s/jobs')(app);
  require(__base + 'server/Services/API\'s/register')(app);
}
module.exports = API;

