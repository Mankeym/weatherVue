<template>
  <div class="weather-page">
    <div class="weather-info">
      <div class="weather-info__card-container">
        <button
          class="weather-info__card-menu-button"
          :class="displayVisibility ? 'active' : ''"
          @click="menuHandler"
        >
          <div
            class="weather-info__card-menu-button-line-container"
          >
            <line class="weather-info__menu-btn-line" />
            <line class="weather-info__menu-btn-line" />
            <line class="weather-info__menu-btn-line" />
          </div>
        </button>
        <div
          v-if="displayVisibility"
          class="weather-info__card-menu"
          :class="displayVisibility ? 'weather-info__card-menu_activated' : ''"
        >
          <input
            v-model="input"
            class="weather-info__input"
            type="text"
            placeholder="write location"
          >
          <button
            class="btn weather-info__submit-btn"
            type="button"
            @click="addLocation"
          >
            Добавить город
          </button>
          <div
            v-for="(item,index) in citiesWeather"
            :id="index"
            class="weather-info__cities-container"
            @dragover="onDragOver"
          >
            <div
              :key="index"
              draggable="true"
              class="weather-info__cities"
              @dragstart="onDragStart($event, index)"
            >
              <p>{{ item.name }}</p>
              <button
                :id="item.id"
                @click="deleteLocation"
              >
                Delete
              </button>
              <button
                :id="index"
                @click="selectHundler"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="!displayVisibility"
          class="weather-info__card"
        >
          <h1 class="weather-info__card-title">
            {{ citiesWeather[count].name }}
          </h1>
          <p class="weather-info__card-temp">
            {{ Math.round(citiesWeather[count].main.temp - 273.15) + '℃' }}
          </p>
          <p class="weather-info__card-description">
            {{ citiesWeather[count].weather[0].description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "vue";
import api from "@/function/Api";

export default {
  name: "WeatherInfo",
  props: ['data','visibility'],
  setup(props, context) {
    const input = ref('')
    const { emit } = context
    const citiesWeather = ref(props.data)
    const displayVisibility = ref(false)
    const menuHandler = () => {
      displayVisibility.value = !displayVisibility.value
    }
    let count = ref(0)

    const setValue = () => {
      window.localStorage.setItem(
          'cities',
          JSON.stringify(citiesWeather.value)
      )
      emit('update:location', citiesWeather.value)
    }
    const addLocation = () => {
      if(citiesWeather.value.some(el => el.name === input.value)){
        alert('duplicate')
      } else {
        api.getByLocation(input.value)
            .then((res) => {
              citiesWeather.value.push(res.data)
              setValue()
              input.value = ''
            }).catch(error => alert(error))
      }
    }
    let draggedItemIndex = null
    let draggedItem = null
    const onDragStart = ( e, index ) => {
      draggedItemIndex = index
      if (draggedItemIndex !== null) {
        draggedItem = citiesWeather.value[draggedItemIndex]
      }
      e.dataTransfer.effectAllowed = 'move'
    }
    const onDragOver = (index) => {
      if (draggedItem === citiesWeather.value[index.target.id]) {
        return
      }
      citiesWeather.value = citiesWeather.value.filter(
          (item) => {
            return item !== draggedItem
          }
      )
      citiesWeather.value.splice(index.target.id, 0, draggedItem)
      setValue()
    }
    const deleteLocation = (item) => {
      citiesWeather.value = citiesWeather.value.filter((citiesWeather) => {
        return citiesWeather.id !== Number(item.target.id)
      })
      setValue()
    }
    const selectHundler = (e) => {
      count.value = e.target.id
      console.log(count)
    }
    return {
      displayVisibility,
      menuHandler,
      onDragStart,
      onDragOver,
      input,
      addLocation,
      deleteLocation,
      citiesWeather,
      count,
      selectHundler,
    }
  }
}
</script>

<style lang="scss">

</style>
