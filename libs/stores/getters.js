const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  routes: state => state.route.routes,
  routesLoaded: state => state.route.routesLoaded,
  addRoutes: state => state.route.addRoutes
}
export default getters
