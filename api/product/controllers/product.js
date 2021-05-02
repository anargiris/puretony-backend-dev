const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async update(ctx) {
    console.log("here");
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.product.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.product.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
