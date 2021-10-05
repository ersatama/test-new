import Home from '~/repositories/home/home';
import Category from '~/repositories/category/category';
import Organization from '~/repositories/organization/organization';
import Menu from '~/repositories/menu/menu';
export const repository = ($axios) => ({
  menu: Menu($axios),
  home: Home($axios),
  category: Category($axios),
  organization: Organization($axios)
})
