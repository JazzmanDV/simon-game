<template>
    <div class="app">
        <div class="button-set">
            <div class="button-row">
                <Square color="green" :isActive="squares.green.isActive" :onSquareClick="onSquareClick" />
                <Square color="red" :isActive="squares.red.isActive" :onSquareClick="onSquareClick" />
            </div>
            <div class="button-row">
                <Square color="yellow" :isActive="squares.yellow.isActive" :onSquareClick="onSquareClick" />
                <Square color="blue" :isActive="squares.blue.isActive" :onSquareClick="onSquareClick" />
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
import Square from "./components/Square.vue";
import Menu from "./components/Menu.vue";

export default {
    name: "App",
    components: { Square, Menu },
    data() {
        return {
            round: 1,
            difficulty: "easy",
            difficultyDelay: { easy: 1500, medium: 1000, hard: 400 },
            isGameStarted: false,
            isWaitingForAnswer: false,
            rightAnswers: [],
            currentRightAnswerIndex: 0,
            squares: {
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
        onSquareClick(e) {
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
        getRandomSquare() {
            const randomSquaresKey = Object.entries(this.squares)[this.getRandomInt(0, 3)][0];
            return this.squares[randomSquaresKey];
        },
        playSound(squareName) {
            new Audio(`sounds/${squareName}.mp3`).play();
        },
        async playRound() {
            this.isWaitingForAnswer = false;

            for (const square of this.rightAnswers) {
                square.isActive = true;
                this.playSound(square.name);

                await new Promise((resolve) =>
                    setTimeout(() => {
                        square.isActive = false;
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
        addNextSquare() {
            const randomSquare = this.getRandomSquare();
            this.rightAnswers.push(randomSquare);
        },
        startTheGame() {
            this.isGameStarted = true;
            this.addNextSquare();
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

            this.addNextSquare();
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
    flex-wrap: wrap;
    justify-content: center;
    gap: 5rem;

    box-sizing: border-box;

    max-width: 60rem;

    margin-top: 4rem;
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
