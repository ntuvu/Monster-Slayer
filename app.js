function getRandomValue(min, max) {
  return (attackValue = Math.floor(Math.random() * (max - min) + min));
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHeal = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.attackPlayer();
      this.addLogMessage('player', 'heal', healValue);
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
