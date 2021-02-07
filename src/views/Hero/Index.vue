<template>
  <div class="hero-view">
    <template v-if="isLoadingHero && isLoadingHero">
    <BaseLoading />
    </template>
    <template v-else>
    <HeroDetailHeader v-if="hero" :detail="detailHeader"/>

    <b-row>
      <b-col md="12" lg="8" order-lg="2">
        <!-- Componente de Items del personaje -->
        <HeroItems v-if="items" :items="items"/>
      </b-col>
      <b-col md="12" lg="4" order-lg="1">
        <template v-if="hero">
          <HeroAttributes :attributes="detailStats"/>
          <HeroSkills :skills="hero.skills"/>
        </template>
      </b-col>

    </b-row>
    </template>
  </div>
</template>

<script>
import setError from '@/mixins/setError'
import { getApiHero, getApiDetailedHeroItems } from '@/api/search'
import HeroDetailHeader from './HeroDetailHeader'
import HeroAttributes from './HeroAttributes/Index'
import HeroSkills from './HeroSkills/Index'
import HeroItems from './HeroItems/Index'
import BaseLoading from '../../components/BaseLoading.vue'

export default {
  name: 'HeroView',
  mixins: [setError],
  components: {
    HeroDetailHeader,
    HeroAttributes,
    HeroSkills,
    HeroItems,
    BaseLoading
  },
  data () {
    return {
      isLoadingHero: false,
      isLoadingItems: false,
      hero: null,
      items: null
    }
  },
  computed: {
    detailStats () {
    // Devuelve el contenido de stats y agrega classSlug
      return { ...this.hero.stats, classSlug: this.hero.class }
    },
    detailHeader () {
    // Asignamos valores a través de
      const {
        name,
        gender,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      } = this.hero

      const classSlug = this.hero.class

      return {
        name,
        gender,
        classSlug,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      }
    }
  },
  created () {
    const { region, battleTag: account, heroId } = this.$route.params
    this.isLoadingHero = true
    this.isLoadingItems = true
    getApiHero({ region, account, heroId })
      .then(({ data }) => {
        this.hero = data
      })
      .catch((err) => {
        this.hero = null
        const errObj = {
          routeParams: this.$route.params,
          message: err.message
        }
        if (err.response) {
          errObj.data = err.response.data
          errObj.status = err.response.status
        }
        this.setApiErr(errObj)
        this.$router.push({ name: 'Error' })
      })
      .finally(() => {
        this.isLoadingHero = false
      })

    getApiDetailedHeroItems({ region, account, heroId })
      .then(({ data }) => {
        this.items = data
      })
      .catch((err) => {
        this.items = null
        console.log(err)
      })
      .finally(() => {
        this.isLoadingItems = false
      })
  }
}
</script>
