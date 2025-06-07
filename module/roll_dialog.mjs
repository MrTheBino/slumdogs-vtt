function addShowDicePromise(promises, roll) {
  if (game.dice3d) {
    // we pass synchronize=true so DSN dice appear on all players' screens
    promises.push(game.dice3d.showForRoll(roll, game.user, true, null, false));
  }
}

export async function rollDialogV1(actor,num_dice,label){
    let rollDiceFaceSuccess = 5;
    const actorRollData = actor.getRollData();
    let numDice = num_dice;
    
    const cardTitle = "RollDialog";
    const rollResult = {
        actor,
        cardTitle,
        numDice,
        label,
        rollDiceFaceSuccess
      };
      const html = await foundry.applications.handlebars.renderTemplate(
        "systems/slumdogs-vtt/templates/dialogs/roll_dialog.hbs",
        rollResult
      );

      return new Promise((resolve) => {
        new Dialog({
          title: "Roll Dialog",
          content: html,
          buttons: {
            roll: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize("SLUMDOGS.Labels.roll"),
              callback: (html) => rollDialogV1Callback(actor, html),
            },
          },
          default: "roll",
          close: () => resolve(null),
        }).render(true);
      });
}

async function rollDialogV1Callback(actor, html) {
    const form = html[0].querySelector("form");
    const actorRollData = actor.getRollData();
    
    const label = form.label.value;
    const numDice = form.numDice.value;
    const rollDiceFaceSuccess = form.rollDiceFaceSuccess.value;
    const rollFormula = `${numDice}d6`;

    const dicePromises = [];

    const dicePoolRoll = new Roll(rollFormula, actorRollData);
    await dicePoolRoll.evaluate();
    const rollResult = dicePoolRoll.terms[0].results
    console.log(rollResult);

    let numSuccesses = 0;
    let singleRolls = []
    for(const result of rollResult) {
        if (result.result >= rollDiceFaceSuccess) {
            numSuccesses += 1;
        }
        singleRolls.push(result.result);
    }
    addShowDicePromise(dicePromises, dicePoolRoll);
    await Promise.all(dicePromises);

    const rollDialogVars = {
        numSuccesses,
        label,
        singleRolls,
        rollDiceFaceSuccess
    }
    renderpoolRollResult(actor,rollDialogVars);
}

async function renderpoolRollResult(actor, rollResult) {
  const html = await renderTemplate(
    "systems/slumdogs-vtt/templates/chat/pool-roll-result.hbs",
    rollResult
  );
  ChatMessage.create({
    content: html,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
}