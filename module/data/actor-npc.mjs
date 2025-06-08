import SlumdogsActorBase from "./base-actor.mjs";

export default class SlumdogsNPC extends SlumdogsActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attack = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.defense = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.armor = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.damage = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    
    return schema
  }

  prepareDerivedData() {
    //this.xp = this.cr * this.cr * 100;
  }
}