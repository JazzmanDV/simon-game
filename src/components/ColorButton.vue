<template>
    <button class="color-button" :class="getDynamicClass()" :value="color" v-on:click="onColorButtonClick"></button>
</template>

<script>
export default {
    name: "ColorButton",
    props: {
        color: String,
        isActive: Boolean,
        onColorButtonClick: Function,
    },
    methods: {
        getDynamicClass() {
            return {
                [`color-button--${this.color}`]: this.color,
                "color-button--active": this.isActive,
            };
        },
    },
};
</script>

<style scoped>
.color-button {
    width: 7rem;
    height: 7rem;

    border: none;

    box-shadow: var(--primary-box-shadow);

    opacity: 0.4;

    cursor: pointer;

    transition: 0.25s opacity, 0.25s box-shadow;
}

.color-button:hover,
.color-button--active {
    box-shadow: var(--primary-box-shadow--hovered);
    opacity: 1;
}

.color-button:active {
    box-shadow: var(--primary-box-shadow);
    opacity: 0.4;
}

.color-button--green {
    border-top-left-radius: 100%;
    background-color: green;
}

.color-button--red {
    border-top-right-radius: 100%;
    background-color: red;
}

.color-button--yellow {
    border-bottom-left-radius: 100%;
    background-color: yellow;
}

.color-button--blue {
    border-bottom-right-radius: 100%;
    background-color: blue;
}
</style>
