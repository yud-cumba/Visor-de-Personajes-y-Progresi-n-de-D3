// Importamos nuestra función que obtiene el token
// @ es un alias para /src
import * as oauth from '@/api/oauth'

// Creamos el objeto con "Espacio de Nombres"
export default {
  namespaced: true,
  state: {
    accessToken: null
  },
  mutations: {
    SET_ACCESS_TOKEN (state, payload) {
      state.accessToken = payload
    }
  },
  actions: {

    // Creamos la función getToken, que recibe como parámetro el objeto `context`
    // Gracias a la asignación de desestructuración de JavaScript, recogemos `commit` como argumento
    getToken ({ commit }) {
      // Pasos:
      //  1 - Hacer llamada HTTP para obtener el token
      //  2 - Si va OK, guardar el token en 'accessToken'. Continuar el flujo normal
      //  3 - Si hay errror, limpiar el token de 'accessToken', mostrar log del error
      commit('loading/SET_LOADING', true, { root: true }) // Vuex setea true
      // Paso 1
      oauth.getToken()
        .then(({ data }) => {
          console.log(data)
          // Paso 2: Guardamos el valor del token llamando a nuestra mutación
          commit('SET_ACCESS_TOKEN', data.access_token)
          console.log('good')
        })
        .catch((err) => {
          console.log('error')
          // Paso 3: En caso de error limpiamos el token
          commit('SET_ACCESS_TOKEN', null)
          console.error('Error OAuth: ', err)
        })
        .finally(() => {
          // Por ahora no hacemos nada más aquí
          commit('loading/SET_LOADING', false, { root: true }) // Vuex setea false
          console.log('Done!')
        })
    }
  }
}
