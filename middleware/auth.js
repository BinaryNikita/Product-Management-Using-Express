export const isLoggedIn = (request, response, next) => {
  if (request.session.isLoggedIn) {
    next();
  } else {
    response.redirect('/admin/sign-in');
  }
};
