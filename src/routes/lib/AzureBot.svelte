
<script>
    let test = false;
    let inc = [
        {
            "value": "How to apply?"
        },
        {
            "value": "Is the admissions still open?"
        },
        {
            "value": "How to enroll?"
        }
    ];
	let secret = 'qLs-kHwJo70.eyb_Mi-Wi4lh9q09oEt2hnb92jLMgnKSJZJHq55WVg4';
    if (test){
        secret = 'asd';
    }
	import Type from './Typing.svelte'
	import { onMount, beforeUpdate, afterUpdate } from "svelte";




	$: hours = time.getHours();
	$: minutes = time.getMinutes();
    let time = new Date();
    let hours = time.getHours();
	let minutes = time.getMinutes();
    let curr = String(hours+':').concat(String(minutes).length > 1 ? minutes:'0'+String(minutes));

	let div, autoscroll, id, browse = false;


	
	beforeUpdate(() => {
		autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
	});
	afterUpdate(() => {
		if (autoscroll || browse) {
			browse = false
			div.scrollTo(0, div.scrollHeight)
		} 
	});
    

	let chats = [['Hi! How can I help you?', 1],[inc,3]];

	let mes;
    
    let water;


    async function start(){
        var url = "https://directline.botframework.com/v3/directline/conversations";
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            headers:{
                "Authorization": "Bearer "+secret,
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        id = json.conversationId;
    }
    
    async function send(){
        if (chats){
            chats = [...chats, [mes, 0]]
        }
        var url = "https://directline.botframework.com/v3/directline/conversations/"+id+"/activities";
        var data = {
            "type": 'message',
            "from": {
                "id": "user1"
            },
            "text":  mes
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Authorization": "Bearer "+secret,
                'Content-Type': 'application/json'
            }
        }); 
        const json = await response.json();
        water = String(json.id).slice(26)
        promise = getReply();
        water = '';
    }
    async function getReply() {
		//received api here
        if (water){
            
            var url = "https://directline.botframework.com/v3/directline/conversations/"+id+"/activities?watermark=?"+water;
            const res = await fetch(url, {
                method: 'GET', // or 'PUT'
                headers:{
                    "Authorization": "Bearer "+secret,
                    'Content-Type': 'application/json'
                }
            });
            const text = await res.json();
            new Promise(resolve => setTimeout(resolve, 500)); 
            if (res.ok) {
                console.log(text)
                //console.log(text.activities[0].text);
                var ans = text.activities[0];
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                var temp = [ans.text, 1]

                if (ans.attachments.length > 0){
                    if (ans.attachments[0].content.buttons){
                        console.log(ans.attachments[0].content.buttons, 3)
                        temp = [ans.attachments[0].content.buttons, 3]
                    }   
                    else{
                       temp = [ans.attachments[0].content.text, 1]
                    }
                }
                
                chats = [...chats, temp]
                
                console.log(ans.text)
                
                return ans.text;
            } else {
                throw new Error(text);
            }
        }

	}

	async function handleClick() {
		if (mes){
            send()
            mes = '';
            browse = true;
		}
	}
	const onKeyPress = e => {
		if (e.charCode === 13) handleClick();
	};

    async function cd(val){
        mes = val;
        handleClick();
        return true
    }
    start();
    let promise = getReply();
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

        {#if chat[1] == 3}
            {#each chat[0] as card}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <button on:click={() => cd(card.value)}  class="btn btn-outline btn-primary min-w-fit max-w-fit self-center text-sm" >{card.value}</button>
            {/each}
        {:else}
            <div class="inline-block py-2 px-3 rounded-xl max-w-fit min-w-fit  {chat[1] === 0 ? 'self-end bg-primary text-primary-content':'self-start bg-secondary text-secondary-content'}">
                {chat[0]}
            </div>
        {/if}
	{/each}

 
    {#await promise}
        <div class="inline-block py-2 px-3 rounded-xl min-w-fit max-w-fit text-primary-content self-start bg-secondary text-secondary-content'}">
            <Type />
        </div>
    {:catch error}
        <!-- <p style="color: red">{error.message}</p> -->
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
