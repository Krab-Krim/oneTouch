<template>
  <div class="body">
    <div class="container">
      <div class="container-content">
        <h1 class="text-center mb-4">Вход</h1>
        <div>
          <b-form-group
            id="fieldset-1"
            label="Логин"
            label-for="input-1"
            valid-feedback="Спасибо"
            :invalid-feedback="invalidFeedback"
            :state="state"
            class="form"
          >
            <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
          </b-form-group>
        </div>

        <div class="mb-2 mt-2 form">
          <b-form @submit.stop.prevent>
            <label>Пароль</label>
            <b-form-input v-model="password" :state="validation" id="feedback-user"></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Пароль пользователя должен состоять из 5–12 символов
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Спасибо
            </b-form-valid-feedback>
          </b-form>
        </div>
        <b-button class="btn" @click="login">Войти</b-button>
      </div>
    </div>
  </div>
 </template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  computed: {
    state () {
      return this.name.length >= 4
    },
    invalidFeedback () {
      if (this.name.length > 0) {
        return 'Введите не менее 4 символов.'
      }
      return 'Пожалуйста, введите что-нибудь'
    },
    validation () {
      return this.password.length > 4 && this.password.length < 13
    }
  },
  methods: {
    login () {
      let self = this
      if (this.state && this.validation) {
        axios.post('http://localhost:3000/login', {
          name: this.name,
          password: this.password
        })
          .then(function (response) {
            let id = response.data.id
            localStorage.setItem('userId', id)
            self.$router.push({path: 'content/' + id})
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
.body {
  margin-top: 150px;
}
.container {
  width: 20%;
}
.container-content {
  width: 120%;
  border: #b7ca3c solid;
  border-radius: 10%;
  padding: 10%;
  background: #35dc9740;
  box-shadow:inset 0 0 10px 4px rgb(255, 255, 255);

}
.btn {
  color: #ffffff;
  background: #2d6138;
  margin-left: 29%;
  border-radius: 10%;
  width: 136px;
  height: 42px;
  margin-top: 30px;
}
.text-center {
  color: #064224;
  font-weight: bold;
}
.form {
  color: white;
}
@media (max-width: 1600px) {
  .container {
    width: 30%;
  }
}
@media (max-width: 1400px) {
  .container {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .container {
    width: 50%;
  }
}
@media (max-width: 550px) {
  .container {
    width: 70%;
  }
}
</style>
