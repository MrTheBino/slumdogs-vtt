import SlumdogsItemBase from "./base-item.mjs";

export default class SlumdogsSkill extends SlumdogsItemBase {
    static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.attrName = new fields.StringField({ required: true, blank: true });
    schema.attrDice = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 100 });
    schema.skillDice = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 100 });
    schema.totalDice = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 100 });

    return schema;
  }
}