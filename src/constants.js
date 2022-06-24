const USER_TYPES = {
  USER_ADMIN: 'USER::ADMIN',
  USER_CUSTOMER: 'USER::CUSTOMER',
};

const routes = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  createEvent: '/events/new',
  viewEvent: '/events/:id/view',
  updateEvent: '/events/:id/edit',
  categories: '/admin/categories',
  createCategory: '/admin/categories/new',
  updateCategory: '/admin/categories/new',
  users: '/admin/users',
  createUser: '/admin/users/new',
  updateUser: '/admin/users/new',
};

export { USER_TYPES, routes };
