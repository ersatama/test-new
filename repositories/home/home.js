export default ($axios) => ({
  getOrganizationsByCategoryId(city,page,filters) {
    return $axios.post('/api/category/filter/city/'+city+'/'+page,filters).then(response => {
      return response.data.data;
    }).catch(error => {
      return [];
    });
  },
  list() {
    return $axios.get('/api/category/list');
  },
});
