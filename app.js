window.addEventListener("load", () => {
    const canvas = document.getElementById("webgl-canvas");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
        color: 0xdb2777,
        roughness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        return needResize;
    }
    function animate() {
        requestAnimationFrame(animate);
        resizeRendererToDisplaySize(renderer);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
});

const toastElement = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
let toastTimeout;

function showToast(message) {
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    toastMessage.textContent = message;
    toastElement.classList.add("show");
    toastTimeout = setTimeout(() => {
        toastElement.classList.remove("show");
    }, 3000);
}

const downloadButtons = document.querySelectorAll(".download-btn");
downloadButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const gameName = event.target.dataset.name;
        const gameUrl = event.target.dataset.url;
        showToast(`Preparing download for ${gameName}...`);
    });
});