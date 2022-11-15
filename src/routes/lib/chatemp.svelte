
<script>
    // Only import what you need!
    import Type from './Typing.svelte'
    import MediaQuery from "./MediaQuery.svelte";
    let time = new Date();
    $: hours = time.getHours();
	$: minutes = time.getMinutes();

    import { onMount, beforeUpdate, afterUpdate } from "svelte";
    var chats = ['Hey hoaw are youy doing?'];
    let mes, div, autoscroll, browse = false;
    
    function send() {
        if (mes != undefined){
            chats = [...chats, mes];
            mes = undefined;
            browse = true
        }
	};
    const onKeyPress = e => {
        if (e.charCode === 13) send();
    };
    beforeUpdate(() => {
        autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
    });
    afterUpdate(() => {
        if (autoscroll || browse) {
            browse = false
            div.scrollTo(0, div.scrollHeight)
        } 
        
    });

</script>


<!-- svelte-ignore a11y-missing-attribute -->
<div class="tabs z-50">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    
    <div class="collapse w-screen  md:w-[20rem] md:rounded-t-2xl">

        <input type="checkbox" class="peer" /> 
        
        <div class="collapse-title bg-base-200 text-base-content peer-checked:bg-base-300 peer-checked:text-base-content">
            <div class = "flex h-full w-full">
                <div class = "self-center w-12">

                    <img src="https://plm.edu.ph/images/Seal/PLM_Seal_BOR-approved_2014.png" class="pic" alt="">
                    <!-- badge <div class="fixed badge badge-sm badge-success translate-x-8 -translate-y-5"></div> -->
                </div>
                <div class ="self-center grow ml-2">
                    <p class = "font-body font-medium text-lg text-left md:text-xl">
                        PLMHelps Bot 
                    </p>
                    <p class = "text-xs text-left">
                        Today at 
                        {hours}:{String(minutes).length > 1 ? minutes:'0'+String(minutes)}
                    </p>
                </div>
                
            </div>
        </div>
        
        <div class="p-0 collapse-content w-full peer-checked:bg-base-200 peer-checked:pt-2 "> 
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
                {#each chats as chat, index}
                    <div class="inline-block py-2 px-3 rounded-xl min-w-fit max-w-fit {index%2 === 1? 'self-end bg-primary text-primary-content':'self-start bg-secondary text-secondary-content'}">
                        {#if chat == 't'}
                            <Type />
                        {:else}
                            {chat}
                        {/if}
                    </div>
                {/each}
        
        

        
            </div>
            <div class = "pt-4 px-4 h-max w-full bottom-0 flex">
                <div class = "grow">
                    <input on:keypress={onKeyPress} bind:value={mes} type="text" placeholder="Type your message here" class="input input-bordered text-base-content w-full" />
                </div>
                
                <div class = "px-2 self-center place-self-center w-8 ml-1 grow-0">
                    <button on:click="{send}" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-base-content hover:fill-primary-focus w-7">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
            
                </div>
                  
            </div>
        </div>
    </div>
</div>
