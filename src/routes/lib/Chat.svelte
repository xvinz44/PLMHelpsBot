
<script>

    import Bot from './AzureBot.svelte'

    let time = new Date();
    let hours = time.getHours();
	let minutes = time.getMinutes();
    let curr = String(hours+':').concat(String(minutes).length > 1 ? minutes:'0'+String(minutes));
</script>



<!-- svelte-ignore a11y-missing-attribute -->
<div class="tabs z-50">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    
    <div class="collapse w-screen  md:w-[22rem] md:rounded-t-2xl">

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
                        {curr}
                    </p>
                </div>
                
            </div>
        </div>
        
        <div class="p-0 collapse-content w-full peer-checked:bg-base-200 peer-checked:pt-2 "> 

            <Bot />
        </div>
    </div>
</div>
