import {addShowDicePromise,renderpoolRollResult} from "./roll_dialog.mjs";

export class SlumdogsCombat extends Combat {
    async rollInitiative(ids, options = {}) {

        const updates = [];
        const dicePromises = [];
        const label = game.i18n.localize("SLUMDOGS.Labels.initiativeRoll");

        for (const id of ids) {
            const combatant = this.combatants.get(id, { strict: true });
            
            const actorRollData = combatant.actor.getRollData();
            const rollFormula = `${combatant.actor.system.iniDice}d6`;
            const dicePoolRoll = new Roll(rollFormula, actorRollData);
            await dicePoolRoll.evaluate();
            const rollResult = dicePoolRoll.terms[0].results
            addShowDicePromise(dicePromises, dicePoolRoll);

            let numSuccesses = 0;
            let rollDiceFaceSuccess = 5;
            let singleRolls = []
            for(const result of rollResult) {
                if (result.result >= rollDiceFaceSuccess) {
                    numSuccesses += 1;
                }
                singleRolls.push(result.result);
            }

            const updateData = {
                initiative: numSuccesses
            };
            updates.push({ _id: combatant.id, ...updateData });

            const rollDialogVars = {
                numSuccesses,
                label,
                singleRolls,
                rollDiceFaceSuccess
            }
            renderpoolRollResult(combatant.actor,rollDialogVars);
        } // each ids

        await Promise.all(dicePromises);
        // Updates the combatants.
        await this.updateEmbeddedDocuments('Combatant', updates);
        return this;
    }
}