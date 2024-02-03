<div class="fixed z-20 top-0 left-0 h-full w-full bg-black bg-opacity-50">
	<span class="loader"></span>
</div>

<style lang="postcss">
	.loader {
		width: 3rem;
		height: 3rem;
		border: 3px dotted #fff;
		border-style: solid solid dotted dotted;
		border-radius: 50%;
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		animation: rotation 2s linear infinite;
	}
	.loader::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 3px dotted;
		@apply border-emerald-300;
		border-style: solid solid dotted;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		animation: rotationBack 1s linear infinite;
		transform-origin: center center;
	}

	@keyframes rotation {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
	@keyframes rotationBack {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
