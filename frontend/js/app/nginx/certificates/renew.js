import { View } from 'backbone.marionette';
import App       from '../../main';
import template  from './renew.ejs';

export default View.extend({
    template:  template,
    className: 'modal-dialog',

    ui: {
        waiting: '.waiting',
        error:   '.error',
        close:   'button.cancel'
    },

    onRender: function () {
        this.ui.error.hide();

        App.Api.Nginx.Certificates.renew(this.model.get('id'))
            .then((result) => {
                this.model.set(result);
                setTimeout(() => {
                    App.UI.closeModal();
                }, 1000);
            })
            .catch((err) => {
                this.ui.waiting.hide();
                this.ui.error.text(err.message).show();
                this.ui.close.prop('disabled', false);
            });
    }
});
