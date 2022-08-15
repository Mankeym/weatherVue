<template>
  <WeatherInfo
    :data="citiesWeather"
  >
  </WeatherInfo>
</template>

<script>
import {defineComponent, onBeforeMount, ref} from "vue";
import api from './function/Api'
import WeatherInfo from './components/weather-info/weather-info.vue'
export default defineComponent ({
  name: 'App',
  components: {
    WeatherInfo
  },
  setup () {
    const citiesWeather = ref([])
    const location = ref([])

    onBeforeMount(() => {
      const city = JSON.parse(window.localStorage.getItem('cities') || '[]')
      if(city.length > 0) {
        city.forEach((item)=> {
          location.value.push(item)
          citiesWeather.value.push(item)
        })
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords
          return api.getCoords(coords.latitude,coords.longitude)
              .then((res)=> {
                console.log(res.data)
                location.value.push(res.data)
                window.localStorage.setItem('cities',JSON.stringify(res.data))
                citiesWeather.value.push(res.data)
                return res
              })
        },(error) => console.log(error))
      }

    })
    return {
      citiesWeather,
      location,
    }
  }
})
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
