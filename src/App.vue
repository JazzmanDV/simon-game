<template>
    <div class="app">
        <h2 class="your-turn-hint" :class="{ 'your-turn-hint--visible': isWaitingForAnswer }">
            Ваша очередь нажимать :)
        </h2>
        <div class="playground">
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
            difficulty: "easy",
            difficultyDelay: { easy: 1500, medium: 1000, hard: 400 },
            isGameStarted: false,
            isWaitingForAnswer: false,
            rightAnswers: [],
            currentRightAnswerIndex: 0,
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
        onColorButtonClick(e) {
            if (!this.isWaitingForAnswer) {
                return;
            }

            if (e.target.value !== this.rightAnswers[this.currentRightAnswerIndex].name) {
                this.loseTheGame();
                return;
            }

            this.playSound(e.target.value);

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
        playSound(colorButtonName) {
            new Audio(`sounds/${colorButtonName}.mp3`).play();
        },
        async playRound() {
            this.isWaitingForAnswer = false;

            for (const colorButton of this.rightAnswers) {
                colorButton.isActive = true;
                this.playSound(colorButton.name);

                await new Promise((resolve) =>
                    setTimeout(() => {
                        colorButton.isActive = false;
                        resolve();
                    }, this.difficultyDelay[this.difficulty] - 100)
                );

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 100)
                );
            }

            this.isWaitingForAnswer = true;
        },
        addNextColorButton() {
            const randomColorButton = this.getRandomColorButton();
            this.rightAnswers.push(randomColorButton);
        },
        startTheGame() {
            this.isGameStarted = true;
            this.addNextColorButton();
            this.playRound();
        },
        onStartButtonClick() {
            this.startTheGame();
        },
        restartTheGame() {
            this.round = 1;
            this.isGameStarted = false;
            this.isWaitingForAnswer = false;
            this.rightAnswers = [];
            this.currentRightAnswerIndex = 0;
        },
        loseTheGame() {
            alert(`Вы проиграли! Пройдено раундов: ${this.round - 1}`);
            this.restartTheGame();
        },
        async goNextRound() {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 800)
            );

            this.round++;
            this.currentRightAnswerIndex = 0;

            this.addNextColorButton();
            this.playRound();
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
</style>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    box-sizing: border-box;

    max-width: 60rem;

    margin-left: auto;
    margin-right: auto;

    padding: 1rem;
}

.playground {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5rem;
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

.your-turn-hint {
    opacity: 0;
    transition: 0.25s opacity;
}

.your-turn-hint--visible {
    opacity: 1;
}
</style>
