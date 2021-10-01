import Home from '~/repositories/home/home';
import Category from '~/repositories/category/category';
import Organization from '~/repositories/organization/organization';
export const repository = ($axios) => ({
  home: Home($axios),
  category: Category($axios),
  organization: Organization($axios),
})
