<template>
    
    <form class="mx-1 mx-md-4" @submit.prevent="submitForm">
        
        

        <div class="d-flex flex-row align-items-center mb-4">
        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
        <div data-mdb-input-init class="form-outline flex-fill mb-0">
            <input type="email" id="form3Example3c" class="form-control" v-model="email" />
            <label class="form-label" for="form3Example3c">Your Email</label>
        </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
        <div data-mdb-input-init class="form-outline flex-fill mb-0">
            <input type="password" id="form3Example4c" class="form-control" v-model="password" />
            <label class="form-label" for="form3Example4c">Password</label>
        </div>
        </div>

        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
        <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Log In</button>
        </div>

        <div class="d-flex justify-content-center">If you don't have an account &#160; 
        <router-link :to="'/auth/register'">register</router-link>
        </div>

    </form>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submitForm(){
            console.log("Auth : " , Auth)
        }
    }
}
</script>