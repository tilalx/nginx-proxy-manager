import Mn         from 'backbone.marionette'
import LoginView  from './ui/login'

const App = Mn.Application.extend({
    region: '#login',
    UI:     null,

    onStart: function (/*app, options*/) {
        this.getRegion().show(new LoginView());
    }
});

const app      = new App();
export default app;
