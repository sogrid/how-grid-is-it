module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('justify', function (str)  {
        return  '<span>'.concat(str.replace(/(-|\s)/g, '$1</span><span>'), '</span>');
    });
};