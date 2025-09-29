<script lang="ts">
	import SandCanvas from '$lib/SandCanvas.svelte';
	import { MaterialType } from '$lib/sand-simulation';

	let selectedMaterial: MaterialType = MaterialType.SAND;
	let sandCanvas: SandCanvas;

	function selectMaterial(material: MaterialType) {
		selectedMaterial = material;
	}

	function clearCanvas() {
		sandCanvas.clearCanvas();
	}
</script>

<main>
	<h1>Falling Sand Simulator</h1>
	<p>Click and drag to add {selectedMaterial === MaterialType.SAND ? 'sand' : selectedMaterial === MaterialType.WATER ? 'water' : 'gas'} particles!</p>

	<div class="simulator-container">
		<div class="canvas-container">
			<SandCanvas bind:this={sandCanvas} width={800} height={600} {selectedMaterial} />
		</div>

		<div class="material-buttons">
			<h3>Materials</h3>
			<button
				class="material-btn sand-btn"
				class:active={selectedMaterial === MaterialType.SAND}
				on:click={() => selectMaterial(MaterialType.SAND)}
			>
				Sand
			</button>
			<button
				class="material-btn water-btn"
				class:active={selectedMaterial === MaterialType.WATER}
				on:click={() => selectMaterial(MaterialType.WATER)}
			>
				Water
			</button>
			<button
				class="material-btn gas-btn"
				class:active={selectedMaterial === MaterialType.GAS}
				on:click={() => selectMaterial(MaterialType.GAS)}
			>
				Gas
			</button>

			<div class="controls-divider"></div>

			<button class="clear-btn" on:click={clearCanvas}>
				Clear Canvas
			</button>
		</div>
	</div>

	<div class="instructions">
		<p>Instructions:</p>
		<ul>
			<li><strong>Sand:</strong> Falls straight down, piles up naturally</li>
			<li><strong>Water:</strong> Falls down and flows horizontally, displaces gas</li>
			<li><strong>Gas:</strong> Rises upward and spreads out</li>
			<li>Click and drag on the canvas to add the selected material</li>
		</ul>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 2rem;
		font-family: Arial, sans-serif;
	}

	h1 {
		color: #333;
		margin-bottom: 1rem;
	}

	.simulator-container {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;
		margin: 2rem 0;
	}

	.canvas-container {
		flex-shrink: 0;
	}

	.material-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: #f8f9fa;
		border-radius: 12px;
		border: 1px solid #e9ecef;
		min-width: 150px;
	}

	.material-buttons h3 {
		margin: 0 0 0.5rem 0;
		color: #495057;
		font-size: 1.1rem;
	}

	.material-btn {
		padding: 12px 16px;
		border: 2px solid transparent;
		border-radius: 8px;
		background: #fff;
		color: #495057;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 14px;
	}

	.material-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	}

	.sand-btn {
		border-color: #D2B48C;
	}
	.sand-btn.active {
		background: #D2B48C;
		color: white;
	}

	.water-btn {
		border-color: #4A90E2;
	}
	.water-btn.active {
		background: #4A90E2;
		color: white;
	}

	.gas-btn {
		border-color: #82E0AA;
	}
	.gas-btn.active {
		background: #82E0AA;
		color: #1B4F72;
	}

	.controls-divider {
		height: 1px;
		background: #dee2e6;
		margin: 0.5rem 0;
	}

	.clear-btn {
		padding: 10px 16px;
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		transition: background-color 0.2s ease;
	}

	.clear-btn:hover {
		background: #c82333;
	}

	.instructions {
		max-width: 700px;
		margin: 2rem auto 0;
		text-align: left;
		background: #f5f5f5;
		padding: 1.5rem;
		border-radius: 8px;
	}

	.instructions ul {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.instructions li {
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}

	@media (max-width: 1000px) {
		.simulator-container {
			flex-direction: column;
			align-items: center;
		}

		.material-buttons {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			min-width: auto;
		}
	}
</style>
