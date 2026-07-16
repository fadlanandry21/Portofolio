import { onMounted, onUnmounted } from "vue";
import Lenis from 'lenis';

export function useLenis() { 
    let lenis = null;

    onMounted(() => {
        lenis = new Lenis( {
            duration: 5.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    });

    onUnmounted(() => {
      lenis?.destroy()
    });

    return { lenis };
}
