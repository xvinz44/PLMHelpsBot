<script>
    import Router from 'svelte-spa-router'
    import Home from './routes/Home.svelte'
    import NotFound from './routes/NotFound.svelte'
    const routes = {
        // Exact path
        '/': Home,

        // Catch-all
        // This is optional, but if present it must be the last
        '*': NotFound,
    }
</script>


<body>

    <Router {routes}/>
</body>

