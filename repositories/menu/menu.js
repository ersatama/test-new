export default ($axios) => ({
  list() {
    return $axios.get('/api/category/list');
  },
});
