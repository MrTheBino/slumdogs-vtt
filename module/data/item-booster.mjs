import SlumdogsItemBase from "./base-item.mjs";

export default class SlumdogsBooster extends SlumdogsItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.essenz = new fields.NumberField({ required: true, nullable: false, integer: false, initial: 0, min: 0, max: 6 });

    return schema;
  }

  /*prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const roll = this.roll;

    this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`
  }*/
}