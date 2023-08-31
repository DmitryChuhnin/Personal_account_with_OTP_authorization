import { defineStore } from 'pinia'
import router from '@/router'
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import type { User } from '@/interfaces'

const { cookies } = useCookies()

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      phoneNumber: 0,
      userName: '',
      isLoggedIn: false,
      error: false,
      errorMessage: ''
    }) as User,
  actions: {
    async getSubscribe() {
      try {
        const token = ref(cookies.get('token'))
        const response = await axios.get('https://account-test.pedant.market/api/subscriptions', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`
          }
        })
        const resp = response.data.data
        this.userName = resp.CustomerName
        this.phoneNumber = resp.CustomerPhone
        this.isLoggedIn = true
      } catch (err: any) {
        this.error = true
        this.errorMessage = err.response.data.message
        this.isLoggedIn = false
      }
    },

    async generateOtp(phone: number) {
      try {
        const response = await axios.post(
          'https://account-test.pedant.market/api/generate-otp',
          {
            phone_number: phone
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        this.phoneNumber = phone
        this.error = false
        this.errorMessage = ''
      } catch (err: any) {
        this.error = true
        this.errorMessage = err.response.data.message
      }
    },

    async verifyOtp(code: number) {
      try {
        const response = await axios.post(
          'https://account-test.pedant.market/api/verify-otp',
          {
            phone_number: this.phoneNumber,
            otp_code: code
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        this.error = false
        this.errorMessage = ''
        this.isLoggedIn = true
        cookies.set('token', response.data.access_token)
        await router.push('/')
      } catch (err: any) {
        this.error = true
        this.errorMessage = err.response.data.message
      }
    }
  }
})
