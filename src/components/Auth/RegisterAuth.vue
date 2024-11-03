<template>
    <div v-if="response.isError != null " class="alert " :class="{'alert-success' : !response.isError , 'alert alert-danger': response.isError }" role="alert">
        {{ response.message }}
    </div>

    <form class="mx-1 mx-md-4" @submit.prevent="submitForm">

    <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
    <div data-mdb-input-init class="form-outline flex-fill mb-0">
        <input type="text" id="form3Example1c" class="form-control" v-model="username"/>
        <label class="form-label" for="form3Example1c">Your Name</label>
    </div>
    </div>

    <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
    <div data-mdb-input-init class="form-outline flex-fill mb-0">
        <input type="email" id="form3Example3c" class="form-control" v-model="email"/>
        <label class="form-label" for="form3Example3c">Your Email</label>
    </div>
    </div>

    <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
    <div data-mdb-input-init class="form-outline flex-fill mb-0">
        <input type="password" id="form3Example4c" class="form-control" v-model="password"/>
        <label class="form-label" for="form3Example4c" @input="validatePassword">Password</label>
    </div>
    </div>

    <div class="d-flex flex-row align-items-center mb-4">
    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
    <div data-mdb-input-init class="form-outline flex-fill mb-0">
        <input type="password" id="form3Example4cd" class="form-control" v-model="passwordconf"/>
        <label class="form-label" for="form3Example4cd">Repeat your password</label>
    </div>
    </div>

    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
    <button :class="{ 'disabled' : loading}"  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg ">
        <div v-if="loading" class="spinner-border spinner-border-sm text-light" role="status">
        </div>
        Register</button>
    </div>
    <div class="d-flex justify-content-center">If you Have an account &#160; 
        <router-link :to="'/auth/login'">login</router-link>
    </div>

    </form>
</template>

<script>
    import { Auth } from 'aws-amplify';
    import { ref } from 'vue';

    export default {
        name: 'RegisterAuth',
        setup(){
            const response = ref({
                isError: null,
                message: ''
            });

            const updateResponse = ( newState ,newResponse ) => {
                response.value.isError = newState;
                response.value.message = newResponse;
            }

            return { response, updateResponse }
        },
        data(){
            return {
                username: '',
                email: '',
                password: '',
                passwordconf: '',
                loading: false
            }
        },
        methods: {
            async submitForm(){
                this.loading = true
                try{
                    if(this.validatePassword() === false){
                        this.loading = false
                        return
                    }
                    const { username, email, password } = this;
                    console.log(username, email, password)
                    await Auth.signUp({
                        username: email,
                        password: password,
                        attributes: {
                            email: email,
                            name: username // costum attribute
                        }
                    });
                    this.loading = false
                    this.updateResponse( false ,'user successfully registered')
                    setTimeout(() => {
                        this.$router.push({ path: '/auth/login' })      
                    }, 2000 );

                    
                } catch ( error ){
                    this.updateResponse( true ,'error registering user, Try again')
                    console.error('error registering user', error)
                    this.loading = false
                }
                
            },
            validatePassword(){
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if(this.password !== this.passwordconf ){
                    this.updateResponse( true ,'passwords do not match')
                    return false
                }
                else if( !passwordPattern.test(this.password) ){
                    this.updateResponse(true, 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character')
                    return false
                }
                return true
            }
        }
    }
    
</script>

  