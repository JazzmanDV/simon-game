<template>
    <div class="app">
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
            :onSelectChange="onSelectChange"
        />
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
        };
    },
    methods: {
        onSelectChange(e) {
            this.difficulty = e.target.value;
        },
        onStartButtonClick() {
            this.startTheGame();
        },
        onColorButtonClick(e) {
            if (!this.isGameStarted) {
                this.playSound(e.target.value + ".mp3");
                return;
            }

            if (!this.isWaitingForAnswer) {
                return;
            }

            if (e.target.value !== this.rightAnswers[this.currentRightAnswerIndex].name) {
                this.loseTheGame();
                return;
            }

            this.playSound(e.target.value + ".mp3");

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
            new Audio(`sounds/${sound}`).play();
        },
        async playRound() {
            this.isWaitingForAnswer = false;

            for (const colorButton of this.rightAnswers) {
                this.playSound(colorButton.name + ".mp3");
                colorButton.isActive = true;

                await this.delay(() => {
                    colorButton.isActive = false;
                }, this.difficultyDelay[this.difficulty] - 100);

                await this.delay(() => {}, 100);
            }

            this.isWaitingForAnswer = true;
        },
        async goNextRound() {
            await this.delay(() => {}, 800);

            this.round++;
            this.currentRightAnswerIndex = 0;

            this.addNextColorButton();
            this.playRound();
        },

        startTheGame() {
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
            this.playSound("error.wav");
            setTimeout(() => {
                alert(`Вы проиграли! Пройдено раундов: ${this.round - 1}`);
                this.restartTheGame();
            }, 30);
        },
    },
};
</script>

<style>
:root {
    font-family: "Exo 2", sans-serif;
    font-weight: 300;

    --primary-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    --primary-box-shadow--hovered: 0 0 12px rgba(0, 0, 0, 0.2);

    --error-box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    --error-box-shadow--hovered: 0 0 12px rgba(255, 0, 0, 0.5);
}

body {
    margin: 0;
}

h2 {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}
</style>

<style scoped>
.app {
    display: flex;
    justify-content: center;
    gap: 5rem;

    box-sizing: border-box;

    max-width: 60rem;

    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;

    padding: 1rem;
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
