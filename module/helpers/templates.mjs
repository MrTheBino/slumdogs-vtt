/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/slumdogs-vtt/templates/actor/parts/actor-features.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-items.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-booster.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-weapons.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-spells.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-skills.hbs',
    'systems/slumdogs-vtt/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/slumdogs-vtt/templates/item/parts/item-effects.hbs',
  ]);
};
