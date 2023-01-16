

<script>
    import Chat from './lib/Chat.svelte'
    import MediaQuery from "./lib/MediaQuery.svelte";
    var mobile = true;
    var theme = "cupcake"
    var themes = ["dark", "cupcake", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "pastel", "fantasy", "wireframe", "dracula", "cmyk", "autumn", "business", "acid", "night", "coffee", "winter",];
    function change(){
        theme = themes[Math.floor(Math.random() * themes.length)];
        console.log(theme)
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->

<!-- svelte-ignore a11y-missing-attribute -->
<MediaQuery query="(max-width: 480px)" let:matches>
    <!-- <embed src="https://www.plm.edu.ph" class="w-full h-full" id="plm"> -->
    <div data-theme="{theme}" class ="bg-transparent h-full md:h-screen w-full">
        <div class = "fixed bottom-0 md:right-20 ">
            <Chat />
        </div>
        

        <div class = "border-0 flex flex-row h-full p-4 justify-between md:w-1/2">
            <div class = "px-2 md:pl-24  h-max md:self-center">

                    
                <h1 class="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                    PLMHelps
                </h1>
                <p class="py-3">
                    An Intellgient undergraduate admission chatbot developed using Svelte and Azure Bot Framework.
                </p>



                <div class="btn" on:click={change}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd" />
                        <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                    </svg>
                    <div>
                        &nbsp; {theme}
                    </div>
                    
                </div>


            </div>


 
        </div>


        {#if !matches}
            <div class = "z-0 xl:w-screen">
                <embed src="https://www.plm.edu.ph" class="plm" id="plm" style="width:100%; height: 100vw;">
            </div>
        {/if}
    </div>
</MediaQuery>








