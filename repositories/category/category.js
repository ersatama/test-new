export default ($axios) => ({
  getCategoryBySlug(slug) {
    return $axios.get('/api/category/slug/'+slug);
  }
});
