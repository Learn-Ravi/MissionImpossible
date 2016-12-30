var API = {}

API.loadAllAPI = function (app) {
  require(__base + 'Services/API\'s/login')(app);
  require(__base + 'Services/API\'s/jobs')(app);
  require(__base + 'Services/API\'s/register')(app);
  require(__base + 'Services/API\'s/googleAuth')(app);
}
module.exports = API;

