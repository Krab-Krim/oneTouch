<template>
  <div class="body">
    <div class="container">
      <h1 class="text-center mb-5">Регистрация</h1>
      <div>
        <b-form-group
          id="fieldset-1"
          label="Введите ваше имя"
          label-for="input-1"
          valid-feedback="Спасибо"
          :invalid-feedback="invalidFeedback"
          :state="state"
          class="form"
        >
          <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
        </b-form-group>
      </div>
      <div class="mb-2 mt-2">
        <b-form @submit.stop.prevent>
          <label class="form">Пароль</label>
          <b-form-input v-model="password" :state="validation" id="feedback-user"></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Пароль пользователя должен состоять из 5–12 символов
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div class="mb-2 mt-2">
        <b-form @submit.stop.prevent>
          <label class="form">Подтвердите пароль</label>
          <b-form-input v-model="passwordRepeat" :state="validateCompare" id="feedback-user"></b-form-input>
          <b-form-invalid-feedback :state="validateRepeat"
                                   v-show="passwordRepeat.length < 4 || passwordRepeat.length > 13">
            Пароль пользователя должен состоять из 5–12 символов
          </b-form-invalid-feedback>
          <b-form-invalid-feedback :state="validateCompare">
            Пароли должны совпадать
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <b-button class="btn" variant="primary" @click="saveUser">Зарегистрироваться</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      password: '',
      passwordRepeat: ''
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
    },
    validateRepeat () {
      return this.passwordRepeat.length > 4 && this.passwordRepeat.length < 13
    },
    validateCompare () {
      return this.password === this.passwordRepeat && this.passwordRepeat !== ''
    }
  },
  methods: {
    saveUser () {
      let self = this
      if (this.validation && this.validateRepeat && this.validateCompare) {
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
  width: 30%;
  border: #b7ca3c solid;
  border-radius: 10%;
  padding: 4%;
  background: #35dc9740;
  box-shadow:inset 0 0 10px 4px rgb(255, 255, 255);
}
.text-center {
  color: #064224;
  font-weight: bold;
}
.form {
  color: white;
}
.btn {
  color: #ffffff;
  background: #2d6138;
  margin-left: 30%;
  border-radius: 10%;
  width: 184px;
  height: 42px;
  margin-top: 30px;
}
@media (max-width: 1440px) {
  .container {
    width: 40%;
  }
}
@media (max-width: 1200px) {
  .container {
    width: 50%;
  }
}
@media (max-width: 768px) {
  .container {
    width: 60%;
  }
}
@media (max-width: 550px) {
  .container {
    width: 80%;
  }
}
@media (max-width: 375px) {
  .container {
    width: 95%;
  }
}
</style>
