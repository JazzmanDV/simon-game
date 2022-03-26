<template></template>

<script>
export default {
    name: "Square",
};
</script>

<style scoped>
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
</style>
