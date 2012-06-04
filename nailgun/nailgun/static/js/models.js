define(function() {
    var models = {};
    var collections = {};

    models.Environment = Backbone.Model.extend({
        urlRoot: '/api/environments',
        defaults: {
            name: null,
            active: false
        },
        initialize: function(attrs) {
            if (_.isObject(attrs) && _.isArray(attrs.nodes)) {
                this.set('nodes', new models.Nodes(attrs.nodes));
                this.get('nodes').each(function(node) {
                    node.set('environment', this);
                }, this);
            }
        }
    });

    models.Environments = Backbone.Collection.extend({
        model: models.Environment,
        url: '/api/environments'
    });

    models.Node = Backbone.Model.extend({
        urlRoot: '/api/nodes',
        defaults: {
            name: null,
            status: null,
            metadata: null
        },
        initialize: function(attrs) {
            if (_.isObject(attrs) && _.isArray(attrs.roles)) {
                this.set('roles', new models.Roles(attrs.roles));
                this.get('roles').each(function(role) {
                    role.set('node', this);
                }, this);
            }
        }
    });

    models.Nodes = Backbone.Collection.extend({
        model: models.Node
    });

    models.Cookbook = Backbone.Model.extend({
        urlRoot: '/api/cookbooks',
        defaults: {
            name: null,
            version: null
        },
        initialize: function(attrs) {
            if (_.isObject(attrs) && _.isArray(attrs.roles)) {
                this.set('roles', new models.Roles(attrs.roles));
                this.get('roles').each(function(role) {
                    role.set('cookbook', this);
                }, this);
            }
        }
    });

    models.Cookbooks = Backbone.Collection.extend({
        model: models.Cookbook
    });

    models.Role = Backbone.Model.extend({
        urlRoot: '/api/roles',
        defaults: {
            name: null
        }
    });

    models.Roles = Backbone.Collection.extend({
        model: models.Role
    });

    return models;
});
