const sounds: Map<string, string[]> = new Map([
  ['menuClose', [require('../assets/sounds/btn_menu_close.mp3')]],
  ['menuOpen', [require('../assets/sounds/btn_menu_open.mp3')]],
  ['button', [require('../assets/sounds/btn_ui.mp3')]],
  ['buttonTap', [require('../assets/sounds/btn_tap.mp3')]],
  ['battleStart', [require('../assets/sounds/sfx_battle_start.mp3')]],
  ['battleEnd', [require('../assets/sounds/sfx_battle_end.mp3')]],
  ['cardDealing', [require('../assets/sounds/sfx_card_dealing.mp3')]],
  ['cardPlay', [require('../assets/sounds/sfx_card_play.mp3')]],
  ['attackBow', [
    require('../assets/sounds/sfx_ch_attack_bow.mp3'),
    require('../assets/sounds/sfx_sword_hit.mp3')
  ]],
  ['attackHit', [require('../assets/sounds/sfx_ch_attack_hit.mp3')]],
  ['attackMagic', [require('../assets/sounds/sfx_ch_attack_magic.mp3')]],
  ['damage', [require('../assets/sounds/sfx_ch_damage.mp3')]],
  ['death', [
    require('../assets/sounds/sfx_ch_death_1.mp3'),
    require('../assets/sounds/sfx_ch_death_2.mp3'),
    require('../assets/sounds/sfx_ch_death_3.mp3')
  ]],
  ['healing', [require('../assets/sounds/sfx_ch_healing.mp3')]],
  ['defeat', [require('../assets/sounds/sfx_defeat.mp3')]],
  ['defend', [require('../assets/sounds/sfx_defend.mp3')]],
  ['discard', [require('../assets/sounds/sfx_discard.mp3')]],
  ['enmHit', [require('../assets/sounds/sfx_enm_hit.mp3')]],
  ['itemDelete', [require('../assets/sounds/sfx_item_delete.mp3')]],
  ['itemPickUp', [require('../assets/sounds/sfx_item_pickUp.mp3')]],
  ['itemUpgrade', [require('../assets/sounds/sfx_item_upgrade.mp3')]],
  ['itemUseFire', [require('../assets/sounds/sfx_item_use_fire.mp3')]],
  ['itemUseFlask', [require('../assets/sounds/sfx_item_use_flask.mp3')]],
  ['itemUseShop', [require('../assets/sounds/sfx_item_use_shop.mp3')]],
  ['levelUp', [require('../assets/sounds/sfx_levelUp.mp3')]],
  ['notification', [require('../assets/sounds/sfx_notification.mp3')]],
  ['questEnd', [require('../assets/sounds/sfx_quest_end.mp3')]],
  ['screenTransition', [require('../assets/sounds/sfx_screen_transition.mp3')]],
  ['victory', [require('../assets/sounds/sfx_victory.mp3')]],
]);

export default sounds;
