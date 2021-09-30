export default ({ $axios, env }) => {
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json';
  });
}
