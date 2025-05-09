<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$lib/store';
    import { onMount } from 'svelte';
    import "../../login.scss";

    let nickname = "";
    let email = "";
    let password = "";
    let error = "";
    let loading = false;

  
    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleRegistration() {
        loading = true;
        if (!isValidEmail(email)) {
            error = "Enter valid email";
            loading = false;
            return null;
        } else if (password.length < 8) {
            error = "Password length should be 8 or greater";
            loading = false;
            return null;
        } else if (nickname == "") {
            error = "Enter nickname";
            loading = false;
            return null;
        }

        try {
            const response = await fetch("https://bubuieci.com/user", {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({  email,
                                        password,
                                        nickname
                                    }),
            });
  
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                user.update(current => ({
                    ...current,
                    email: email,
                    id: data.user_id
                }));
                goto('/');
            } else {
                const data = await response.json();
                error = data.errors;
            }
        } catch (err) {
            error = "Ошибка при подключении к серверу";
        } finally {
            loading = false;
        }
    };
</script>
  
<div class="login-form">
    <div class="hrefs">
        <a href="/" role="button" data-sveltekit-prefetch>Back</a>
        <a href="/login" role="button" data-sveltekit-prefetch>Login</a>
    </div>
    <h1>REGISTRATION</h1>

    <form on:submit|preventDefault={handleRegistration}>
        <div class="data">
            <div class="input-label">
                <label for="email">Email</label>
                <input type="email" bind:value={email} name="email" />
            </div>
            
            <div class="input-label">
                <label for="password">Password</label>
                <input type="password" bind:value={password} name="password" />
            </div>
        
            <div class="input-label">
                <label for="nickname">Nickname</label>
                <input type="text" bind:value={nickname} name="nickname" />
            </div>
        </div>
        
        
        <button type="submit">Register</button>
    </form>
  
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}

    
</div>



  
{#if loading}
    <div class="loading-login">
        <object type="image/svg+xml" data="/loading-animation.svg" title="loading"></object>
        <p>loading...</p>
    </div>
{/if}