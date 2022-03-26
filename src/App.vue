<template>
    <div class="app">
        <div class="button-set">
            <div class="button-subset">
                <button
                    class="square square--green"
                    :class="{ 'square--active': squares.green.isActive }"
                    value="green"
                    v-on:click="onSquareClick"
                ></button>
                <button
                    class="square square--red"
                    :class="{ 'square--active': squares.red.isActive }"
                    value="red"
                    v-on:click="onSquareClick"
                ></button>
            </div>
            <div class="button-subset">
                <button
                    class="square square--yellow"
                    :class="{ 'square--active': squares.yellow.isActive }"
                    value="yellow"
                    v-on:click="onSquareClick"
                ></button>
                <button
                    class="square square--blue"
                    :class="{ 'square--active': squares.blue.isActive }"
                    value="blue"
                    v-on:click="onSquareClick"
                ></button>
            </div>
        </div>

        <div class="menu">
            <div>
                <h2>Раунд: {{ isGameStarted ? round : "-" }}</h2>
                <button class="menu__input" :disabled="isGameStarted" v-on:click="onStartButtonClick">Начать</button>
            </div>
            <div>
                <h2>Сложность:</h2>
                <select class="menu__input" :disabled="isGameStarted" ref="difficultySelect">
                    <option value="easy">Легкая</option>
                    <option value="medium">Нормальная</option>
                    <option value="hard">Сложная</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            round: 1,
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
                    }, this.difficultyDelay[this.$refs.difficultySelect.value])
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

.button-subset {
    display: flex;
    gap: 0.5rem;
}

.square {
    width: 7rem;
    height: 7rem;

    border: none;

    box-shadow: var(--primary-box-shadow);

    opacity: 0.4;

    cursor: pointer;
}

.square:hover,
.square--active {
    opacity: 1;
    box-shadow: var(--primary-box-shadow--hovered);
}

.square--green {
    border-top-left-radius: 100%;
    background-color: green;
}

.square--red {
    border-top-right-radius: 100%;
    background-color: red;
}

.square--yellow {
    border-bottom-left-radius: 100%;
    background-color: yellow;
}

.square--blue {
    border-bottom-right-radius: 100%;
    background-color: blue;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.menu__input {
    font: inherit;

    min-width: 7rem;

    padding: 0.5rem;

    border: none;
    border-radius: 0.5rem;

    box-shadow: var(--primary-box-shadow);

    outline: none;

    cursor: pointer;

    transition: 0.25s box-shadow;
}

.menu__input:hover,
.menu__input:focus-visible {
    box-shadow: var(--primary-box-shadow--hovered);
}
</style>
