export default ($axios) => ({
  getCategoryBySlug(slug) {
    return $axios.get('/api/category/slug/'+slug)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
