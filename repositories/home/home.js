export default ($axios) => ({
  getCountOrganizationsByCategoryId(city,page,filters) {
    return $axios.post('/api/category/count/city/'+city+'/'+page,filters)
      .then(response => {
        return response.data;
      }).catch(error => {
        return -1;
      });
  },
  getOrganizationsByCategoryId(city,page,filters) {
    return $axios.post('/api/category/filter/city/'+city+'/'+page,filters).then(response => {
      return response.data.data;
    }).catch(error => {
      return [];
    });
  },
  list() {
    return $axios.get('/api/category/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
