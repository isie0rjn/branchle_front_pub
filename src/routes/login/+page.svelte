<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$lib/store';
    import { onMount } from 'svelte';
    import "../../login.scss";

    let email = "";
    let password = "";
    let error = "";
    let loading = false;

  
    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleLogin() {

        loading = true;
        if (!isValidEmail(email)) {
            error = "Введите правильную эл. почту";
            loading = false;
            return null;
        } else if (password.length < 3) {
            error = "Длина пароля должна быть не меньше чем 3";
            loading = false;
            return null;
        } 

        try {
            const response = await fetch("https://bubuieci.com/user", {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, "verificate": true }),
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
                error = "Неверный логин или пароль";
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
        <a href="/register" role="button" data-sveltekit-prefetch>Register</a>
    </div>
    <h1>LOGIN</h1>

    <form on:submit|preventDefault={handleLogin}>
        <div class="data">
            <div class="input-label">
                <label for="email">Email</label>
                <input type="text" bind:value={email} name="email" />
            </div>
            
            <div class="input-label">
                <label for="password">Password</label>
                <input type="password" bind:value={password} name="password" />
            </div>
        </div>

        <div class="social-media">
            <div class="google">
                <img src="/google.svg" alt="">
                <p>Continue with Google</p>
            </div>
            <div class="apple">
                <img src="/apple.svg" alt="">
                <p>Continue with Apple</p>
            </div>
        </div>
        
        
        <button type="submit">Enter</button>
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