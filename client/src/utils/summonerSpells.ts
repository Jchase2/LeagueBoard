export const summonerSpells: any = [
  {
    "21": {
      id: "SummonerBarrier",
      name: "Barrier",
      description:
        "Shields your champion from 115-455 damage (depending on champion level) for 2 seconds.",
      tooltip:
        "Temporarily shields {{ f1 }} damage from your champion for 2 seconds.",
    },
    "1": {
      id: "SummonerBoost",
      name: "Cleanse",
      description:
        "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
      tooltip:
        "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds.",
    },
    "14": {
      id: "SummonerDot",
      name: "Ignite",
      description:
        "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
      tooltip:
        'Ignite deals <span class="colorFEFCFF">{{ f1 }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies {{ grievousamount*100 }}% Grievous Wounds for the duration.<br /><br /><rules>(Grievous Wounds reduces healing and regeneration by a percentage equal to the highest value applied. This vision does not reveal stealthed enemies.)</rules>',
    },
    "3": {
      id: "SummonerExhaust",
      name: "Exhaust",
      description:
        "Exhausts target enemy champion, reducing their Move Speed by 30%, and their damage dealt by 40% for 3 seconds.",
      tooltip:
        "Exhausts target enemy champion, reducing their Move Speed by {{ f3 }}%, and their damage dealt by {{ f2 }}% for 3 seconds.",
    },
    "4": {
      id: "SummonerFlash",
      name: "Flash",
      description:
        "Teleports your champion a short distance toward your cursor's location.",
      tooltip:
        "Teleports your champion a short distance toward your cursor's location.",
    },
    "6": {
      id: "SummonerHaste",
      name: "Ghost",
      description:
        "For 10 seconds, your champion can move through units and gains 24 - 48% Movement Speed (depending on champion level). Ghost extends its duration on takedown.",
      tooltip:
        "For {{ duration }} seconds, your champion can move through units and gains {{ movespeedmod }} Movement Speed.<br /><br />Ghost extends its duration by {{ takedownextension }} seconds on takedown.",
    },
    "7": {
      id: "SummonerHeal",
      name: "Heal",
      description:
        "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
      tooltip:
        'Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br /><br /><span class="colorFFFF00">If this spell cannot find a target, it will cast on the most wounded allied champion in range.</span>',
    },
    "13": {
      id: "SummonerMana",
      name: "Clarity",
      description:
        "Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.",
      tooltip:
        "Restores {{ f1 }}% maximum Mana to your Champion and {{ f2 }}% to nearby allies.",
    },
    "11": {
      id: "SummonerSmite",
      name: "Smite",
      description:
        "Deals @SmiteBaseDamage@ true damage to target epic, large, or medium monster or minion.",
      tooltip:
        'Deals <span class="colorFEFCFF">{{ f1 }}</span> true damage to target monster or minion. Against monsters, additionally restores <span class="colorFFFFFF">{{ f6 }}</span> <span class="colorFF6666">(+{{ f7 }})</span> Health.<br /><br />Smite regains a charge every {{ ammorechargetime }} seconds, up to a maximum of 2 charges.<br /><br /><rules>Cannot be cast on small monsters.</rules>',
    },
    "12": {
      id: "SummonerTeleport",
      name: "Teleport",
      description:
        "After channeling for 4 seconds, teleports your champion to target allied structure, minion, or ward and grants a Move Speed boost. The cooldown of Teleport scales from 420-210 seconds depending on champion level.",
      tooltip:
        "After channeling for {{ channelduration }} seconds, your champion teleports to target allied structure, minion, or ward and grants a {{ msamount*100 }}% Move Speed boost for {{ msduration }} seconds.",
    },
  },
];
