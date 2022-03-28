<template>
    <div class="app">
        <h2 class="you-lost-message" :class="{ 'you-lost-message--visible': lastCompletedRound !== null }">
            Вы проиграли! Пройдено раундов: {{ lastCompletedRound }}
        </h2>

        <div class="playing-field">
            <div class="button-set">
                <div class="button-row">
                    <ColorButton
                        color="green"
                        :isActive="colorButtons.green.isActive"
                        :onColorButtonClick="onColorButtonClick"
                    />
                    <ColorButton
                        color="red"
                        :isActive="colorButtons.red.isActive"
                        :onColorButtonClick="onColorButtonClick"
                    />
                </div>
                <div class="button-row">
                    <ColorButton
                        color="yellow"
                        :isActive="colorButtons.yellow.isActive"
                        :onColorButtonClick="onColorButtonClick"
                    />
                    <ColorButton
                        color="blue"
                        :isActive="colorButtons.blue.isActive"
                        :onColorButtonClick="onColorButtonClick"
                    />
                </div>
            </div>

            <Menu
                :isGameStarted="isGameStarted"
                :round="round"
                :onStartButtonClick="onStartButtonClick"
                :difficulty="difficulty"
                @selectChange="onSelectChange"
            />
        </div>
    </div>
</template>

<script>
import ColorButton from "./components/ColorButton.vue";
import Menu from "./components/Menu.vue";

export default {
    name: "App",
    components: { ColorButton, Menu },

    data() {
        return {
            round: 1,
            lastCompletedRound: null,
            isGameStarted: false,
            isWaitingForAnswer: false,
            rightAnswers: [],
            currentRightAnswerIndex: 0,

            difficulty: "easy",
            difficultyDelay: { easy: 1500, medium: 1000, hard: 400 },

            colorButtons: {
                green: { name: "green", isActive: false },
                red: { name: "red", isActive: false },
                yellow: { name: "yellow", isActive: false },
                blue: { name: "blue", isActive: false },
            },

            sounds: {
                green: new Audio("sounds/green.mp3"),
                red: new Audio("sounds/red.mp3"),
                yellow: new Audio("sounds/yellow.mp3"),
                blue: new Audio("sounds/blue.mp3"),
                error: new Audio("sounds/error.wav"),
            },
        };
    },

    methods: {
        onSelectChange(value) {
            this.difficulty = value;
        },
        onStartButtonClick() {
            this.startTheGame();
        },
        onColorButtonClick(e) {
            if (!this.isGameStarted) {
                this.playSound(this.sounds[e.target.value]);
                return;
            }

            if (!this.isWaitingForAnswer) {
                return;
            }

            if (e.target.value !== this.rightAnswers[this.currentRightAnswerIndex].name) {
                this.loseTheGame();
                return;
            }

            this.playSound(this.sounds[e.target.value]);

            this.currentRightAnswerIndex++;

            if (this.currentRightAnswerIndex === this.rightAnswers.length) {
                this.goNextRound();
            }
        },

        getRandomInt(min, max) {
            const rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        },
        getRandomColorButton() {
            const randomColorButtonsKey = Object.entries(this.colorButtons)[this.getRandomInt(0, 3)][0];
            return this.colorButtons[randomColorButtonsKey];
        },
        delay(callback, ms) {
            return new Promise((resolve) =>
                setTimeout(() => {
                    callback();
                    resolve();
                }, ms)
            );
        },

        addNextColorButton() {
            const randomColorButton = this.getRandomColorButton();
            this.rightAnswers.push(randomColorButton);
        },
        playSound(sound) {
            new Audio(sound.src).play();
        },
        async playRound() {
            this.isWaitingForAnswer = false;

            for (const colorButton of this.rightAnswers) {
                this.playSound(this.sounds[colorButton.name]);
                colorButton.isActive = true;

                await this.delay(() => {
                    colorButton.isActive = false;
                }, this.difficultyDelay[this.difficulty] - 100);

                await this.delay(() => {}, 100);
            }

            this.isWaitingForAnswer = true;
        },
        async goNextRound() {
            this.round++;
            this.currentRightAnswerIndex = 0;

            this.isWaitingForAnswer = false;

            await this.delay(() => {}, 800);

            this.addNextColorButton();
            this.playRound();
        },

        startTheGame() {
            this.lastCompletedRound = null;
            this.isGameStarted = true;
            this.addNextColorButton();
            this.playRound();
        },
        restartTheGame() {
            this.round = 1;
            this.isGameStarted = false;
            this.isWaitingForAnswer = false;
            this.rightAnswers = [];
            this.currentRightAnswerIndex = 0;
        },
        loseTheGame() {
            this.lastCompletedRound = this.round - 1;
            this.playSound(this.sounds.error);
            this.restartTheGame();
        },
    },
};
</script>

<style>
@import "./variables.css";

:root {
    font-family: "Exo 2", sans-serif;
    font-weight: 300;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    margin: 0;
}

h2 {
    font-weight: 600;

    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}
</style>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    box-sizing: border-box;

    max-width: 70rem;

    margin-left: auto;
    margin-right: auto;

    padding: 1rem;
}

.playing-field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 5rem;
}

.you-lost-message {
    text-align: center;
    opacity: 0;
    transition: 0.25s opacity;
}

.you-lost-message--visible {
    opacity: 1;
}

.button-set {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: fit-content;
}

.button-row {
    display: flex;
    gap: 0.5rem;
}
</style>
