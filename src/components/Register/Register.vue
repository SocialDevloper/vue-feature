<template>
  <div>
    <br />
    <b-card
      border-variant="primary"
      header="Registration"
      header-bg-variant="primary"
      header-text-variant="white"
      align="left"
    >
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            :class="{
              'is-invalid': submitted && $v.form.email.$error,
              'is-valid': submitted && !$v.form.email.$error,
            }"
          ></b-form-input>
          <div
            v-if="submitted && $v.form.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.email.required">Email is required</span>
            <span v-if="!$v.form.email.email">Email is invalid</span>
          </div>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Enter name"
            :class="{
              'is-invalid': submitted && $v.form.name.$error,
              'is-valid': submitted && !$v.form.name.$error,
            }"
          ></b-form-input>
          <div v-if="submitted && $v.form.name.$error" class="invalid-feedback">
            <span v-if="!$v.form.name.required">Name is required</span>
            <span v-if="!$v.form.name.alpha"
              >Name should be only alphabets</span
            >
          </div>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Your Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Enter password"
            type="password"
            :class="{
              'is-invalid': submitted && $v.form.password.$error,
              'is-valid': submitted && !$v.form.password.$error,
            }"
          ></b-form-input>
          <div
            v-if="submitted && $v.form.password.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.password.required">Password is required</span>
            <span v-if="!$v.form.password.minLength"
              >Password must be at least 6 characters</span
            >
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" class="ml-2" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

import { required, email, minLength, alpha } from "vuelidate/lib/validators";

// vue toasted
import Toasted from "vue-toasted";
Vue.use(Toasted, {
  duration: 9000,
  position: "top-center",
  className: ["custom-color"],
  action: {
    text: "Okay",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    },
  },
});

export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
      submitted: false,
      show: true,
      apiUrl: "http://localhost:3000/users/",
    };
  },
  validations: {
    form: {
      email: { required, email },
      name: { required, alpha },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      Vue.axios.post(this.apiUrl, this.form).then((result) => {
        console.log("result", result);
        this.$toasted.show("User successfully added..!");
        event.target.reset();
        this.submitted = false;
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss">
.custom-color {
  background-color: #28a745 !important;
}
</style>