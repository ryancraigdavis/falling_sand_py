<script lang="ts">
	import { onMount } from 'svelte';
	import { SandSimulation, MaterialType } from './sand-simulation';

	export let width = 800;
	export let height = 600;
	export let selectedMaterial: MaterialType = MaterialType.SAND;

	let canvas: HTMLCanvasElement;
	let simulation: SandSimulation;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		simulation = new SandSimulation(width, height, ctx);
		simulation.start();

		// Add material on mouse click/drag
		const addMaterial = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = Math.floor((e.clientX - rect.left) / simulation.pixelSize);
			const y = Math.floor((e.clientY - rect.top) / simulation.pixelSize);
			simulation.addMaterial(x, y, selectedMaterial);
		};

		let isDrawing = false;

		canvas.addEventListener('mousedown', (e) => {
			isDrawing = true;
			addMaterial(e);
		});

		canvas.addEventListener('mousemove', (e) => {
			if (isDrawing) {
				addMaterial(e);
			}
		});

		canvas.addEventListener('mouseup', () => {
			isDrawing = false;
		});

		return () => {
			simulation.stop();
		};
	});

	export function clearCanvas() {
		if (simulation) {
			simulation.clear();
		}
	}
</script>

<canvas
	bind:this={canvas}
	{width}
	{height}
	style="border: 1px solid #ccc; cursor: crosshair;"
></canvas>

<style>
	canvas {
		display: block;
		margin: 0 auto;
	}
</style>