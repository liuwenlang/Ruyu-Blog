import {loadingImg} from "@/utils/base64-img/loading-img.ts";
const lazyBinding = (el: any, binding: any) => {
    const placehold = loadingImg;

    const {nolazy} = binding.value;

    if (nolazy) return (el.src = el.dataset.src || placehold);

    el.src = placehold;

    const obServer = new IntersectionObserver(entries => {
        if (entries.find(v => v.intersectionRatio)) {
            el.src = el.dataset.src || placehold;
            obServer.unobserve(el);
        }
    });
    obServer.observe(el);
};

export default {
    beforeMount(el: HTMLElement, binding: any) { // Vue 2中的`bind`在Vue 3中变为`beforeMount`
        console.log("初始化")
        lazyBinding(el, binding);
    },
    updated(el: HTMLElement, binding: any) { // Vue 2中的`componentUpdated`在Vue 3中变为`updated`
        console.log("修改")
        lazyBinding(el, binding);
    },
};