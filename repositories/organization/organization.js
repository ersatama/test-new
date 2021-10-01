export default ($axios) => ({
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

  }
});
