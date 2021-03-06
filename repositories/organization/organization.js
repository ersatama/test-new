const category  = '/api/category';
export default ($axios) => ({
  getCountOrganizationsByCategoryId(city,page,filters) {
    return $axios.post(`${category}/count/city/${city}/${page}`,filters);
  },
  getOrganizationsByCategoryId(city,page,filters) {
    return $axios.post(`${category}/filter/city/${city}/${page}`,filters);
  },
  create(organizationId,userId) {
    return $axios.post('/api/newsSubscribe/create',{
      organization_id: organizationId,
      user_id: userId
    }).then(response => {
      return response.data.data;
    }).catch(error => {
      return [];
    });
  },
  update(subscribeId, organizationId, userId, status) {
    return $axios.post('/api/newsSubscribe/update/'+subscribeId,{
      organization_id: organizationId,
      user_id: userId,
      status: status
    });
  },
});
