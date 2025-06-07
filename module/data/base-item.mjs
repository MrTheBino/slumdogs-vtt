import SlumdogsDataModel from "./base-model.mjs";

export default class SlumdogsItemBase extends SlumdogsDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });
    schema.costs = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0  });
    schema.effectDescription = new fields.StringField({ required: false, blank: true });
    schema.isLegal = new fields.StringField({ required: false, blank: true });
    return schema;
  }

}