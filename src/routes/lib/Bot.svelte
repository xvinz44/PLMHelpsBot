



<script>

	import Type from './Typing.svelte'
	

	$: hours = time.getHours();
	$: minutes = time.getMinutes();
    let time = new Date();
    let hours = time.getHours();
	let minutes = time.getMinutes();
    let curr = String(hours+':').concat(String(minutes).length > 1 ? minutes:'0'+String(minutes));

	import { onMount, beforeUpdate, afterUpdate } from "svelte";
	beforeUpdate(() => {
		autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
	});
	afterUpdate(() => {
		if (autoscroll || browse) {
			browse = false
			div.scrollTo(0, div.scrollHeight)
		} 
		
	});


	let div, autoscroll, browse = false;
	let secret = 'qLs-kHwJo70.eyb_Mi-Wi4lh9q09oEt2hnb92jLMgnKSJZJHq55WVg4';
	let chats = [];
	let mes;

	async function getReply() {
		//received api here
		const res = await fetch('http://www.boredapi.com/api/activity/');
		const text = await res.json();

		if (res.ok) {
			chats = [...chats, [text.activity, 1]]
			return text.activity;
		} else {
			throw new Error(text);
		}
	}

	function send(){
		chats = [...chats, [mes, 0]];
		//send api here
	}
	
	let promise = getReply();

	function handleClick() {
		if (mes){
			send();
			promise = getReply();
		}
		mes = '';
	}
	const onKeyPress = e => {
		if (e.charCode === 13) handleClick();
	};
</script>


<div bind:this={div} class = "px-4 overflow-auto w-full h-96 flex flex-col space-y-4">
			   
	<div class = 'h-full'>
		<!-- buffer so it starts at the bottom -->
	</div>
	<div class = "self-center">
		<span class = 'text-base-content'>
			{hours}:{String(minutes).length > 1 ? minutes:'0'+String(minutes)}
		</span>
	</div>
	 <!-- Chats Here -->
	{#each chats as chat}
		<div class="inline-block py-2 px-3 rounded-xl min-w-fit max-w-fit {chat[1] === 0 ? 'self-end bg-primary text-primary-content':'self-start bg-secondary text-secondary-content'}">
			{chat[0]}
		</div>
	 {/each}
	 
	{#await promise}
		<div class="inline-block py-2 px-3 rounded-xl min-w-fit max-w-fit text-primary-content self-start bg-secondary text-secondary-content'}">
			<Type />
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
	 


</div>
<div class = "pt-4 px-4 h-max w-full bottom-0 flex">
	<div class = "grow">
		<input on:keypress={onKeyPress}  bind:value={mes} type="text" placeholder="Type your message here" class="input input-bordered text-base-content w-full" />
	</div>
	
	<div class = "px-2 self-center place-self-center w-8 ml-1 grow-0">
		<button on:click="{handleClick}" >
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-base-content hover:fill-primary-focus w-7">
				<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
			</svg>
		</button>
	</div>
	  
</div>







