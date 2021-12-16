CSSPlugin.defaultTransformPerspective = 400;

var push = gsap.to(".Win", { duration: 2, x: 360 });
push.pause();
function endRotate() {
    push.play();
}
var rotate = gsap.to(".Win", { duration: 2, rotation: 360, onComplete: endRotate });
rotate.pause();

