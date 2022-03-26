<template>
    <div class="app">
        <button class="square"></button>
        <button class="square"></button>
        <button class="square"></button>
        <button class="square"></button>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    methods: {},
};
</script>

<style>
:root {
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
    font-family: "Exo 2", sans-serif;
    font-weight: 300;

    box-sizing: border-box;

    max-width: 60rem;

    margin-left: auto;
    margin-right: auto;

    padding: 1rem;
}

.button {
    width: 5rem;
    height: 5rem;

    cursor: pointer;
}

.button:hover {
    box-shadow: var(--primary-box-shadow--hovered);
}
</style>
