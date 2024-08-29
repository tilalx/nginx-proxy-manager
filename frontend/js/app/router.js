import AppRouter   from 'marionette.approuter';
import Controller  from './controller';

export default AppRouter.extend({
    controller: Controller,
    appRoutes:  {
        users:                'showUsers',
        logout:               'logout',
        'nginx/proxy':        'showNginxProxy',
        'nginx/redirection':  'showNginxRedirection',
        'nginx/404':          'showNginxDead',
        'nginx/stream':       'showNginxStream',
        'nginx/access':       'showNginxAccess',
        'nginx/certificates': 'showNginxCertificates',
        'audit-log':          'showAuditLog',
        'settings':           'showSettings',
        '*default':           'showDashboard'
    }
});
