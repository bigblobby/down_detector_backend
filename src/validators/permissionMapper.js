// TODO add all routes and actions
export default {
    // Monitor
    'GET|/api/v1/monitor/' : 'getAllMonitors',
    'GET|/api/v1/monitor/:id': 'getMonitorById',
    'POST|/api/v1/monitor/': 'createMonitor',
    'PUT|/api/v1/monitor/:id': 'updateMonitor',
    'DELETE|/api/v1/monitor/:id': 'deleteMonitor',
}