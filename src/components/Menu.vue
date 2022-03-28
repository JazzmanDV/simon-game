<template>
    <div class="menu">
        <div>
            <h2>Раунд: {{ isGameStarted ? round : "-" }}</h2>
            <button class="menu__input" :disabled="isGameStarted" @click="onStartButtonClick">Начать</button>
        </div>
        <div>
            <h2>Сложность:</h2>
            <select class="menu__input" :disabled="isGameStarted" :value="difficulty" @change="onSelectChange">
                <option value="easy">Легкая</option>
                <option value="medium">Нормальная</option>
                <option value="hard">Сложная</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    props: {
        isGameStarted: Boolean,
        round: Number,
        difficulty: String,
        onStartButtonClick: Function,
    },
    methods: {
        onSelectChange(e) {
            this.$emit("selectChange", e.target.value);
        },
    },
};
</script>

<style scoped>
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

    outline: none;

    background-color: white;

    box-shadow: var(--primary-box-shadow);

    cursor: pointer;

    transition: 0.25s box-shadow;
}

.menu__input:hover,
.menu__input:focus-visible {
    box-shadow: var(--primary-box-shadow--hovered);
}

.menu__input:active {
    box-shadow: var(--primary-box-shadow);
}
</style>
