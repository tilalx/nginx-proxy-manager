import { View } from 'backbone.marionette';
import App       from '../../main';
import template  from './delete.ejs';

export default View.extend({
    template:  template,
    className: 'modal-dialog',

    ui: {
        form:    'form',
        buttons: '.modal-footer button',
        cancel:  'button.cancel',
        save:    'button.save'
    },

    events: {
        'click @ui.save': function (e) {
            e.preventDefault();
            this.ui.save.addClass('btn-loading');
            this.ui.buttons.prop('disabled', true).addClass('btn-disabled');

            App.Api.Nginx.Certificates.delete(this.model.get('id'))
                .then(() => {
                    App.Controller.showNginxCertificates();
                    App.UI.closeModal();
                })
                .catch(err => {
                    alert(err.message);
                    this.ui.buttons.prop('disabled', false).removeClass('btn-disabled');
                    this.ui.save.removeClass('btn-loading');
                });
        }
    }
});
