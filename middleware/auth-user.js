export default (context) => {
  const unauthenticatedRoutes = ['index', 'register', 'forgot-password', 'reset-password']
  if (unauthenticatedRoutes.includes(context.route.name)) {
    return;
  }

  const cookie = context.$cookies.getAll()

  if (cookie.token) {
    context.store.dispatch('user/giveCookieValues', cookie)
  } else {
    return context.redirect('/')
  }
}
