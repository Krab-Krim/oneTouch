<template>
  <div class="body">
    <div class="container">
      <h1>Личные данные</h1>

      <b-form-group
        label="Имя:"
        label-for="nested-street"
        label-align-sm="right"
        class="form"
      >
        <b-form-input v-model="name"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Фамилия:"
        label-for="nested-street"
        label-align-sm="right"
        class="form"
      >
        <b-form-input v-model="surname"></b-form-input>
      </b-form-group>
      <div class="form__input">
        <b-form-group for="start"
                      label="Дата рождения:"
                      label-for="nested-street"
                      label-align-sm="right"
                      class="form__age"
        >
          <b-form-input v-model="age"
                        type="date" id="start" name="trip-start"
                        value="2018-07-22"
                        min="1945-01-01" max="2030-12-31"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Телефон:"
          label-for="nested__street"
          label-align-sm="right"
          class="form__phone"
        >
          <b-form-input v-model="telephone"
                        id="phone"
                        v-facade="'+7 (###) ###-##-##'"
                        type="text"
                        name="phone"
                        placeholder="+7 (___) ___−__−__"
          ></b-form-input>
        </b-form-group>
      </div>
      <b-button class="btn" @click="userData" v-show="!isEdit">Сохранить</b-button>
      <b-button class="btn" @click="edit" v-show="isEdit">Редактировать</b-button>
      <b-button class="btn__del" @click="deleteData">Удалить</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {InputFacade, facade, filter} from 'vue-input-facade'

export default {
  components: {InputFacade},
  directives: {facade},
  filters: {facade: filter},
  data () {
    return {
      name: '',
      surname: '',
      age: '',
      telephone: '',
      isEdit: false
    }
  },
  methods: {
    userData () {
      let self = this
      axios.post('http://localhost:3000/users', {
        name: this.name,
        surname: this.surname,
        age: this.age,
        telephone: this.telephone
      })
        .then(function (response) {
          self.isEdit = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    edit () {
      let self = this
      let pastName = window.location.pathname.split('/content/')
      let id = pastName[1]
      axios.put('http://localhost:3000/users/' + id, {
        name: this.name,
        surname: this.surname,
        age: this.age,
        telephone: this.telephone
      })
        .then(function (response) {
          console.log('self', self)
          console.log('this', this)
          self.isEdit = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteData () {
      let self = this
      let pastName = window.location.pathname.split('/content/')
      let id = pastName[1]
      axios.delete('http://localhost:3000/users/' + id)
        .then(function (response) {
          axios.delete('http://localhost:3000/login/' + id)
            .then(function (res) {
              self.$router.push({name: 'Register'})
            })
            .catch(function (err) {
              console.log(err)
            })
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    let self = this
    let pastName = window.location.pathname.split('/content/')
    let id = pastName[1]
    const userId = localStorage.getItem('userId')
    if (userId === id) {
      axios.get('http://localhost:3000/users/' + id)
        .then(function (response) {
          self.name = response.data.name
          self.surname = response.data.surname
          self.age = response.data.age
          self.telephone = response.data.telephone
          self.isEdit = true
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      self.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>
h1 {
  color: #064224;
  text-align: center;
}

.btn {
  color: #ffffff;
  background: #2d6138;
  border-radius: 10%;
  width: 136px;
  height: 42px;
  margin-top: 30px;
}
.btn__del {
  color: #ffffff;
  background: #2d6138;
  border-radius: 10%;
  width: 136px;
  height: 42px;
  margin-top: 30px;
  float: right;
}
.form {
  color: white;
  margin-top: 30px;
}

.container {
  width: 30%;
}

.body {
  margin-top: 220px;
}

.form__input {
  display: flex;
}

.form__age {
  color: white;
  margin-top: 30px;
  width: 45%;
  margin-right: 5%;
}

.form__phone {
  color: white;
  margin-top: 30px;
  width: 50%;
}

@media (max-width: 1300px) {
  .container {
    width: 50%;
  }
  .body {
     margin-top: 150px;
   }
}
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}
</style>
