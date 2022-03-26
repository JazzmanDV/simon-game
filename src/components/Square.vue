<template>
    <button class="square" :class="getDynamicClass()" :value="color" v-on:click="onSquareClick"></button>
</template>

<script>
export default {
    name: "Square",
    props: {
        color: String,
        isActive: Boolean,
        onSquareClick: Function,
    },
    methods: {
        getDynamicClass() {
            return {
                [`square--${this.color}`]: this.color,
                "square--active": this.isActive,
            };
        },
    },
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

    transition: 0.25s opacity, 0.25s box-shadow;
}

.square:hover,
.square--active {
    box-shadow: var(--primary-box-shadow--hovered);
    opacity: 1;
}

.square:active {
    box-shadow: var(--primary-box-shadow);
    opacity: 0.4;
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
